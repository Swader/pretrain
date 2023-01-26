---
sidebar_position: 16
---

# EVM, multi-asset part 2

## Deploy Script

The deploy script for the `SimpleMultiAsset` smart contract resides in `deployMultiAsset.ts`.

The script uses `ethers`, `SimpleMultiAsset` and `ContractTransaction` imports. The empty deploy script should look like this:

```
import { ethers } from "hardhat";
import { SimpleMultiAsset } from "../typechain-types";
import { ContractTransaction } from "ethers";

async function main() {

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Before we can deploy the parent and child smart contracts, we should prepare the constants that we will use in the script:

```
  const pricePerMint = ethers.utils.parseEther("0.0001");
  const totalTokens = 5;
  const [owner] = await ethers.getSigners();
```

Now that the constants are ready, we can deploy the smart contract and log the address of the contract to the console:

```
  const contractFactory = await ethers.getContractFactory(
    "SimpleMultiAsset"
  );
  const token: SimpleMultiAsset = await contractFactory.deploy(
    {
      erc20TokenAddress: ethers.constants.AddressZero,
      tokenUriIsEnumerable: true,
      royaltyRecipient: ethers.constants.AddressZero,
      royaltyPercentageBps: 0,
      maxSupply: 1000,
      pricePerMint: pricePerMint 
    }
  );

  await token.deployed();
  console.log(`Sample contract deployed to ${token.address}`);
```

A custom script added to `package.json` allows us to easily run the script:

```
  "scripts": {
    "deploy-multi-asset": "hardhat run scripts/deployMultiAsset.ts"
  }
```

Using the script with `npm run deploy-multi-asset` should return the following output:

```
npm run deploy-multi-asset

> @rmrk-team/evm-contract-samples@0.1.0 deploy-multi-asset
> hardhat run scripts/deployMultiAsset.ts

Compiled 47 Solidity files successfully
Sample contract deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## User Journey

With the deploy script ready, we can examine how the journey of a user using multi asset would look like using this smart contract.
The base of it is the same as the deploy script, as we need to deploy the smart contract in order to interact with it:

```
import { ethers } from "hardhat";
import { SimpleMultiAsset } from "../typechain-types";
import { ContractTransaction } from "ethers";

async function main() {
  const pricePerMint = ethers.utils.parseEther("0.0001");
  const totalTokens = 5;
  const [ , tokenOwner] = await ethers.getSigners();

  const contractFactory = await ethers.getContractFactory(
    "SimpleMultiAsset"
  );
  const token: SimpleMultiAsset = await contractFactory.deploy(
    {
      erc20TokenAddress: ethers.constants.AddressZero,
      tokenUriIsEnumerable: true,
      royaltyRecipient: ethers.constants.AddressZero,
      royaltyPercentageBps: 0,
      maxSupply: 1000,
      pricePerMint: pricePerMint 
    }
  );

  await token.deployed();
  console.log(`Sample contract deployed to ${token.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

NOTE: We assign the `tokenOwner` the second available signer, so that the assets are not automatically accepted when added to the token. This happens when an account adding an asset to a token is also the owner of said token.

First thing that needs to be done after the smart contract is deployed it to mint the NFT. We will use the `totalTokens` constant to specify how many tokens to mint:

```
  console.log("Minting tokens");
  let tx = await token.mint(tokenOwner.address, totalTokens, {
    value: pricePerMint.mul(totalTokens),
  });
  await tx.wait();
  console.log(`Minted ${totalTokens} tokens`);
  const totalSupply = await token.totalSupply();
  console.log("Total tokens: %s", totalSupply);
```

Now that the tokens are minted, we can add new assets to the smart contract. We will prepare a batch of transactions that will add simple IPFS metadata link for the assets in the smart contract. Once the transactions are ready, we will send them and get all of the assets to output to the console:

```
  console.log("Adding assets");
  let allTx: ContractTransaction[] = [];
  for (let i = 1; i <= totalTokens; i++) {
    let tx = await token.addAssetEntry(`ipfs://metadata/${i}.json`);
    allTx.push(tx);
  }
  console.log(`Added ${totalTokens} assets`);

  console.log("Awaiting for all tx to finish...");
  await Promise.all(allTx.map((tx) => tx.wait()));
