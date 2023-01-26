---
sidebar_position: 22
---

# EVM, merged equippable p3

Adding assets to `Gem`s is done in the `addGemAssets`. It accepts `Gem`, address of the `Kanaria` smart contract and the address of the `Catalog` smart contract. We will add 4 assets for each gem; one full version and three that match each slot. Reference IDs are specified for easier reference from the child's perspective. The assets will be added one by one. Note how the full versions of gems don't have the `equippableGroupId`.

Having added the asset entries, we can now add the valid parent reference IDs using the `setValidParentForEquippableGroup`. For example if we want to add a valid reference for the left gem, we need to pass the value of equippable reference ID of the left gem, parent smart contract address (in our case this is Kanaria smart contract) and ID of the slot which was defined in Catalog (this is ID number 9 in the Catalog for the left gem).

Last thing to do is to add assets to the tokens using [`addAssetToToken`](https://github.com/rmrk-team/evm-dev-docs/blob/master/rmrk-legos-examples/broken-reference/README.md). Asset of type A will be added to the gems 1 and 2, and the type B of the asset is added to gem 3. All of these should be accepted using `acceptAsset`:

```
async function addGemAssets(
  gem: SimpleEquippable,
  kanariaAddress: string,
  catalogAddress: string
): Promise<void> {
  console.log("Adding Gem assets");
  const [ , tokenOwner] = await ethers.getSigners();
  // We'll add 4 assets for each gem, a full version and 3 versions matching each slot.
  // We will have only 2 types of gems -> 4x2: 8 assets.
  // This is not composed by others, so fixed and slot parts are never used.
  const gemVersions = 4;

  // These refIds are used from the child's perspective, to group assets that can be equipped into a parent
  // With it, we avoid the need to do set it asset by asset
  const equippableRefIdLeftGem = 1;
  const equippableRefIdMidGem = 2;
  const equippableRefIdRightGem = 3;

  // We can do a for loop, but this makes it clearer.
  console.log("Adding asset entries");
  let allTx = [
  let allTx = [
    await gem.addEquippableAssetEntry(
      // Full version for first type of gem, no need of refId or catalog
      0,
      catalogAddress,
      `ipfs://gems/typeA/full.svg`,
      []
    ),
    await gem.addEquippableAssetEntry(
      // Equipped into left slot for first type of gem
      equippableRefIdLeftGem,
      catalogAddress,
      `ipfs://gems/typeA/left.svg`,
      []
    ),
    await gem.addEquippableAssetEntry(
      // Equipped into mid slot for first type of gem
      equippableRefIdMidGem,
      catalogAddress,
      `ipfs://gems/typeA/mid.svg`,
      []
    ),
    await gem.addEquippableAssetEntry(
      // Equipped into left slot for first type of gem
      equippableRefIdRightGem,
      catalogAddress,
      `ipfs://gems/typeA/right.svg`,
      []
    ),
    await gem.addEquippableAssetEntry(
      // Full version for second type of gem, no need of refId or catalog
      0,
      ethers.constants.AddressZero,
      `ipfs://gems/typeB/full.svg`,
      []
    ),
    await gem.addEquippableAssetEntry(
      // Equipped into left slot for second type of gem
      equippableRefIdLeftGem,
      catalogAddress,
      `ipfs://gems/typeB/left.svg`,
      []
    ),
    await gem.addEquippableAssetEntry(
      // Equipped into mid slot for second type of gem
      equippableRefIdMidGem,
      catalogAddress,
      `ipfs://gems/typeB/mid.svg`,
      []
    ),
    await gem.addEquippableAssetEntry(
      // Equipped into right slot for second type of gem
      equippableRefIdRightGem,
      catalogAddress,
      `ipfs://gems/typeB/right.svg`,
      []
    ),
  ];

  await Promise.all(allTx.map((tx) => tx.wait()));
  console.log(
    "Added 8 gem assets. 2 Types of gems with full, left, mid and right versions."
  );

  // 9, 10 and 11 are the slot part ids for the gems, defined on the catalog.
  // e.g. Any asset on gem, which sets its equippableRefId to equippableRefIdLeftGem
  //      will be considered a valid equip into any kanaria on slot 9 (left gem).
  console.log("Setting valid parent reference IDs");
  allTx = [
    await gem.setValidParentForEquippableGroup(equippableRefIdLeftGem, kanariaAddress, 9),
    await gem.setValidParentForEquippableGroup(equippableRefIdMidGem, kanariaAddress, 10),
    await gem.setValidParentForEquippableGroup(equippableRefIdRightGem, kanariaAddress, 11),
  ];
  await Promise.all(allTx.map((tx) => tx.wait()));

  // We add assets of type A to gem 1 and 2, and type B to gem 3. Both are nested into the first kanaria
  // This means gems 1 and 2 will have the same asset, which is totally valid.
  console.log("Add assets to tokens");
  allTx = [
    await gem.addAssetToToken(1, 1, 0),
    await gem.addAssetToToken(1, 2, 0),
    await gem.addAssetToToken(1, 3, 0),
    await gem.addAssetToToken(1, 4, 0),
    await gem.addAssetToToken(2, 1, 0),
    await gem.addAssetToToken(2, 2, 0),
    await gem.addAssetToToken(2, 3, 0),
    await gem.addAssetToToken(2, 4, 0),
    await gem.addAssetToToken(3, 5, 0),
    await gem.addAssetToToken(3, 6, 0),
    await gem.addAssetToToken(3, 7, 0),
    await gem.addAssetToToken(3, 8, 0),
  ];
  await Promise.all(allTx.map((tx) => tx.wait()));
  console.log("Added 4 assets to each of 3 gems.");

