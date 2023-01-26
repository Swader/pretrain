---
sidebar_position: 19
---

# EVM, nestable and multi asset, part 2

## User Journey

With the deploy script ready, we can examine how the journey of a user using nestable with multi asset would look like using this smart contract.
The base of it is the same as the deploy script, as we need to deploy the smart contract in order to interact with it:

```
import { ethers } from "hardhat";
import { SimpleNestableMultiAsset } from "../typechain-types";
import { ContractTransaction } from "ethers";

async function main() {
  const pricePerMint = ethers.utils.parseEther("0.0000000001");
  const totalTokens = 5;
  const [ owner, tokenOwner] = await ethers.getSigners();

  const contractFactory = await ethers.getContractFactory(
    "SimpleNestableMultiAsset"
  );
  const token: SimpleNestableMultiAsset = await contractFactory.deploy(
    {
      erc20TokenAddress: ethers.constants.AddressZero,
      tokenUriIsEnumerable: true,
      royaltyRecipient: await owner.getAddress(),
      royaltyPercentageBps: 10,
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

First thing that needs to be done after the smart contracts are deployed is to mint the NFTs. We will use the `totalTokens` constant in order to specify how many of the tokens to mint:

```
  console.log("Minting NFTs");
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

After the assets are added to the NFTs, we have to accept them. We will do this by once again building a batch of transactions for each of the tokens and send them out one by one at the end:

```
  console.log("Accepting assets to tokens");
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

Having accepted the assets, we can check that the URIs are assigned as expected:

```
  console.log("Getting URIs");
  const uriToken1 = await token.tokenURI(1);
  const uriToken5 = await token.tokenURI(totalTokens);

  console.log("Token 1 URI: ", uriToken1);
  console.log("Token totalTokens URI: ", uriToken5);
```

With the assets properly assigned to the tokens, we can now nest the token with ID 5 into the token with ID 1 and check their ownership to verify successful nesting:

```
  console.log("Nesting token with ID 5 into token with ID 1");
  await token.connect(tokenOwner).nestTransferFrom(tokenOwner.address, token.address, 5, 1, "0x");
  const parentId = await token.ownerOf(5);
  const rmrkParent = await token.directOwnerOf(5);
  console.log("Token's id 5 owner  is ", parentId);
  console.log("Token's id 5 rmrk owner is ", rmrkParent);
```

We can now add a custom helper to the `package.json` to make running it easier:

```
    "user-journey-nestable-multi-asset": "hardhat run scripts/nestableMultiAssetUserJourney.ts"
```

Running it using `npm run user-journey-nestable-multi-asset` should return the following output:

```
npm run user-journey-nestable-multi-asset

> @rmrk-team/evm-contract-samples@0.1.0 user-journey-nestable-multi-asset
> hardhat run scripts/nestableMultiAssetUserJourney.ts

Sample contract deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
Minting NFTs
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
Accepting assets to tokens
Accepted first pending asset for token 1.
Accepted first pending asset for token 2.
Accepted first pending asset for token 3.
Accepted first pending asset for token 4.
Accepted first pending asset for token 5.
Awaiting for all tx to finish...
Getting URIs
Token 1 URI:  ipfs://metadata/1.json
Token totalTokens URI:  ipfs://metadata/5.json
Nesting token with ID 5 into token with ID 1
Token's id 5 owner  is  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Token's id 5 rmrk owner is  [
  '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  BigNumber { value: "1" },
  true
]
```

## AdvancedNestableMultiAsset

The `AdvancedNestableMultiAsset` smart contract allows for more flexibility when using the nestable and multi asset legos together. It implements the minimum required implementation in order to be compatible with RMRK nestable and multi asset, but leaves more business logic implementation freedom to the developer. It uses the [`RMRKNestableMultiAsset.sol`](https://github.com/rmrk-team/evm/blob/dev/contracts/RMRK/nestable/RMRKNestableMultiAsset.sol) import to gain access to the joined Nestable and Multi asset legos:

```
import "@rmrk-team/evm-contracts/contracts/RMRK/nestable/RMRKNestableMultiAsset.sol";
```

We only need `name` and `symbol` of the NFT in order to properly initialize it after the `AdvancedNestableMultiAsset` inherits it:

```
contract AdvancedNestableMultiAsset is RMRKNestableMultiAsset {
    // NOTE: Additional custom arguments can be added to the constructor based on your needs.
    constructor(
        string memory name,
        string memory symbol
    )
        RMRKNestableMultiAsset(name, symbol)
    {
        // Custom optional: constructor logic
    }
}
```

The full code would look like this:

```
// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.16;