```

Once the assets are added to the smart contract we can assign each asset to one of the tokens:

```
  console.log("Adding assets to tokens");
  allTx = [];
  for (let i = 1; i <= totalTokens; i++) {
    // We give each token a asset id with the same number. This is just a coincidence, not a restriction.
    let tx = await token.addAssetToToken(i, i, 0);
    allTx.push(tx);
    console.log(`Added asset ${i} to token ${i}.`);
  }
  console.log("Awaiting for all tx to finish...");
  await Promise.all(allTx.map((tx) => tx.wait()));
```

After the assets are added to the NFTs, we have to accept them. We will do this by once again building a batch of transactions for each of the tokens and send them at the end:

```
  console.log("Accepting token assets");
  allTx = [];
  for (let i = 1; i <= totalTokens; i++) {
    // Accept pending asset for each token (on index 0)
    let tx = await token.connect(tokenOwner).acceptAsset(i, 0, i);
    allTx.push(tx);
    console.log(`Accepted first pending asset for token ${i}.`);
  }
  console.log("Awaiting for all tx to finish...");
  await Promise.all(allTx.map((tx) => tx.wait()));
```

NOTE: Accepting assets is done in a array that gets elements, new assets, appended to the end of it. Once the asset is accepted, the asset that was added last, takes its place. For example:

- We have assets A, B, C and D in the pending array organised like this: [A, B, C, D].
- Accepting the asset A updates the array to look like this: [D, B, C].
- Accepting the asset B updates the array to look like this: [A, D, C].

Finally we can check wether the URI are assigned as expected and output the values to the console:

```
  console.log("Getting URIs");
  const uriToken1 = await token.tokenURI(1);
  const uriFinalToken = await token.tokenURI(totalTokens);

  console.log("Token 1 URI: ", uriToken1);
  console.log("Token totalTokens URI: ", uriFinalToken);
```

With the user journey script concluded, we can add a custom helper to the `package.json` to make running it easier:

```
    "user-journey-multi-asset": "hardhat run scripts/multiAssetUserJourney.ts"
```

Running it using `npm run user-journey-multi-asset` should return the following output:

```
 npm run user-journey-multi-asset

> @rmrk-team/evm-contract-samples@0.1.0 user-journey-multi-asset
> hardhat run scripts/multiAssetUserJourney.ts

Sample contract deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
Minting tokens
Minted 5 tokens
Total tokens: 5
Adding assets
Added 5 assets
Awaiting for all tx to finish...
All assets: [
  BigNumber { value: "1" },
  BigNumber { value: "2" },
  BigNumber { value: "3" },
  BigNumber { value: "4" },
  BigNumber { value: "5" }
]
Adding assets to tokens
Added asset 1 to token 1.
Added asset 2 to token 2.
Added asset 3 to token 3.
Added asset 4 to token 4.
Added asset 5 to token 5.
Awaiting for all tx to finish...
Accepting token assets
Accepted first pending asset for token 1.
Accepted first pending asset for token 2.
Accepted first pending asset for token 3.
Accepted first pending asset for token 4.
Accepted first pending asset for token 5.
Awaiting for all tx to finish...
Getting URIs
Token 1 URI:  ipfs://metadata/1.json
Token totalTokens URI:  ipfs://metadata/5.json
```

This concludes our work on the `SimpleMultiAsset.sol`. We can now move on to examining the `AdvancedMultiAsset.sol`.

## AdvancedMultiAsset

The `AdvancedMultiAsset` smart contract allows for more flexibility when using the multi asset lego. It implements minimum required implementation in order to be compatible with RMRK multi asset, but leaves more business logic implementation freedom to the developer. It uses the `RMRKMultiAsset.sol` import to gain access to the Multi asset lego:

```
import "@rmrk-team/evm-contracts/contracts/RMRK/multiasset/RMRKMultiAsset.sol";
```

We only need `name` and `symbol` of the NFT in order to properly initialize it after the `AdvancedMultiAsset` inherits it:

```
contract AdvancedMultiAsset is RMRKMultiAsset {
    // NOTE: Additional custom arguments can be added to the constructor based on your needs.
    constructor(
        string memory name,
        string memory symbol
    )
        RMRKMultiAsset(name, symbol)
    {
        // Custom optional: constructor logic
    }
}
```

This is all that is required to get you started with implementing the Multi asset RMRK lego.

The full code is thus:

```
// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.16;