// We accept each asset for all gems
  allTx = [
    await gem.connect(tokenOwner).acceptAsset(1, 3, 4),
    await gem.connect(tokenOwner).acceptAsset(1, 2, 3),
    await gem.connect(tokenOwner).acceptAsset(1, 1, 2),
    await gem.connect(tokenOwner).acceptAsset(1, 0, 1),
    await gem.connect(tokenOwner).acceptAsset(2, 3, 4),
    await gem.connect(tokenOwner).acceptAsset(2, 2, 3),
    await gem.connect(tokenOwner).acceptAsset(2, 1, 2),
    await gem.connect(tokenOwner).acceptAsset(2, 0, 1),
    await gem.connect(tokenOwner).acceptAsset(3, 3, 8),
    await gem.connect(tokenOwner).acceptAsset(3, 2, 7),
    await gem.connect(tokenOwner).acceptAsset(3, 1, 6),
    await gem.connect(tokenOwner).acceptAsset(3, 0, 5),
  ];
  await Promise.all(allTx.map((tx) => tx.wait()));
  console.log("Accepted 4 assets to each of 3 gems.");
}
```

In order for the `addKanariaAssets` and `addGemAssets` to be called, we have to add them to the `main` function:

```
  await addKanariaAssets(kanaria, catalog.address);
  await addGemAssets(gem, kanaria.address, catalog.address);
```

With `Kanaria`s and `Gem`s ready, we can equip the gems to Kanarias using the `equipGems` function. We will build a batch of equip transactions and then send them one after the other:

```
async function equipGems(kanaria: SimpleEquippable): Promise<void> {
  console.log("Equipping gems");
  const [ , tokenOwner] = await ethers.getSigners();
  const allTx = [
    await kanaria.connect(tokenOwner).equip({
      tokenId: 1, // Kanaria 1
      childIndex: 2, // Gem 1 is on position 2
      assetId: 2, // Asset for the kanaria which is composable
      slotPartId: 9, // left gem slot
      childAssetId: 2, // Asset id for child meant for the left gem
    }),
    await kanaria.connect(tokenOwner).equip({
      tokenId: 1, // Kanaria 1
      childIndex: 1, // Gem 2 is on position 1
      assetId: 2, // Asset for the kanaria which is composable
      slotPartId: 10, // mid gem slot
      childAssetId: 3, // Asset id for child meant for the mid gem
    }),
    await kanaria.connect(tokenOwner).equip({
      tokenId: 1, // Kanaria 1
      childIndex: 0, // Gem 3 is on position 0
      assetId: 2, // Asset for the kanaria which is composable
      slotPartId: 11, // right gem slot
      childAssetId: 8, // Asset id for child meant for the right gem
    }),
  ];
  await Promise.all(allTx.map((tx) => tx.wait()));
  console.log("Equipped 3 gems into first kanaria");
}
```

In order for the `equipGems` to be called, we have to add it to the `main` function:

```
  await equipGems(kanaria);
```

Last thing to do is to compose the equippables with the `composeEquippables` function. It composes the whole NFT along with the nested and equipped parts:

```
async function composeEquippables(
  views: RMRKEquipRenderUtils,
  kanariaAddress: string
): Promise<void> {
  console.log("Composing equippables");
  const tokenId = 1;
  const assetId = 2;
  console.log(
    "Composed: ",
    await views.composeEquippables(kanariaAddress, tokenId, assetId)
  );
}
```

NOTE: Using RMRKEquipRenderUtils is not required for Equippable to work, it just provides a dedicated utility for easier viewing of the full composites.

In order for the `composeEquippables` to be called, we have to add it to the `main` function:

```
  await composeEquippables(views, kanaria.address);