import "@rmrk-team/evm-contracts/contracts/RMRK/nestable/RMRKNestableMultiAsset.sol";

contract AdvancedNestableMultiAsset is RMRKNestableMultiAsset {
    // NOTE: Additional custom arguments can be added to the constructor based on your needs.
    constructor(
        string memory name,
        string memory symbol
    )
        RMRKNestableMultiAsset(name, symbol)
    {
        // Custom optional: constructor logic
    }
}
```

Using `RMRKNestableMultiAsset` requires custom implementation of minting logic. Available internal functions to use when writing it are:

- `_mint(address to, uint256 tokenId)`
- `_safeMint(address to, uint256 tokenId)`
- `_safeMint(address to, uint256 tokenId, bytes memory data)`
- `_nestMint(address to, uint256 tokenId, uint256 destinationId)`

The latter is used to nest mint the NFT directly to the parent NFT. If you intend to support it at the minting stage, you should implement it in your smart contract.

In addition to the minting functions, you should also implement the burning, transfer and asset management functions if they apply to your use case:

- `_burn(uint256 tokenId)`
- `transferFrom(address from, address to, uint256 tokenId)`
- `nestTransfer(address from, address to, uint256 tokenId, uint256 destinationId)`
- `_addAssetEntry(uint64 id, string memory metadataURI)`
- `_addAssetToToken(uint256 tokenId, uint64 assetId, uint64 overwrites)`

Any additional function supporting your NFT use case and utility can also be added. Remember to thoroughly test your smart contracts with extensive test suites and define strict access control rules for the functions that you implement.

---

## Training Data

    ## User Journey

    With the deploy script ready, we can examine how the journey of a user using nestable with multi asset would look like using this smart contract.
    The base of it is the same as the deploy script, as we need to deploy the smart contract in order to interact with it:

    ```
    import { ethers } from "hardhat";
    import { SimpleNestableMultiAsset } from "../typechain-types";
    import { ContractTransaction } from "ethers";

    async function main() {
      const pricePerMint = ethers.utils.parseEther("0.0000000001");
      const totalTokens = 5;
      const [ owner, tokenOwner] = await ethers.getSigners();

      const contractFactory = await ethers.getContractFactory(
        "SimpleNestableMultiAsset"
      );
      const token: SimpleNestableMultiAsset = await contractFactory.deploy(
        {
          erc20TokenAddress: ethers.constants.AddressZero,
          tokenUriIsEnumerable: true,
          royaltyRecipient: await owner.getAddress(),
          royaltyPercentageBps: 10,
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

    First thing that needs to be done after the smart contracts are deployed is to mint the NFTs. We will use the `totalTokens` constant in order to specify how many of the tokens to mint:

    ```
      console.log("Minting NFTs");
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

    After the assets are added to the NFTs, we have to accept them. We will do this by once again building a batch of transactions for each of the tokens and send them out one by one at the end:

    ```
      console.log("Accepting assets to tokens");
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

    Having accepted the assets, we can check that the URIs are assigned as expected:

    ```
      console.log("Getting URIs");
      const uriToken1 = await token.tokenURI(1);
      const uriToken5 = await token.tokenURI(totalTokens);

      console.log("Token 1 URI: ", uriToken1);
      console.log("Token totalTokens URI: ", uriToken5);
    ```

    With the assets properly assigned to the tokens, we can now nest the token with ID 5 into the token with ID 1 and check their ownership to verify successful nesting:

    ```
      console.log("Nesting token with ID 5 into token with ID 1");
      await token.connect(tokenOwner).nestTransferFrom(tokenOwner.address, token.address, 5, 1, "0x");
      const parentId = await token.ownerOf(5);
      const rmrkParent = await token.directOwnerOf(5);
      console.log("Token's id 5 owner  is ", parentId);
      console.log("Token's id 5 rmrk owner is ", rmrkParent);
    ```

    We can now add a custom helper to the `package.json` to make running it easier:

    ```
        "user-journey-nestable-multi-asset": "hardhat run scripts/nestableMultiAssetUserJourney.ts"
    ```

    Running it using `npm run user-journey-nestable-multi-asset` should return the following output:

    ```
    npm run user-journey-nestable-multi-asset

    > @rmrk-team/evm-contract-samples@0.1.0 user-journey-nestable-multi-asset
    > hardhat run scripts/nestableMultiAssetUserJourney.ts

    Sample contract deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
    Minting NFTs
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
    Accepting assets to tokens
    Accepted first pending asset for token 1.
    Accepted first pending asset for token 2.
    Accepted first pending asset for token 3.
    Accepted first pending asset for token 4.
    Accepted first pending asset for token 5.
    Awaiting for all tx to finish...
    Getting URIs
    Token 1 URI:  ipfs://metadata/1.json
    Token totalTokens URI:  ipfs://metadata/5.json
    Nesting token with ID 5 into token with ID 1
    Token's id 5 owner  is  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    Token's id 5 rmrk owner is  [
      '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      BigNumber { value: "1" },
      true
    ]
    ```

    ## AdvancedNestableMultiAsset

    The `AdvancedNestableMultiAsset` smart contract allows for more flexibility when using the nestable and multi asset legos together. It implements the minimum required implementation in order to be compatible with RMRK nestable and multi asset, but leaves more business logic implementation freedom to the developer. It uses the [`RMRKNestableMultiAsset.sol`](https://github.com/rmrk-team/evm/blob/dev/contracts/RMRK/nestable/RMRKNestableMultiAsset.sol) import to gain access to the joined Nestable and Multi asset legos:

    ```
    import "@rmrk-team/evm-contracts/contracts/RMRK/nestable/RMRKNestableMultiAsset.sol";
    ```

    We only need `name` and `symbol` of the NFT in order to properly initialize it after the `AdvancedNestableMultiAsset` inherits it:

    ```
    contract AdvancedNestableMultiAsset is RMRKNestableMultiAsset {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            string memory name,
            string memory symbol
        )
            RMRKNestableMultiAsset(name, symbol)
        {
            // Custom optional: constructor logic
        }
    }
    ```

    The full code would look like this:

    ```
    // SPDX-License-Identifier: Apache-2.0

    pragma solidity ^0.8.16;

    import "@rmrk-team/evm-contracts/contracts/RMRK/nestable/RMRKNestableMultiAsset.sol";

    contract AdvancedNestableMultiAsset is RMRKNestableMultiAsset {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            string memory name,
            string memory symbol
        )
            RMRKNestableMultiAsset(name, symbol)
        {
            // Custom optional: constructor logic
        }
    }
    ```

    Using `RMRKNestableMultiAsset` requires custom implementation of minting logic. Available internal functions to use when writing it are:

    - `_mint(address to, uint256 tokenId)`
    - `_safeMint(address to, uint256 tokenId)`
    - `_safeMint(address to, uint256 tokenId, bytes memory data)`
    - `_nestMint(address to, uint256 tokenId, uint256 destinationId)`

    The latter is used to nest mint the NFT directly to the parent NFT. If you intend to support it at the minting stage, you should implement it in your smart contract.

    In addition to the minting functions, you should also implement the burning, transfer and asset management functions if they apply to your use case:

    - `_burn(uint256 tokenId)`
    - `transferFrom(address from, address to, uint256 tokenId)`
    - `nestTransfer(address from, address to, uint256 tokenId, uint256 destinationId)`
    - `_addAssetEntry(uint64 id, string memory metadataURI)`
    - `_addAssetToToken(uint256 tokenId, uint64 assetId, uint64 overwrites)`

    Any additional function supporting your NFT use case and utility can also be added. Remember to thoroughly test your smart contracts with extensive test suites and define strict access control rules for the functions that you implement.