import "@rmrk-team/evm-contracts/contracts/RMRK/multiasset/RMRKMultiAsset.sol";

contract AdvancedMultiAsset is RMRKMultiAsset {
    // NOTE: Additional custom arguments can be added to the constructor based on your needs.
    constructor(
        string memory name,
        string memory symbol
    )
        RMRKMultiAsset(name, symbol)
    {
        // Custom optional: constructor logic
    }
}
```

Using `RMRKMultiAsset` requires custom implementation of minting logic. Available internal functions to use when writing it are:

- `_mint(address to, uint256 tokenId)`
- `_safeMint(address to, uint256 tokenId)`
- `_safeMint(address to, uint256 tokenId, bytes memory data)`

In addition to the minting functions, you should also implement the burning, transfer and asset management functions if they apply to your use case:

- `_burn(uint256 tokenId)`
- `_addAssetEntry(uint64 id, string memory metadataURI)`
- `_addAssetToToken(uint256 tokenId, uint64 assetId, uint64 replacesAssetWithId)`
- `transferFrom(address from, address to, uint256 tokenId)`

Any additional functions supporting your NFT use case and utility can also be added.

---

## Training Data

    ## Deploy Script

    The deploy script for the `SimpleMultiAsset` smart contract resides in `deployMultiAsset.ts`.

    The script uses `ethers`, `SimpleMultiAsset` and `ContractTransaction` imports. The empty deploy script should look like this:

    ```
    import { ethers } from "hardhat";
    import { SimpleMultiAsset } from "../typechain-types";
    import { ContractTransaction } from "ethers";

    async function main() {

    }

    main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
    });
    ```

    Before we can deploy the parent and child smart contracts, we should prepare the constants that we will use in the script:

    ```
    const pricePerMint = ethers.utils.parseEther("0.0001");
    const totalTokens = 5;
    const [owner] = await ethers.getSigners();
    ```

    Now that the constants are ready, we can deploy the smart contract and log the address of the contract to the console:

    ```
    const contractFactory = await ethers.getContractFactory(
        "SimpleMultiAsset"
    );
    const token: SimpleMultiAsset = await contractFactory.deploy(
        {
        erc20TokenAddress: ethers.constants.AddressZero,
        tokenUriIsEnumerable: true,
        royaltyRecipient: ethers.constants.AddressZero,
        royaltyPercentageBps: 0,
        maxSupply: 1000,
        pricePerMint: pricePerMint 
        }
    );

    await token.deployed();
    console.log(`Sample contract deployed to ${token.address}`);
    ```

    A custom script added to `package.json` allows us to easily run the script:

    ```
    "scripts": {
        "deploy-multi-asset": "hardhat run scripts/deployMultiAsset.ts"
    }
    ```

    Using the script with `npm run deploy-multi-asset` should return the following output:

    ```
    npm run deploy-multi-asset

    > @rmrk-team/evm-contract-samples@0.1.0 deploy-multi-asset
    > hardhat run scripts/deployMultiAsset.ts

    Compiled 47 Solidity files successfully
    Sample contract deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
    ```

    ## User Journey

    With the deploy script ready, we can examine how the journey of a user using multi asset would look like using this smart contract.
    The base of it is the same as the deploy script, as we need to deploy the smart contract in order to interact with it:

    ```
    import { ethers } from "hardhat";
    import { SimpleMultiAsset } from "../typechain-types";
    import { ContractTransaction } from "ethers";

    async function main() {
    const pricePerMint = ethers.utils.parseEther("0.0001");
    const totalTokens = 5;
    const [ , tokenOwner] = await ethers.getSigners();

    const contractFactory = await ethers.getContractFactory(
        "SimpleMultiAsset"
    );
    const token: SimpleMultiAsset = await contractFactory.deploy(
        {
        erc20TokenAddress: ethers.constants.AddressZero,
        tokenUriIsEnumerable: true,
        royaltyRecipient: ethers.constants.AddressZero,
        royaltyPercentageBps: 0,
        maxSupply: 1000,
        pricePerMint: pricePerMint 
        }
    );

    await token.deployed();
    console.log(`Sample contract deployed to ${token.address}`);
    }

    main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
    });
    ```

    NOTE: We assign the `tokenOwner` the second available signer, so that the assets are not automatically accepted when added to the token. This happens when an account adding an asset to a token is also the owner of said token.

    First thing that needs to be done after the smart contract is deployed it to mint the NFT. We will use the `totalTokens` constant to specify how many tokens to mint:

    ```
    console.log("Minting tokens");
    let tx = await token.mint(tokenOwner.address, totalTokens, {
        value: pricePerMint.mul(totalTokens),
    });
    await tx.wait();
    console.log(`Minted ${totalTokens} tokens`);
    const totalSupply = await token.totalSupply();
    console.log("Total tokens: %s", totalSupply);
    ```

    Now that the tokens are minted, we can add new assets to the smart contract. We will prepare a batch of transactions that will add simple IPFS metadata link for the assets in the smart contract. Once the transactions are ready, we will send them and get all of the assets to output to the console:

    ```
    console.log("Adding assets");
    let allTx: ContractTransaction[] = [];
    for (let i = 1; i <= totalTokens; i++) {
        let tx = await token.addAssetEntry(`ipfs://metadata/${i}.json`);
        allTx.push(tx);
    }
    console.log(`Added ${totalTokens} assets`);

    console.log("Awaiting for all tx to finish...");
    await Promise.all(allTx.map((tx) => tx.wait()));
    ```

    Once the assets are added to the smart contract we can assign each asset to one of the tokens:

    ```
    console.log("Adding assets to tokens");
    allTx = [];
    for (let i = 1; i <= totalTokens; i++) {
        // We give each token a asset id with the same number. This is just a coincidence, not a restriction.
        let tx = await token.addAssetToToken(i, i, 0);
        allTx.push(tx);
        console.log(`Added asset ${i} to token ${i}.`);
    }
    console.log("Awaiting for all tx to finish...");
    await Promise.all(allTx.map((tx) => tx.wait()));
    ```

    After the assets are added to the NFTs, we have to accept them. We will do this by once again building a batch of transactions for each of the tokens and send them at the end:

    ```
    console.log("Accepting token assets");
    allTx = [];
    for (let i = 1; i <= totalTokens; i++) {
        // Accept pending asset for each token (on index 0)
        let tx = await token.connect(tokenOwner).acceptAsset(i, 0, i);
        allTx.push(tx);
        console.log(`Accepted first pending asset for token ${i}.`);
    }
    console.log("Awaiting for all tx to finish...");
    await Promise.all(allTx.map((tx) => tx.wait()));
    ```

    NOTE: Accepting assets is done in a array that gets elements, new assets, appended to the end of it. Once the asset is accepted, the asset that was added last, takes its place. For example:

    - We have assets A, B, C and D in the pending array organised like this: [A, B, C, D].
    - Accepting the asset A updates the array to look like this: [D, B, C].
    - Accepting the asset B updates the array to look like this: [A, D, C].

    Finally we can check wether the URI are assigned as expected and output the values to the console:

    ```
    console.log("Getting URIs");
    const uriToken1 = await token.tokenURI(1);
    const uriFinalToken = await token.tokenURI(totalTokens);

    console.log("Token 1 URI: ", uriToken1);
    console.log("Token totalTokens URI: ", uriFinalToken);
    ```

    With the user journey script concluded, we can add a custom helper to the `package.json` to make running it easier:

    ```
        "user-journey-multi-asset": "hardhat run scripts/multiAssetUserJourney.ts"
    ```

    Running it using `npm run user-journey-multi-asset` should return the following output:

    ```
    npm run user-journey-multi-asset

    > @rmrk-team/evm-contract-samples@0.1.0 user-journey-multi-asset
    > hardhat run scripts/multiAssetUserJourney.ts

    Sample contract deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
    Minting tokens
    Minted 5 tokens
    Total tokens: 5
    Adding assets
    Added 5 assets
    Awaiting for all tx to finish...
    All assets: [
    BigNumber { value: "1" },
    BigNumber { value: "2" },
    BigNumber { value: "3" },
    BigNumber { value: "4" },
    BigNumber { value: "5" }
    ]
    Adding assets to tokens
    Added asset 1 to token 1.
    Added asset 2 to token 2.
    Added asset 3 to token 3.
    Added asset 4 to token 4.
    Added asset 5 to token 5.
    Awaiting for all tx to finish...
    Accepting token assets
    Accepted first pending asset for token 1.
    Accepted first pending asset for token 2.
    Accepted first pending asset for token 3.
    Accepted first pending asset for token 4.
    Accepted first pending asset for token 5.
    Awaiting for all tx to finish...
    Getting URIs
    Token 1 URI:  ipfs://metadata/1.json
    Token totalTokens URI:  ipfs://metadata/5.json
    ```

    This concludes our work on the `SimpleMultiAsset.sol`. We can now move on to examining the `AdvancedMultiAsset.sol`.

    ## AdvancedMultiAsset

    The `AdvancedMultiAsset` smart contract allows for more flexibility when using the multi asset lego. It implements minimum required implementation in order to be compatible with RMRK multi asset, but leaves more business logic implementation freedom to the developer. It uses the `RMRKMultiAsset.sol` import to gain access to the Multi asset lego:

    ```
    import "@rmrk-team/evm-contracts/contracts/RMRK/multiasset/RMRKMultiAsset.sol";
    ```

    We only need `name` and `symbol` of the NFT in order to properly initialize it after the `AdvancedMultiAsset` inherits it:

    ```
    contract AdvancedMultiAsset is RMRKMultiAsset {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            string memory name,
            string memory symbol
        )
            RMRKMultiAsset(name, symbol)
        {
            // Custom optional: constructor logic
        }
    }
    ```

    This is all that is required to get you started with implementing the Multi asset RMRK lego.

    The full code is thus:

    ```
    // SPDX-License-Identifier: Apache-2.0

    pragma solidity ^0.8.16;

    import "@rmrk-team/evm-contracts/contracts/RMRK/multiasset/RMRKMultiAsset.sol";

    contract AdvancedMultiAsset is RMRKMultiAsset {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            string memory name,
            string memory symbol
        )
            RMRKMultiAsset(name, symbol)
        {
            // Custom optional: constructor logic
        }
    }
    ```

    Using `RMRKMultiAsset` requires custom implementation of minting logic. Available internal functions to use when writing it are:

    - `_mint(address to, uint256 tokenId)`
    - `_safeMint(address to, uint256 tokenId)`
    - `_safeMint(address to, uint256 tokenId, bytes memory data)`

    In addition to the minting functions, you should also implement the burning, transfer and asset management functions if they apply to your use case:

    - `_burn(uint256 tokenId)`
    - `_addAssetEntry(uint64 id, string memory metadataURI)`
    - `_addAssetToToken(uint256 tokenId, uint64 assetId, uint64 replacesAssetWithId)`
    - `transferFrom(address from, address to, uint256 tokenId)`

    Any additional functions supporting your NFT use case and utility can also be added.