```

Instead of deploying the smart contracts, we can also retrieve the already deployed ones and use those in it. To do that, we can define the addresses of the smart contracts below the `import` statements:

```
const deployedKanariaAddress = "";
const deployedGemAddress = "";
const deployedCatalogAddress = "";
const deployedViewsAddress = "";
```

A function to retrieve the smart contracts is called `retrieveContracts` and it only loads the contract factories and attaches them to the already deployed smart contracts:

```
async function retrieveContracts(): Promise<
  [SimpleEquippable, SimpleEquippable, SimpleCatalog, RMRKEquipRenderUtils]
> {
  const contractFactory = await ethers.getContractFactory("SimpleEquippable");
  const catalogFactory = await ethers.getContractFactory("SimpleCatalog");
  const viewsFactory = await ethers.getContractFactory("RMRKEquipRenderUtils");

  const kanaria: SimpleEquippable = contractFactory.attach(
    deployedKanariaAddress
  );
  const gem: SimpleEquippable = contractFactory.attach(deployedGemAddress);
  const catalog: SimpleCatalog = catalogFactory.attach(deployedCatalogAddress);
  const views: RMRKEquipRenderUtils = await viewsFactory.attach(
    deployedViewsAddress
  );

  return [kanaria, gem, catalog, views];
}
```

In order to use it, replace the call to the `deployContracts` at the beginning of the main function with the `retrieveContracts`.

With the user journey script concluded, we can add a custom helper to the `package.json` to make running it easier:

```
    "user-journey-merged-equippable": "hardhat run scripts/mergedEquippableUserJourney.ts"
```

You can run it using `npm run user-journey-merged-equippable`.

## Advanced MergedEquippable

Uses the `AdvancedCatalog` and `AdvancedEquippable` and allows for more flexibility when implementing the Merged equippable RMRK lego. It implements the minimum required implementation in order to be compatible with RMRK merged equippable, but leaves more business logic implementation freedom to the developer.

### AdvancedCatalog

The `AdvancedCatalog` smart contract uses the [RMRKCatalog.sol](https://github.com/rmrk-team/evm/blob/dev/contracts/RMRK/catalog/RMRKCatalog.sol) import to gain access to the Catalog lego:

```
import "@rmrk-team/evm-contracts/contracts/RMRK/catalog/RMRKCatalog.sol";
```

We only need `symbol` and `type_` of the catalog in order to properly initialize it after the AdvancedCatalog inherits it:

```
contract AdvancedCatalog is RMRKCatalog {
    // NOTE: Additional custom arguments can be added to the constructor based on your needs.
    constructor(
        string memory symbol,
        string memory type_
    )
        RMRKCatalog(symbol, type_)
    {
        // Custom optional: constructor logic
    }
}
```

The full code is thus:

```
// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.16;

import "@rmrk-team/evm-contracts/contracts/RMRK/catalog/RMRKCatalog.sol";

