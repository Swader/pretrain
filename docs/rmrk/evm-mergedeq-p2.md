---
sidebar_position: 21
---

# EVM, merged equippable p2

## Deploy Script

The deploy script for simple MergedEquippable resides in the `deployEquippable.ts`.

The deploy script uses the ethers, `SimpleCatalog`, `SimpleEquippable`, `RMRKEquipRenderUtils` and `ContractTransaction` imports. We will also define the `pricePerMint` constant, which will be used to set the minting price of the tokens. The empty deploy script should look like this:

```
import { ethers } from "hardhat";
import {
  SimpleCatalog,
  SimpleEquippable,
  RMRKEquipRenderUtils,
} from "../typechain-types";
import { ContractTransaction } from "ethers";

const pricePerMint = ethers.utils.parseEther("0.0001");

async function main() {
    
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Since we will expand upon this deploy script in the [user journey](https://github.com/rmrk-team/evm-dev-docs/blob/master/rmrk-legos-examples/broken-reference/README.md), we will add a deployContracts function. In it we will deploy two `SimpleEquippable` smart contracts, one `SimpleCatalog` smart contract and a `RMRKEquipRenderUtils` smart contract. Once the smart contracts are deployed, we will output their addresses. The function is defined below the `main` function definition:

```
async function deployContracts(): Promise<
  [SimpleEquippable, SimpleEquippable, SimpleCatalog, RMRKEquipRenderUtils]
> {
  console.log("Deploying smart contracts");

  const [beneficiary] = await ethers.getSigners();
  const contractFactory = await ethers.getContractFactory("SimpleEquippable");
  const catalogFactory = await ethers.getContractFactory("SimpleCatalog");
  const viewsFactory = await ethers.getContractFactory("RMRKEquipRenderUtils");

  const kanaria: SimpleEquippable = await contractFactory.deploy(
    "Kanaria",
    "KAN",
    "ipfs://collectionMeta",
    "ipfs://tokenMeta",
    {
      erc20TokenAddress: ethers.constants.AddressZero,
      tokenUriIsEnumerable: true,
      royaltyRecipient: await beneficiary.getAddress(),
      royaltyPercentageBps: 10,
      maxSupply: 1000,
      pricePerMint: pricePerMint
    }
  );
  const gem: SimpleEquippable = await contractFactory.deploy(
    "Gem",
    "GM",
    "ipfs://collectionMeta",
    "ipfs://tokenMeta",
    {
      erc20TokenAddress: ethers.constants.AddressZero,
      tokenUriIsEnumerable: true,
      royaltyRecipient: await beneficiary.getAddress(),
      royaltyPercentageBps: 10,
      maxSupply: 3000,
      pricePerMint: pricePerMint
    }
  );
  const catalog: SimpleCatalog = await catalogFactory.deploy("KB", "svg");
  const views: RMRKEquipRenderUtils = await viewsFactory.deploy();

  await kanaria.deployed();
  await gem.deployed();
  await catalog.deployed();
  await views.deployed();
  console.log(
    `Sample contracts deployed to ${kanaria.address} (Kanaria), ${gem.address} (Gem) and ${catalog.address} (Catalog)`
  );

  return [kanaria, gem, catalog, views];
}
```

In order for the `deployContracts` to be called when running the deploy script, we have to add it to the main function:

```
  const [kanaria, gem, catalog, views] = await deployContracts();
```

A custom script added to `package.json` allows us to easily run the script:

```
  "scripts": {
    "deploy-equippable": "hardhat run scripts/deployEquippable.ts"
  }
```

We use the script with `npm run deploy-equippable`.

## User Journey

With the deploy script ready, we can examine how the journey of a user using merged equippable would look like.

The base of the user journey script is the same as the deploy script, as we need to deploy the smart contract in order to interact with it:

```
import { ethers } from "hardhat";
import {
  SimpleCatalog,
  SimpleEquippable,
  RMRKEquipRenderUtils,
} from "../typechain-types";
import { ContractTransaction } from "ethers";

const pricePerMint = ethers.utils.parseEther("0.0001");

async function main() {
  const [kanaria, gem, catalog, views] = await deployContracts();
}

async function deployContracts(): Promise<
  [SimpleEquippable, SimpleEquippable, SimpleCatalog, RMRKEquipRenderUtils]