contract AdvancedCatalog is RMRKCatalog {
    // NOTE: Additional custom arguments can be added to the constructor based on your needs.
    constructor(
        string memory symbol,
        string memory type_
    )
        RMRKCatalog(symbol, type_)
    {
        // Custom optional: constructor logic
    }
}
```

Using RMRKCatalog requires custom implementation of part management. Available internal functions to use when writing it are:

- `_addPart(IntakeStruct memory intakeStruct)`
- `_addPartList(IntakeStruct[] memory intakeStructs)`

In addition to the part management functions, you should also implement the equippable management function with the following internal ones available:

- `_addEquippableAddresses(uint64 partId, address[] memory equippableAddresses)`
- `_setEquippableAddresses( uint64 partId, address[] memory equippableAddresses)`
- `_setEquippableToAll(uint64 partId)`
- `_resetEquippableAddresses(uint64 partId)`

Any additional functions supporting your NFT use case and utility related to the Catalog RMRK lego can also be added.

### AdvancedEquippable

AdvancedEquippable uses the [`RMRKEquippable.sol`](https://github.com/rmrk-team/evm/blob/dev/contracts/RMRK/equippable/RMRKEquippable.sol) import to gain access to the Merged equippable RMRK lego composite:

```
import "@rmrk-team/evm-contracts/contracts/RMRK/equippable/RMRKEquippable.sol";
```

We only need `name` and `symbol` of the NFT collection in order to properly initialize it after the AdvancedEquippable inherits it:

```
contract AdvancedEquippable is RMRKEquippable {
    // NOTE: Additional custom arguments can be added to the constructor based on your needs.
    constructor(
        string memory name,
        string memory symbol
    )
        RMRKEquippable(name, symbol)
    {
        // Custom optional: constructor logic
    }
}
```

This is all that is required to get you started with implementing the Merged equippable RMRK lego composite.

Using RMRKEquippable requires custom implementation of minting logic. Available internal functions to use when writing it are:

- `_mint(address to, uint256 tokenId)`
- `_safeMint(address to, uint256 tokenId)`
- `_safeMint(address to, uint256 tokenId, bytes memory data)`
- `_nestMint(address to, uint256 tokenId, uint256 destinationId, bytes memory data)`

The latter is used to mint a child NFT directly into the parent NFT, so implement it if you foresee it applies to your use case. Additionally burning and transfer functions can be implemented using:

- `_burn(uint256 tokenId, uint256 maxChildrenBurns)`
- `transferFrom(address from, address to, uint256 tokenId)`
- `nestTransferFrom(address from, address to, uint256 tokenId, uint256 destinationId, bytes memory data)`

Asset and reference management functions should also be implemented using:

- `_addEquippableAssetEntry(uint64 id, uint64 equippableGroupId, address baseAddress, string memory metadataURI, uint64[] calldata partIds)`
- `_addAssetToToken(uint256 tokenId, uint64 assetId, uint64 replacesAssetWithId)`
- `_setValidParentForEquippableGroup(uint64 equippableGroupId, address parentAddress, uint64 slotPartId)`

Any additional functions supporting your NFT use case and utility can also be added.

---

## Training Data

    ## Advanced MergedEquippable

    The Advanced MergedEquippable implementation uses the `AdvancedCatalog` and `AdvancedEquippable` and allows for more flexibility when implementing the Merged equippable RMRK lego. It implements the minimum required implementation in order to be compatible with RMRK merged equippable, but leaves more business logic implementation freedom to the developer.

    ### AdvancedCatalog

    The `AdvancedCatalog` smart contract represents the minimum required implementation in order for the smart contract to be compatible with the `Catalog` RMRK lego. It uses the [RMRKCatalog.sol](https://github.com/rmrk-team/evm/blob/dev/contracts/RMRK/catalog/RMRKCatalog.sol) import to gain access to the Catalog lego:

    ```
    import "@rmrk-team/evm-contracts/contracts/RMRK/catalog/RMRKCatalog.sol";
    ```

    We only need `symbol` and `type_` of the catalog in order to properly initialize it after the AdvancedCatalog inherits it:

    ```
    contract AdvancedCatalog is RMRKCatalog {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            string memory symbol,
            string memory type_
        )
            RMRKCatalog(symbol, type_)
        {
            // Custom optional: constructor logic
        }
    }
    ```

    The full code is thus:

    ```
    // SPDX-License-Identifier: Apache-2.0

    pragma solidity ^0.8.16;

    import "@rmrk-team/evm-contracts/contracts/RMRK/catalog/RMRKCatalog.sol";

    contract AdvancedCatalog is RMRKCatalog {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            string memory symbol,
            string memory type_
        )
            RMRKCatalog(symbol, type_)
        {
            // Custom optional: constructor logic
        }
    }
    ```

    Using RMRKCatalog requires custom implementation of part management. Available internal functions to use when writing it are:
    - `_addPart(IntakeStruct memory intakeStruct)`
    - `_addPartList(IntakeStruct[] memory intakeStructs)`

    In addition to the part management functions, you should also implement the equippable management function with the following internal ones available:
    - `_addEquippableAddresses(uint64 partId, address[] memory equippableAddresses)`
    - `_setEquippableAddresses( uint64 partId, address[] memory equippableAddresses)`
    - `_setEquippableToAll(uint64 partId)`
    - `_resetEquippableAddresses(uint64 partId)`

    Any additional functions supporting your NFT use case and utility related to the Catalog RMRK lego can also be added. Remember to thoroughly test your smart contracts with extensive test suites and define strict access control rules for the functions that you implement.

    ### AdvancedEquippable

    The AdvancedEquippable smart contract represents the minimum required implementation in order for the smart contract to be compatible with the MergedEquippable RMRK lego composite. It uses the [`RMRKEquippable.sol`](https://github.com/rmrk-team/evm/blob/dev/contracts/RMRK/equippable/RMRKEquippable.sol) import to gain access to the Merged equippable RMRK lego composite:

    ```
    import "@rmrk-team/evm-contracts/contracts/RMRK/equippable/RMRKEquippable.sol";
    ```

    We only need `name` and `symbol` of the NFT collection in order to properly initialize it after the AdvancedEquippable inherits it:

    ```
    contract AdvancedEquippable is RMRKEquippable {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            string memory name,
            string memory symbol
        )
            RMRKEquippable(name, symbol)
        {
            // Custom optional: constructor logic
        }
    }
    ```

    This is all that is required to get you started with implementing the Merged equippable RMRK lego composite.

    ```
    // SPDX-License-Identifier: Apache-2.0

    pragma solidity ^0.8.16;

    import "@rmrk-team/evm-contracts/contracts/RMRK/equippable/RMRKEquippable.sol";

    contract AdvancedEquippable is RMRKEquippable {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            string memory name,
            string memory symbol
        )
            RMRKEquippable(name, symbol)
        {
            // Custom optional: constructor logic
        }
    }
    ```

    Using RMRKEquippable requires custom implementation of minting logic. Available internal functions to use when writing it are:
    - `_mint(address to, uint256 tokenId)`
    - `_safeMint(address to, uint256 tokenId)`
    - `_safeMint(address to, uint256 tokenId, bytes memory data)`
    - `_nestMint(address to, uint256 tokenId, uint256 destinationId, bytes memory data)`

    The latter is used to mint a child NFT directly into the parent NFT, so implement it if you foresee it applies to your use case. Additionally burning and transfer functions can be implemented using:
    - `_burn(uint256 tokenId, uint256 maxChildrenBurns)`
    - `transferFrom(address from, address to, uint256 tokenId)`
    - `nestTransferFrom(address from, address to, uint256 tokenId, uint256 destinationId, bytes memory data)`

    Asset and reference management functions should also be implemented using:
    - `_addEquippableAssetEntry(uint64 id, uint64 equippableGroupId, address baseAddress, string memory metadataURI, uint64[] calldata partIds)`
    - `_addAssetToToken(uint256 tokenId, uint64 assetId, uint64 replacesAssetWithId)`
    - `_setValidParentForEquippableGroup(uint64 equippableGroupId, address parentAddress, uint64 slotPartId)`

    Any additional functions supporting your NFT use case and utility can also be added. Remember to thoroughly test your smart contracts with extensive test suites and define strict access control rules for the functions that you implement.

---

## Training Data

    Adding assets to `Gem`s is done in the `addGemAssets`. It accepts `Gem`, address of the `Kanaria` smart contract and the address of the `Catalog` smart contract. We will add 4 assets for each gem; one full version and three that match each slot. Reference IDs are specified for easier reference from the child's perspective. The assets will be added one by one. Note how the full versions of gems don't have the `equippableGroupId`.

    Having added the asset entries, we can now add the valid parent reference IDs using the `setValidParentForEquippableGroup`. For example if we want to add a valid reference for the left gem, we need to pass the value of equippable reference ID of the left gem, parent smart contract address (in our case this is Kanaria smart contract) and ID of the slot which was defined in Catalog (this is ID number 9 in the Catalog for the left gem).

    Last thing to do is to add assets to the tokens using [`addAssetToToken`](https://github.com/rmrk-team/evm-dev-docs/blob/master/rmrk-legos-examples/broken-reference/README.md). Asset of type A will be added to the gems 1 and 2, and the type B of the asset is added to gem 3. All of these should be accepted using `acceptAsset`:

    ```
    async function addGemAssets(
      gem: SimpleEquippable,
      kanariaAddress: string,
      catalogAddress: string
    ): Promise<void> {
      console.log("Adding Gem assets");
      const [ , tokenOwner] = await ethers.getSigners();
      // We'll add 4 assets for each gem, a full version and 3 versions matching each slot.
      // We will have only 2 types of gems -> 4x2: 8 assets.
      // This is not composed by others, so fixed and slot parts are never used.
      const gemVersions = 4;

      // These refIds are used from the child's perspective, to group assets that can be equipped into a parent
      // With it, we avoid the need to do set it asset by asset
      const equippableRefIdLeftGem = 1;
      const equippableRefIdMidGem = 2;
      const equippableRefIdRightGem = 3;

      // We can do a for loop, but this makes it clearer.
      console.log("Adding asset entries");
      let allTx = [
      let allTx = [
        await gem.addEquippableAssetEntry(
          // Full version for first type of gem, no need of refId or catalog
          0,
          catalogAddress,
          `ipfs://gems/typeA/full.svg`,
          []
        ),
        await gem.addEquippableAssetEntry(
          // Equipped into left slot for first type of gem
          equippableRefIdLeftGem,
          catalogAddress,
          `ipfs://gems/typeA/left.svg`,
          []
        ),
        await gem.addEquippableAssetEntry(
          // Equipped into mid slot for first type of gem
          equippableRefIdMidGem,
          catalogAddress,
          `ipfs://gems/typeA/mid.svg`,
          []
        ),
        await gem.addEquippableAssetEntry(
          // Equipped into left slot for first type of gem
          equippableRefIdRightGem,
          catalogAddress,
          `ipfs://gems/typeA/right.svg`,
          []
        ),
        await gem.addEquippableAssetEntry(
          // Full version for second type of gem, no need of refId or catalog
          0,
          ethers.constants.AddressZero,
          `ipfs://gems/typeB/full.svg`,
          []
        ),
        await gem.addEquippableAssetEntry(
          // Equipped into left slot for second type of gem
          equippableRefIdLeftGem,
          catalogAddress,
          `ipfs://gems/typeB/left.svg`,
          []
        ),
        await gem.addEquippableAssetEntry(
          // Equipped into mid slot for second type of gem
          equippableRefIdMidGem,
          catalogAddress,
          `ipfs://gems/typeB/mid.svg`,
          []
        ),
        await gem.addEquippableAssetEntry(
          // Equipped into right slot for second type of gem
          equippableRefIdRightGem,
          catalogAddress,
          `ipfs://gems/typeB/right.svg`,
          []
        ),
      ];

      await Promise.all(allTx.map((tx) => tx.wait()));
      console.log(
        "Added 8 gem assets. 2 Types of gems with full, left, mid and right versions."
      );

      // 9, 10 and 11 are the slot part ids for the gems, defined on the catalog.
      // e.g. Any asset on gem, which sets its equippableRefId to equippableRefIdLeftGem
      //      will be considered a valid equip into any kanaria on slot 9 (left gem).
      console.log("Setting valid parent reference IDs");
      allTx = [
        await gem.setValidParentForEquippableGroup(equippableRefIdLeftGem, kanariaAddress, 9),
        await gem.setValidParentForEquippableGroup(equippableRefIdMidGem, kanariaAddress, 10),
        await gem.setValidParentForEquippableGroup(equippableRefIdRightGem, kanariaAddress, 11),
      ];
      await Promise.all(allTx.map((tx) => tx.wait()));

      // We add assets of type A to gem 1 and 2, and type B to gem 3. Both are nested into the first kanaria
      // This means gems 1 and 2 will have the same asset, which is totally valid.
      console.log("Add assets to tokens");
      allTx = [
        await gem.addAssetToToken(1, 1, 0),
        await gem.addAssetToToken(1, 2, 0),
        await gem.addAssetToToken(1, 3, 0),
        await gem.addAssetToToken(1, 4, 0),
        await gem.addAssetToToken(2, 1, 0),
        await gem.addAssetToToken(2, 2, 0),
        await gem.addAssetToToken(2, 3, 0),
        await gem.addAssetToToken(2, 4, 0),
        await gem.addAssetToToken(3, 5, 0),
        await gem.addAssetToToken(3, 6, 0),
        await gem.addAssetToToken(3, 7, 0),
        await gem.addAssetToToken(3, 8, 0),
      ];
      await Promise.all(allTx.map((tx) => tx.wait()));
      console.log("Added 4 assets to each of 3 gems.");

    // We accept each asset for all gems
      allTx = [
        await gem.connect(tokenOwner).acceptAsset(1, 3, 4),
        await gem.connect(tokenOwner).acceptAsset(1, 2, 3),
        await gem.connect(tokenOwner).acceptAsset(1, 1, 2),
        await gem.connect(tokenOwner).acceptAsset(1, 0, 1),
        await gem.connect(tokenOwner).acceptAsset(2, 3, 4),
        await gem.connect(tokenOwner).acceptAsset(2, 2, 3),
        await gem.connect(tokenOwner).acceptAsset(2, 1, 2),
        await gem.connect(tokenOwner).acceptAsset(2, 0, 1),
        await gem.connect(tokenOwner).acceptAsset(3, 3, 8),
        await gem.connect(tokenOwner).acceptAsset(3, 2, 7),
        await gem.connect(tokenOwner).acceptAsset(3, 1, 6),
        await gem.connect(tokenOwner).acceptAsset(3, 0, 5),
      ];
      await Promise.all(allTx.map((tx) => tx.wait()));
      console.log("Accepted 4 assets to each of 3 gems.");
    }
    ```

    In order for the `addKanariaAssets` and `addGemAssets` to be called, we have to add them to the `main` function:

    ```
      await addKanariaAssets(kanaria, catalog.address);
      await addGemAssets(gem, kanaria.address, catalog.address);
    ```

    With `Kanaria`s and `Gem`s ready, we can equip the gems to Kanarias using the `equipGems` function. We will build a batch of equip transactions and then send them one after the other:

    ```
    async function equipGems(kanaria: SimpleEquippable): Promise<void> {
      console.log("Equipping gems");
      const [ , tokenOwner] = await ethers.getSigners();
      const allTx = [
        await kanaria.connect(tokenOwner).equip({
          tokenId: 1, // Kanaria 1
          childIndex: 2, // Gem 1 is on position 2
          assetId: 2, // Asset for the kanaria which is composable
          slotPartId: 9, // left gem slot
          childAssetId: 2, // Asset id for child meant for the left gem
        }),
        await kanaria.connect(tokenOwner).equip({
          tokenId: 1, // Kanaria 1
          childIndex: 1, // Gem 2 is on position 1
          assetId: 2, // Asset for the kanaria which is composable
          slotPartId: 10, // mid gem slot
          childAssetId: 3, // Asset id for child meant for the mid gem
        }),
        await kanaria.connect(tokenOwner).equip({
          tokenId: 1, // Kanaria 1
          childIndex: 0, // Gem 3 is on position 0
          assetId: 2, // Asset for the kanaria which is composable
          slotPartId: 11, // right gem slot
          childAssetId: 8, // Asset id for child meant for the right gem
        }),
      ];
      await Promise.all(allTx.map((tx) => tx.wait()));
      console.log("Equipped 3 gems into first kanaria");
    }
    ```

    In order for the `equipGems` to be called, we have to add it to the `main` function:

    ```
      await equipGems(kanaria);
    ```

    Last thing to do is to compose the equippables with the `composeEquippables` function. It composes the whole NFT along with the nested and equipped parts:

    ```
    async function composeEquippables(
      views: RMRKEquipRenderUtils,
      kanariaAddress: string
    ): Promise<void> {
      console.log("Composing equippables");
      const tokenId = 1;
      const assetId = 2;
      console.log(
        "Composed: ",
        await views.composeEquippables(kanariaAddress, tokenId, assetId)
      );
    }
    ```

    NOTE: Using RMRKEquipRenderUtils is not required for Equippable to work, it just provides a dedicated utility for easier viewing of the full composites.

    In order for the `composeEquippables` to be called, we have to add it to the `main` function:

    ```
      await composeEquippables(views, kanaria.address);
    ```

    Instead of deploying the smart contracts, we can also retrieve the already deployed ones and use those in it. To do that, we can define the addresses of the smart contracts below the `import` statements:

    ```
    const deployedKanariaAddress = "";
    const deployedGemAddress = "";
    const deployedCatalogAddress = "";
    const deployedViewsAddress = "";
    ```

    A function to retrieve the smart contracts is called `retrieveContracts` and it only loads the contract factories and attaches them to the already deployed smart contracts:

    ```
    async function retrieveContracts(): Promise<
      [SimpleEquippable, SimpleEquippable, SimpleCatalog, RMRKEquipRenderUtils]
    > {
      const contractFactory = await ethers.getContractFactory("SimpleEquippable");
      const catalogFactory = await ethers.getContractFactory("SimpleCatalog");
      const viewsFactory = await ethers.getContractFactory("RMRKEquipRenderUtils");

      const kanaria: SimpleEquippable = contractFactory.attach(
        deployedKanariaAddress
      );
      const gem: SimpleEquippable = contractFactory.attach(deployedGemAddress);
      const catalog: SimpleCatalog = catalogFactory.attach(deployedCatalogAddress);
      const views: RMRKEquipRenderUtils = await viewsFactory.attach(
        deployedViewsAddress
      );

      return [kanaria, gem, catalog, views];
    }
    ```

    In order to use it, replace the call to the `deployContracts` at the beginning of the main function with the `retrieveContracts`.

    With the user journey script concluded, we can add a custom helper to the `package.json` to make running it easier:

    ```
        "user-journey-merged-equippable": "hardhat run scripts/mergedEquippableUserJourney.ts"
    ```

    You can run it using `npm run user-journey-merged-equippable`.

    ## Advanced MergedEquippable

    Uses the `AdvancedCatalog` and `AdvancedEquippable` and allows for more flexibility when implementing the Merged equippable RMRK lego. It implements the minimum required implementation in order to be compatible with RMRK merged equippable, but leaves more business logic implementation freedom to the developer.

    ### AdvancedCatalog

    The `AdvancedCatalog` smart contract uses the [RMRKCatalog.sol](https://github.com/rmrk-team/evm/blob/dev/contracts/RMRK/catalog/RMRKCatalog.sol) import to gain access to the Catalog lego:

    ```
    import "@rmrk-team/evm-contracts/contracts/RMRK/catalog/RMRKCatalog.sol";
    ```

    We only need `symbol` and `type_` of the catalog in order to properly initialize it after the AdvancedCatalog inherits it:

    ```
    contract AdvancedCatalog is RMRKCatalog {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            string memory symbol,
            string memory type_
        )
            RMRKCatalog(symbol, type_)
        {
            // Custom optional: constructor logic
        }
    }
    ```

    The full code is thus:

    ```
    // SPDX-License-Identifier: Apache-2.0

    pragma solidity ^0.8.16;

    import "@rmrk-team/evm-contracts/contracts/RMRK/catalog/RMRKCatalog.sol";

    contract AdvancedCatalog is RMRKCatalog {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            string memory symbol,
            string memory type_
        )
            RMRKCatalog(symbol, type_)
        {
            // Custom optional: constructor logic
        }
    }
    ```

    Using RMRKCatalog requires custom implementation of part management. Available internal functions to use when writing it are:

    - `_addPart(IntakeStruct memory intakeStruct)`
    - `_addPartList(IntakeStruct[] memory intakeStructs)`

    In addition to the part management functions, you should also implement the equippable management function with the following internal ones available:

    - `_addEquippableAddresses(uint64 partId, address[] memory equippableAddresses)`
    - `_setEquippableAddresses( uint64 partId, address[] memory equippableAddresses)`
    - `_setEquippableToAll(uint64 partId)`
    - `_resetEquippableAddresses(uint64 partId)`

    Any additional functions supporting your NFT use case and utility related to the Catalog RMRK lego can also be added.

    ### AdvancedEquippable

    AdvancedEquippable uses the [`RMRKEquippable.sol`](https://github.com/rmrk-team/evm/blob/dev/contracts/RMRK/equippable/RMRKEquippable.sol) import to gain access to the Merged equippable RMRK lego composite:

    ```
    import "@rmrk-team/evm-contracts/contracts/RMRK/equippable/RMRKEquippable.sol";
    ```

    We only need `name` and `symbol` of the NFT collection in order to properly initialize it after the AdvancedEquippable inherits it:

    ```
    contract AdvancedEquippable is RMRKEquippable {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            string memory name,
            string memory symbol
        )
            RMRKEquippable(name, symbol)
        {
            // Custom optional: constructor logic
        }
    }
    ```

    This is all that is required to get you started with implementing the Merged equippable RMRK lego composite.

    Using RMRKEquippable requires custom implementation of minting logic. Available internal functions to use when writing it are:

    - `_mint(address to, uint256 tokenId)`
    - `_safeMint(address to, uint256 tokenId)`
    - `_safeMint(address to, uint256 tokenId, bytes memory data)`
    - `_nestMint(address to, uint256 tokenId, uint256 destinationId, bytes memory data)`

    The latter is used to mint a child NFT directly into the parent NFT, so implement it if you foresee it applies to your use case. Additionally burning and transfer functions can be implemented using:

    - `_burn(uint256 tokenId, uint256 maxChildrenBurns)`
    - `transferFrom(address from, address to, uint256 tokenId)`
    - `nestTransferFrom(address from, address to, uint256 tokenId, uint256 destinationId, bytes memory data)`

    Asset and reference management functions should also be implemented using:

    - `_addEquippableAssetEntry(uint64 id, uint64 equippableGroupId, address baseAddress, string memory metadataURI, uint64[] calldata partIds)`
    - `_addAssetToToken(uint256 tokenId, uint64 assetId, uint64 replacesAssetWithId)`
    - `_setValidParentForEquippableGroup(uint64 equippableGroupId, address parentAddress, uint64 slotPartId)`

    Any additional functions supporting your NFT use case and utility can also be added.