> {
  console.log("Deploying smart contracts");

  const [beneficiary] = await ethers.getSigners();
  const contractFactory = await ethers.getContractFactory("SimpleEquippable");
  const catalogFactory = await ethers.getContractFactory("SimpleCatalog");
  const viewsFactory = await ethers.getContractFactory("RMRKEquipRenderUtils");

  const kanaria: SimpleEquippable = await contractFactory.deploy(
    "Kanaria",
    "KAN",
    "ipfs://collectionMeta",
    "ipfs://tokenMeta",
    {
      erc20TokenAddress: ethers.constants.AddressZero,
      tokenUriIsEnumerable: true,
      royaltyRecipient: await beneficiary.getAddress(),
      royaltyPercentageBps: 10,
      maxSupply: 1000,
      pricePerMint: pricePerMint
    }
  );
  const gem: SimpleEquippable = await contractFactory.deploy(
    "Gem",
    "GM",
    "ipfs://collectionMeta",
    "ipfs://tokenMeta",
    {
      erc20TokenAddress: ethers.constants.AddressZero,
      tokenUriIsEnumerable: true,
      royaltyRecipient: await beneficiary.getAddress(),
      royaltyPercentageBps: 10,
      maxSupply: 3000,
      pricePerMint: pricePerMint
    }
  );
  const catalog: SimpleCatalog = await catalogFactory.deploy("KB", "svg");
  const views: RMRKEquipRenderUtils = await viewsFactory.deploy();

  await kanaria.deployed();
  await gem.deployed();
  await catalog.deployed();
  console.log(
    `Sample contracts deployed to ${kanaria.address} (Kanaria), ${gem.address} (Gem) and ${catalog.address} (Catalog)`
  );

  return [kanaria, gem, catalog, views];
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Once the smart contracts are deployed, we can setup the Catalog. 

We will set it up have two fixed part options for background, head, body and wings. Additionally we will add three slot options for gems. All of these will be added using the [`addPartList`](https://github.com/rmrk-team/evm-dev-docs/blob/master/rmrk-legos-examples/broken-reference/README.md) method. The call together with encapsulating `setupCatalog` function should look like this:

```
async function setupCatalog(catalog: SimpleCatalog, gemAddress: string): Promise<void> {
  console.log("Setting up Catalog");
  // Setup catalog with 2 fixed part options for background, head, body and wings.
  // Also 3 slot options for gems
  const tx = await catalog.addPartList([
    {
      // Background option 1
      partId: 1,
      part: {
        itemType: 2, // Fixed
        z: 0,
        equippable: [],
        metadataURI: "ipfs://backgrounds/1.svg",
      },
    },
    {
      // Background option 2
      partId: 2,
      part: {
        itemType: 2, // Fixed
        z: 0,
        equippable: [],
        metadataURI: "ipfs://backgrounds/2.svg",
      },
    },
    {
      // Head option 1
      partId: 3,
      part: {
        itemType: 2, // Fixed
        z: 3,
        equippable: [],
        metadataURI: "ipfs://heads/1.svg",
      },
    },
    {
      // Head option 2
      partId: 4,
      part: {
        itemType: 2, // Fixed
        z: 3,
        equippable: [],
        metadataURI: "ipfs://heads/2.svg",
      },
    },
    {
      // Body option 1
      partId: 5,
      part: {
        itemType: 2, // Fixed
        z: 2,
        equippable: [],
        metadataURI: "ipfs://body/1.svg",
      },
    },
    {
      // Body option 2
      partId: 6,
      part: {
        itemType: 2, // Fixed
        z: 2,
        equippable: [],
        metadataURI: "ipfs://body/2.svg",
      },
    },
    {
      // Wings option 1
      partId: 7,
      part: {
        itemType: 2, // Fixed
        z: 1,
        equippable: [],
        metadataURI: "ipfs://wings/1.svg",
      },
    },
    {
      // Wings option 2
      partId: 8,
      part: {
        itemType: 2, // Fixed
        z: 1,
        equippable: [],
        metadataURI: "ipfs://wings/2.svg",
      },
    },
    {
      // Gems slot 1
      partId: 9,
      part: {
        itemType: 1, // Slot
        z: 4,
        equippable: [gemAddress], // Only gems tokens can be equipped here
        metadataURI: "",
      },
    },
    {
      // Gems slot 2
      partId: 10,
      part: {
        itemType: 1, // Slot
        z: 4,
        equippable: [gemAddress], // Only gems tokens can be equipped here
        metadataURI: "",
      },
    },
    {
      // Gems slot 3
      partId: 11,
      part: {
        itemType: 1, // Slot
        z: 4,
        equippable: [gemAddress], // Only gems tokens can be equipped here
        metadataURI: "",
      },
    },
  ]);
  await tx.wait();
  console.log("Catalog is set");
}
```

NOTE: The `metadataURI` of a slot can be used to retrieve a fallback asset when no asset is equipped into it.

Notice how the `z` value of the background is `0` and that of the head is `3`. Also note how the `itemType` value of the `Slot` type of fixed items is `2` and that of equippable items is `1`. Additionally the `metadataURI` is usually left blank for the equippables, but has to be set for the fixed items. The `equippable` values have to be set to the gem smart contracts for the equippable items.

In order for the `setupCatalog` to be called, we have to add it to the main function:

```
  await setupCatalog(catalog, gem.address);
```

With the `Catalog` set up, the tokens should now be minted. Both `Kanaria` and `Gem` tokens will be minted in the `mintTokens`. To define how many tokens should be minted, `totalBirds` constant will be added below the import statements:

```
const totalBirds = 5;
```

The `mintToken` function should accept two arguments (`Kanaria` and `Gem`). We will prepare a batch of transactions to mint the tokens and send them. Once the tokens are minted, we will output the total number of tokens minted. While the Kanaria tokens will be minted to the `tokenOwner` address, the Gem tokens will be minted using the [`nestMint`](https://github.com/rmrk-team/evm-dev-docs/blob/master/rmrk-legos-examples/broken-reference/README.md) method in order to be minted directly to the Kanaria tokens. We will mint three Gem tokens to each Kanaria. Since all of the nested tokens need to be approved, we will also build a batch of transaction to accept a single nest-minted `Gem` for each `Kanaria`:

```
async function mintTokens(
  kanaria: SimpleEquippable,
  gem: SimpleEquippable
): Promise<void> {
  console.log("Minting tokens");
  const [ , tokenOwner] = await ethers.getSigners();

  // Mint some kanarias
  console.log("Minting Kanaria tokens");
  let tx = await kanaria.mint(tokenOwner.address, totalBirds, {
    value: pricePerMint.mul(totalBirds),
  });
  await tx.wait();
  console.log(`Minted ${totalBirds} kanarias`);

  // Mint 3 gems into each kanaria
  console.log("Nest-minting Gem tokens");
  let allTx: ContractTransaction[] = [];
  for (let i = 1; i <= totalBirds; i++) {
    let tx = await gem.nestMint(kanaria.address, 3, i, {
      value: pricePerMint.mul(3),
    });
    allTx.push(tx);
  }
  await Promise.all(allTx.map((tx) => tx.wait()));
  console.log(`Minted 3 gems into each kanaria`);

  // Accept 3 gems for each kanaria
  console.log("Accepting Gems");
  for (let tokenId = 1; tokenId <= totalBirds; tokenId++) {
    allTx = [
      await kanaria.connect(tokenOwner).acceptChild(tokenId, 2, gem.address, 3 * tokenId),
      await kanaria.connect(tokenOwner).acceptChild(tokenId, 1, gem.address, 3 * tokenId - 1),
      await kanaria.connect(tokenOwner).acceptChild(tokenId, 0, gem.address, 3 * tokenId - 2),
    ];
  }
  await Promise.all(allTx.map((tx) => tx.wait()));
  console.log(`Accepted gems for each kanaria`);
}
```

NOTE: We assign the `tokenOwner` the second available signer, so that the assets are not automatically accepted when added to the token. This happens when an account adding an asset to a token is also the owner of said token.

In order for the `mintTokens` to be called, we have to add it to the main function:

```
  await mintTokens(kanaria, gem);
```

Having minted both `Kanarias` and `Gems`, we can now add assets to them. We will add assets to the Kanaria using the `addKanariaAssets` function. It accepts `Kanaria` and address of the `Catalog` smart contract. Assets will be added using the [`addEquippableAssetEntry`](https://github.com/rmrk-team/evm-dev-docs/blob/master/rmrk-legos-examples/broken-reference/README.md) method. We will add a default asset, which doesn't need a `baseAddress` value. The composed asset needs to have the baseAddress. We also specify the fixed parts IDs for background, head, body and wings. Additionally we allow the gems to be equipped in the slot parts IDs. With the asset entires added, we can add them to a token and then accept them as well:

```
async function addKanariaAssets(
  kanaria: SimpleEquippable,
  baseAddress: string
): Promise<void> {
  console.log("Adding Kanaria assets");
  const [ , tokenOwner] = await ethers.getSigners();
  const assetDefaultId = 1;
  const assetComposedId = 2;
  let allTx: ContractTransaction[] = [];
  let tx = await kanaria.addEquippableAssetEntry(
    0, // Only used for assets meant to equip into others
    ethers.constants.AddressZero, // catalog is not needed here
    "ipfs://default.png",
    []
  );
  allTx.push(tx);

  tx = await kanaria.addEquippableAssetEntry(
    0, // Only used for assets meant to equip into others
    catalogAddress, // Since we're using parts, we must define the catalog
    "ipfs://meta1.json",
    [1, 3, 5, 7, 9, 10, 11] // We're using first background, head, body and wings and state that this can receive the 3 slot parts for gems
  );
  allTx.push(tx);
  // Wait for both assets to be added
  await Promise.all(allTx.map((tx) => tx.wait()));
  console.log("Added 2 asset entries");

  // Add assets to token
  const tokenId = 1;
  allTx = [
    await kanaria.addAssetToToken(tokenId, assetDefaultId, 0),
    await kanaria.addAssetToToken(tokenId, assetComposedId, 0),
  ];
  await Promise.all(allTx.map((tx) => tx.wait()));
  console.log("Added assets to token 1");

  // Accept both assets:
  tx = await kanaria.connect(tokenOwner).acceptAsset(tokenId, 0, assetDefaultId);
  await tx.wait();
  tx = await kanaria.connect(tokenOwner).acceptAsset(tokenId, 0, assetComposedId);
  await tx.wait();
  console.log("Assets accepted");
}
```

---

## Training Data

    ## Deploy Script

    The deploy script for simple MergedEquippable resides in the `deployEquippable.ts`.

    The deploy script uses the ethers, `SimpleCatalog`, `SimpleEquippable`, `RMRKEquipRenderUtils` and `ContractTransaction` imports. We will also define the `pricePerMint` constant, which will be used to set the minting price of the tokens. The empty deploy script should look like this:

    ```
    import { ethers } from "hardhat";
    import {
    SimpleCatalog,
    SimpleEquippable,
    RMRKEquipRenderUtils,
    } from "../typechain-types";
    import { ContractTransaction } from "ethers";

    const pricePerMint = ethers.utils.parseEther("0.0001");

    async function main() {
        
    }

    main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
    });
    ```

    Since we will expand upon this deploy script in the [user journey](https://github.com/rmrk-team/evm-dev-docs/blob/master/rmrk-legos-examples/broken-reference/README.md), we will add a deployContracts function. In it we will deploy two `SimpleEquippable` smart contracts, one `SimpleCatalog` smart contract and a `RMRKEquipRenderUtils` smart contract. Once the smart contracts are deployed, we will output their addresses. The function is defined below the `main` function definition:

    ```
    async function deployContracts(): Promise<
    [SimpleEquippable, SimpleEquippable, SimpleCatalog, RMRKEquipRenderUtils]
    > {
    console.log("Deploying smart contracts");

    const [beneficiary] = await ethers.getSigners();
    const contractFactory = await ethers.getContractFactory("SimpleEquippable");
    const catalogFactory = await ethers.getContractFactory("SimpleCatalog");
    const viewsFactory = await ethers.getContractFactory("RMRKEquipRenderUtils");

    const kanaria: SimpleEquippable = await contractFactory.deploy(
        "Kanaria",
        "KAN",
        "ipfs://collectionMeta",
        "ipfs://tokenMeta",
        {
        erc20TokenAddress: ethers.constants.AddressZero,
        tokenUriIsEnumerable: true,
        royaltyRecipient: await beneficiary.getAddress(),
        royaltyPercentageBps: 10,
        maxSupply: 1000,
        pricePerMint: pricePerMint
        }
    );
    const gem: SimpleEquippable = await contractFactory.deploy(
        "Gem",
        "GM",
        "ipfs://collectionMeta",
        "ipfs://tokenMeta",
        {
        erc20TokenAddress: ethers.constants.AddressZero,
        tokenUriIsEnumerable: true,
        royaltyRecipient: await beneficiary.getAddress(),
        royaltyPercentageBps: 10,
        maxSupply: 3000,
        pricePerMint: pricePerMint
        }
    );
    const catalog: SimpleCatalog = await catalogFactory.deploy("KB", "svg");
    const views: RMRKEquipRenderUtils = await viewsFactory.deploy();

    await kanaria.deployed();
    await gem.deployed();
    await catalog.deployed();
    await views.deployed();
    console.log(
        `Sample contracts deployed to ${kanaria.address} (Kanaria), ${gem.address} (Gem) and ${catalog.address} (Catalog)`
    );

    return [kanaria, gem, catalog, views];
    }
    ```

    In order for the `deployContracts` to be called when running the deploy script, we have to add it to the main function:

    ```
    const [kanaria, gem, catalog, views] = await deployContracts();
    ```

    A custom script added to `package.json` allows us to easily run the script:

    ```
    "scripts": {
        "deploy-equippable": "hardhat run scripts/deployEquippable.ts"
    }
    ```

    We use the script with `npm run deploy-equippable`.

    ## User Journey

    With the deploy script ready, we can examine how the journey of a user using merged equippable would look like.

    The base of the user journey script is the same as the deploy script, as we need to deploy the smart contract in order to interact with it:

    ```
    import { ethers } from "hardhat";
    import {
    SimpleCatalog,
    SimpleEquippable,
    RMRKEquipRenderUtils,
    } from "../typechain-types";
    import { ContractTransaction } from "ethers";

    const pricePerMint = ethers.utils.parseEther("0.0001");

    async function main() {
    const [kanaria, gem, catalog, views] = await deployContracts();
    }

    async function deployContracts(): Promise<
    [SimpleEquippable, SimpleEquippable, SimpleCatalog, RMRKEquipRenderUtils]
    > {
    console.log("Deploying smart contracts");

    const [beneficiary] = await ethers.getSigners();
    const contractFactory = await ethers.getContractFactory("SimpleEquippable");
    const catalogFactory = await ethers.getContractFactory("SimpleCatalog");
    const viewsFactory = await ethers.getContractFactory("RMRKEquipRenderUtils");

    const kanaria: SimpleEquippable = await contractFactory.deploy(
        "Kanaria",
        "KAN",
        "ipfs://collectionMeta",
        "ipfs://tokenMeta",
        {
        erc20TokenAddress: ethers.constants.AddressZero,
        tokenUriIsEnumerable: true,
        royaltyRecipient: await beneficiary.getAddress(),
        royaltyPercentageBps: 10,
        maxSupply: 1000,
        pricePerMint: pricePerMint
        }
    );
    const gem: SimpleEquippable = await contractFactory.deploy(
        "Gem",
        "GM",
        "ipfs://collectionMeta",
        "ipfs://tokenMeta",
        {
        erc20TokenAddress: ethers.constants.AddressZero,
        tokenUriIsEnumerable: true,
        royaltyRecipient: await beneficiary.getAddress(),
        royaltyPercentageBps: 10,
        maxSupply: 3000,
        pricePerMint: pricePerMint
        }
    );
    const catalog: SimpleCatalog = await catalogFactory.deploy("KB", "svg");
    const views: RMRKEquipRenderUtils = await viewsFactory.deploy();

    await kanaria.deployed();
    await gem.deployed();
    await catalog.deployed();
    console.log(
        `Sample contracts deployed to ${kanaria.address} (Kanaria), ${gem.address} (Gem) and ${catalog.address} (Catalog)`
    );

    return [kanaria, gem, catalog, views];
    }

    main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
    });
    ```

    Once the smart contracts are deployed, we can setup the Catalog. 

    We will set it up have two fixed part options for background, head, body and wings. Additionally we will add three slot options for gems. All of these will be added using the [`addPartList`](https://github.com/rmrk-team/evm-dev-docs/blob/master/rmrk-legos-examples/broken-reference/README.md) method. The call together with encapsulating `setupCatalog` function should look like this:

    ```
    async function setupCatalog(catalog: SimpleCatalog, gemAddress: string): Promise<void> {
    console.log("Setting up Catalog");
    // Setup catalog with 2 fixed part options for background, head, body and wings.
    // Also 3 slot options for gems
    const tx = await catalog.addPartList([
        {
        // Background option 1
        partId: 1,
        part: {
            itemType: 2, // Fixed
            z: 0,
            equippable: [],
            metadataURI: "ipfs://backgrounds/1.svg",
        },
        },
        {
        // Background option 2
        partId: 2,
        part: {
            itemType: 2, // Fixed
            z: 0,
            equippable: [],
            metadataURI: "ipfs://backgrounds/2.svg",
        },
        },
        {
        // Head option 1
        partId: 3,
        part: {
            itemType: 2, // Fixed
            z: 3,
            equippable: [],
            metadataURI: "ipfs://heads/1.svg",
        },
        },
        {
        // Head option 2
        partId: 4,
        part: {
            itemType: 2, // Fixed
            z: 3,
            equippable: [],
            metadataURI: "ipfs://heads/2.svg",
        },
        },
        {
        // Body option 1
        partId: 5,
        part: {
            itemType: 2, // Fixed
            z: 2,
            equippable: [],
            metadataURI: "ipfs://body/1.svg",
        },
        },
        {
        // Body option 2
        partId: 6,
        part: {
            itemType: 2, // Fixed
            z: 2,
            equippable: [],
            metadataURI: "ipfs://body/2.svg",
        },
        },
        {
        // Wings option 1
        partId: 7,
        part: {
            itemType: 2, // Fixed
            z: 1,
            equippable: [],
            metadataURI: "ipfs://wings/1.svg",
        },
        },
        {
        // Wings option 2
        partId: 8,
        part: {
            itemType: 2, // Fixed
            z: 1,
            equippable: [],
            metadataURI: "ipfs://wings/2.svg",
        },
        },
        {
        // Gems slot 1
        partId: 9,
        part: {
            itemType: 1, // Slot
            z: 4,
            equippable: [gemAddress], // Only gems tokens can be equipped here
            metadataURI: "",
        },
        },
        {
        // Gems slot 2
        partId: 10,
        part: {
            itemType: 1, // Slot
            z: 4,
            equippable: [gemAddress], // Only gems tokens can be equipped here
            metadataURI: "",
        },
        },
        {
        // Gems slot 3
        partId: 11,
        part: {
            itemType: 1, // Slot
            z: 4,
            equippable: [gemAddress], // Only gems tokens can be equipped here
            metadataURI: "",
        },
        },
    ]);
    await tx.wait();
    console.log("Catalog is set");
    }
    ```

    NOTE: The `metadataURI` of a slot can be used to retrieve a fallback asset when no asset is equipped into it.

    Notice how the `z` value of the background is `0` and that of the head is `3`. Also note how the `itemType` value of the `Slot` type of fixed items is `2` and that of equippable items is `1`. Additionally the `metadataURI` is usually left blank for the equippables, but has to be set for the fixed items. The `equippable` values have to be set to the gem smart contracts for the equippable items.

    In order for the `setupCatalog` to be called, we have to add it to the main function:

    ```
    await setupCatalog(catalog, gem.address);
    ```

    With the `Catalog` set up, the tokens should now be minted. Both `Kanaria` and `Gem` tokens will be minted in the `mintTokens`. To define how many tokens should be minted, `totalBirds` constant will be added below the import statements:

    ```
    const totalBirds = 5;
    ```

    The `mintToken` function should accept two arguments (`Kanaria` and `Gem`). We will prepare a batch of transactions to mint the tokens and send them. Once the tokens are minted, we will output the total number of tokens minted. While the Kanaria tokens will be minted to the `tokenOwner` address, the Gem tokens will be minted using the [`nestMint`](https://github.com/rmrk-team/evm-dev-docs/blob/master/rmrk-legos-examples/broken-reference/README.md) method in order to be minted directly to the Kanaria tokens. We will mint three Gem tokens to each Kanaria. Since all of the nested tokens need to be approved, we will also build a batch of transaction to accept a single nest-minted `Gem` for each `Kanaria`:

    ```
    async function mintTokens(
    kanaria: SimpleEquippable,
    gem: SimpleEquippable
    ): Promise<void> {
    console.log("Minting tokens");
    const [ , tokenOwner] = await ethers.getSigners();

    // Mint some kanarias
    console.log("Minting Kanaria tokens");
    let tx = await kanaria.mint(tokenOwner.address, totalBirds, {
        value: pricePerMint.mul(totalBirds),
    });
    await tx.wait();
    console.log(`Minted ${totalBirds} kanarias`);

    // Mint 3 gems into each kanaria
    console.log("Nest-minting Gem tokens");
    let allTx: ContractTransaction[] = [];
    for (let i = 1; i <= totalBirds; i++) {
        let tx = await gem.nestMint(kanaria.address, 3, i, {
        value: pricePerMint.mul(3),
        });
        allTx.push(tx);
    }
    await Promise.all(allTx.map((tx) => tx.wait()));
    console.log(`Minted 3 gems into each kanaria`);

    // Accept 3 gems for each kanaria
    console.log("Accepting Gems");
    for (let tokenId = 1; tokenId <= totalBirds; tokenId++) {
        allTx = [
        await kanaria.connect(tokenOwner).acceptChild(tokenId, 2, gem.address, 3 * tokenId),
        await kanaria.connect(tokenOwner).acceptChild(tokenId, 1, gem.address, 3 * tokenId - 1),
        await kanaria.connect(tokenOwner).acceptChild(tokenId, 0, gem.address, 3 * tokenId - 2),
        ];
    }
    await Promise.all(allTx.map((tx) => tx.wait()));
    console.log(`Accepted gems for each kanaria`);
    }
    ```

    NOTE: We assign the `tokenOwner` the second available signer, so that the assets are not automatically accepted when added to the token. This happens when an account adding an asset to a token is also the owner of said token.

    In order for the `mintTokens` to be called, we have to add it to the main function:

    ```
    await mintTokens(kanaria, gem);
    ```

    Having minted both `Kanarias` and `Gems`, we can now add assets to them. We will add assets to the Kanaria using the `addKanariaAssets` function. It accepts `Kanaria` and address of the `Catalog` smart contract. Assets will be added using the [`addEquippableAssetEntry`](https://github.com/rmrk-team/evm-dev-docs/blob/master/rmrk-legos-examples/broken-reference/README.md) method. We will add a default asset, which doesn't need a `baseAddress` value. The composed asset needs to have the baseAddress. We also specify the fixed parts IDs for background, head, body and wings. Additionally we allow the gems to be equipped in the slot parts IDs. With the asset entires added, we can add them to a token and then accept them as well:

    ```
    async function addKanariaAssets(
    kanaria: SimpleEquippable,
    baseAddress: string
    ): Promise<void> {
    console.log("Adding Kanaria assets");
    const [ , tokenOwner] = await ethers.getSigners();
    const assetDefaultId = 1;
    const assetComposedId = 2;
    let allTx: ContractTransaction[] = [];
    let tx = await kanaria.addEquippableAssetEntry(
        0, // Only used for assets meant to equip into others
        ethers.constants.AddressZero, // catalog is not needed here
        "ipfs://default.png",
        []
    );
    allTx.push(tx);

    tx = await kanaria.addEquippableAssetEntry(
        0, // Only used for assets meant to equip into others
        catalogAddress, // Since we're using parts, we must define the catalog
        "ipfs://meta1.json",
        [1, 3, 5, 7, 9, 10, 11] // We're using first background, head, body and wings and state that this can receive the 3 slot parts for gems
    );
    allTx.push(tx);
    // Wait for both assets to be added
    await Promise.all(allTx.map((tx) => tx.wait()));
    console.log("Added 2 asset entries");

    // Add assets to token
    const tokenId = 1;
    allTx = [
        await kanaria.addAssetToToken(tokenId, assetDefaultId, 0),
        await kanaria.addAssetToToken(tokenId, assetComposedId, 0),
    ];
    await Promise.all(allTx.map((tx) => tx.wait()));
    console.log("Added assets to token 1");

    // Accept both assets:
    tx = await kanaria.connect(tokenOwner).acceptAsset(tokenId, 0, assetDefaultId);
    await tx.wait();
    tx = await kanaria.connect(tokenOwner).acceptAsset(tokenId, 0, assetComposedId);
    await tx.wait();
    console.log("Assets accepted");
    }
    ```