---
sidebar_position: 18
---

# EVM, nestable and multi asset, part 1

Nestable and MultiAsset RMRK legos can be used together to provide more utility to the NFT.

## SimpleNestableMultiAsset

The `SimpleNestableMultiasset` example uses the `RMRKNestableMultiAssetImpl`. It is used by using the import statement below the pragma definition:

```
import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKNestableMultiAssetImpl.sol";
```

Once the `RMRKNestableMultiAsset.sol` is imported into our file, we can set the inheritance of our smart contract:

```
contract SimpleNestableMultiAsset is RMRKNestableMultiAssetImpl {

}
```

The `RMRKNestableMultiAssetImpl` implements all of the required functionality of the Nested and MultiAsset RMRK legos. It implements minting of parent NFTS as well as child NFTs. Management of NFT assets is also implemented alongside the classic NFT functionality.

WARNING: The `RMRKNestableMultiAssetImpl` only has minimal access control implemented. If you intend to use it, make sure to define your own, otherwise your smart contracts are at risk of unexpected behaviour.

The `constructor` in this case accepts no arguments as most of the arguments required to properly initialize RMRKNestableMultiAssetImpl are hardcoded:

- `RMRKNestableMultiAssetImpl`: represents the name argument and sets the name of the collection
- `SNMA`: represents the `symbol` argument and sets the symbol of the collection
- `ipfs://meta`: represents the `collectionMetadata_` argument and sets the URI of the collection metadata
- `ipfs://tokenMeta`: represents the `tokenURI_` argument and sets the base URI of the token metadata

The only available variable to pass to the `constructor` is:

- `data`: struct type of argument providing a number of initialization values, used to avoid initialization transaction being reverted due to passing too many parameters

NOTE: The InitData struct is used to pass the initialization parameters to the implementation smart contract. This is done so that the execution of the deploy transaction doesn't revert because we are trying to pass too many arguments.
The InitData struct contains the following fields:

```
[
    erc20TokenAddress,
    tokenUriIsEnumerable,
    royaltyRecipient,
    royaltyPercentageBps, // Expressed in basis points
    maxSupply,
    pricePerMint
]
```

NOTE: Basis points are the smallest supported denomination of percent. In our case this is one hundredth of a percent. This means that 1 basis point equals 0.01% and 10000 basis points equal 100%. So for example, if you want to set royalty percentage to 5%, the royaltyPercentageBps value should be 500.

With the arguments passed upon initialization defined, we can add our constructor:

```
    constructor(InitData memory data)
        RMRKNestableMultiAssetImpl(
            "SimpleNestableMultiAsset",
            "SNMA",
            "ipfs://meta",
            "ipfs://tokenMeta",
            data
        )
    {}
```

The full contract thus looks like this:

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKNestableMultiAssetImpl.sol";

contract SimpleNestableMultiAsset is RMRKNestableMultiAssetImpl {
    // NOTE: Additional custom arguments can be added to the constructor based on your needs.
    constructor(InitData memory data)
        RMRKNestableMultiAssetImpl(
            "SimpleNestableMultiAsset",
            "SNMA",
            "ipfs://meta",
            "ipfs://tokenMeta",
            data
        )
    {}
}
```

## RMRKNestableMultiAssetImpl

Let's take a moment to examine the core of this implementation, the `RMRKNestableMultiAssetImpl`.

It uses `RMRKRoyalties`, `RMRKNestableMultiAsset`, `RMRKCollectionMetadata` and `RMRKMintingUtils` smart contracts from RMRK stack.

Two errors are defined:

```
error RMRKMintUnderpriced();
error RMRKMintZero();
```

`RMRKMintUnderpriced()` is used when not enough value is used when attempting to mint a token and `RMRKMintZero()` is used when attempting to mint 0 tokens.

#### mint

The mint function is used to mint parent NFTs and accepts two arguments:
- `to`: address type of argument that specifies who should receive the newly minted tokens
- `numToMint`: uint256 type of argument that specifies how many tokens should be minted

There are a few constraints to this function:
- after minting, the total number of tokens should not exceed the maximum allowed supply
- attempting to mint 0 tokens is not allowed as it makes no sense to pay for the gas without any effect
- value should accompany transaction equal to a price per mint multiplied by the `numToMint`

#### nestMint

The nestMint function is used to mint child NFTs to be owned by the parent NFT and accepts three arguments:
- `to`: address type of argument specifying the address of the smart contract to which the parent NFT belongs to
- `numToMint`: uint256 type of argument specifying the amount of tokens to be minted
- `destinationId`: uint256 type of argument specifying the ID of the parent NFT to which to mint the child NFT

The constraints of nestMint are similar to the ones set out for mint function.

#### addAssetToToken

addAssetToToken is used to add a new asset to the token and accepts three arguments:
- tokenId: uint256 type of argument specifying the ID of the token we are adding asset to
- assetId: uint64 type of argument specifying the ID of the asset we are adding to the token
- overwrites: uint64 type of argument specifying the ID of the asset we are overwriting with the desired asset

#### addAssetEntry
The `addAssetEntry` function is used to add a new URI for the new asset of the token and accepts one argument:
- `metadataURI`: string type of argument specifying the metadata URI of a new asset

#### totalAssets
The totalAssets function is used to retrieve a total number of assets defined in the collection.

#### transfer
The transfer function is used to transfer one token from one account to another and accepts two arguments:
- `to`: address type of argument specifying the address of the account to which the token should be transferred to
- `tokenId`: uint256 type of argument specifying the token ID of the token to be transferred

#### nestTransfer
The nestTransfer is used to transfer the NFT to another NFT residing in a specified contract. It can only be called by a direct owner or a parent NFT's smart contract or a caller that was given the allowance. This will nest the given NFT into the specified one. It accepts three arguments:
- `to`: address type of argument specifying the address of the intended parent NFT's smart contract
- `tokenId`: uint256 type of argument specifying the ID of the token we want to send to be nested
- `destinationId`: uint256 type of argument specifying the ID of the intended parent token NFT

#### tokenURI
The tokenURI is used to retrieve the metadata URI of the desired token and accepts one argument:
- `tokenId`: uint256 type of argument representing the token ID of which we are retrieving the URI

#### updateRoyaltyRecipient
The updateRoyaltyRecipient function is used to update the royalty recipient and accepts one argument:
- `newRoyaltyRecipient`: address type of argument specifying the address of the new beneficiary recipient

## Deploy Script

The deploy script for the `SimpleNestableMultiAsset` smart contract resides in the `deployNestableMultiAsset.ts`.
The script uses the `ethers`, `SimpleNestable` and `ContractTransaction` imports. The empty deploy script should look like this:

```
import { ethers } from "hardhat";
import { SimpleNestable } from "../typechain-types";
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
  const pricePerMint = ethers.utils.parseEther("0.0000000001");
  const totalTokens = 5;
  const [owner] = await ethers.getSigners();
```

Now that the constants are ready, we can deploy the smart contract and log the addresses of the contracts to the console:

```
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
```

A custom script added to `package.json` allows us to easily run the script:

```
  "scripts": {
    "deploy-nestable-multi-asset": "hardhat run scripts/deployNestableMultiAsset.ts"
  }
```

Using the script with `npm run deploy-nestable-multi-asset` should return the following output:

```
npm run deploy-nestable-multi-asset

> @rmrk-team/evm-contract-samples@0.1.0 deploy-nestable-multi-asset
> hardhat run scripts/deployNestableMultiAsset.ts

Sample contract deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

---

## Training Data

    Nestable and MultiAsset RMRK legos can be used together to provide more utility to the NFT.

    ## SimpleNestableMultiAsset

    The `SimpleNestableMultiasset` example uses the `RMRKNestableMultiAssetImpl`. It is used by using the import statement below the pragma definition:

    ```
    import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKNestableMultiAssetImpl.sol";
    ```

    Once the `RMRKNestableMultiAsset.sol` is imported into our file, we can set the inheritance of our smart contract:

    ```
    contract SimpleNestableMultiAsset is RMRKNestableMultiAssetImpl {

    }
    ```

    The `RMRKNestableMultiAssetImpl` implements all of the required functionality of the Nested and MultiAsset RMRK legos. It implements minting of parent NFTS as well as child NFTs. Management of NFT assets is also implemented alongside the classic NFT functionality.

    WARNING: The `RMRKNestableMultiAssetImpl` only has minimal access control implemented. If you intend to use it, make sure to define your own, otherwise your smart contracts are at risk of unexpected behaviour.

    The `constructor` in this case accepts no arguments as most of the arguments required to properly initialize RMRKNestableMultiAssetImpl are hardcoded:

    - `RMRKNestableMultiAssetImpl`: represents the name argument and sets the name of the collection
    - `SNMA`: represents the `symbol` argument and sets the symbol of the collection
    - `ipfs://meta`: represents the `collectionMetadata_` argument and sets the URI of the collection metadata
    - `ipfs://tokenMeta`: represents the `tokenURI_` argument and sets the base URI of the token metadata

    The only available variable to pass to the `constructor` is:

    - `data`: struct type of argument providing a number of initialization values, used to avoid initialization transaction being reverted due to passing too many parameters

    NOTE: The InitData struct is used to pass the initialization parameters to the implementation smart contract. This is done so that the execution of the deploy transaction doesn't revert because we are trying to pass too many arguments.
    The InitData struct contains the following fields:

    ```
    [
        erc20TokenAddress,
        tokenUriIsEnumerable,
        royaltyRecipient,
        royaltyPercentageBps, // Expressed in basis points
        maxSupply,
        pricePerMint
    ]
    ```

    NOTE: Basis points are the smallest supported denomination of percent. In our case this is one hundredth of a percent. This means that 1 basis point equals 0.01% and 10000 basis points equal 100%. So for example, if you want to set royalty percentage to 5%, the royaltyPercentageBps value should be 500.

    With the arguments passed upon initialization defined, we can add our constructor:

    ```
        constructor(InitData memory data)
            RMRKNestableMultiAssetImpl(
                "SimpleNestableMultiAsset",
                "SNMA",
                "ipfs://meta",
                "ipfs://tokenMeta",
                data
            )
        {}
    ```

    The full contract thus looks like this:

    ```
    // SPDX-License-Identifier: UNLICENSED
    pragma solidity ^0.8.16;

    import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKNestableMultiAssetImpl.sol";

    contract SimpleNestableMultiAsset is RMRKNestableMultiAssetImpl {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(InitData memory data)
            RMRKNestableMultiAssetImpl(
                "SimpleNestableMultiAsset",
                "SNMA",
                "ipfs://meta",
                "ipfs://tokenMeta",
                data
            )
        {}
    }
    ```

    ## RMRKNestableMultiAssetImpl

    Let's take a moment to examine the core of this implementation, the `RMRKNestableMultiAssetImpl`.

    It uses `RMRKRoyalties`, `RMRKNestableMultiAsset`, `RMRKCollectionMetadata` and `RMRKMintingUtils` smart contracts from RMRK stack.

    Two errors are defined:

    ```
    error RMRKMintUnderpriced();
    error RMRKMintZero();
    ```

    `RMRKMintUnderpriced()` is used when not enough value is used when attempting to mint a token and `RMRKMintZero()` is used when attempting to mint 0 tokens.

    #### mint

    The mint function is used to mint parent NFTs and accepts two arguments:
    - `to`: address type of argument that specifies who should receive the newly minted tokens
    - `numToMint`: uint256 type of argument that specifies how many tokens should be minted

    There are a few constraints to this function:
    - after minting, the total number of tokens should not exceed the maximum allowed supply
    - attempting to mint 0 tokens is not allowed as it makes no sense to pay for the gas without any effect
    - value should accompany transaction equal to a price per mint multiplied by the `numToMint`

    #### nestMint

    The nestMint function is used to mint child NFTs to be owned by the parent NFT and accepts three arguments:
    - `to`: address type of argument specifying the address of the smart contract to which the parent NFT belongs to
    - `numToMint`: uint256 type of argument specifying the amount of tokens to be minted
    - `destinationId`: uint256 type of argument specifying the ID of the parent NFT to which to mint the child NFT

    The constraints of nestMint are similar to the ones set out for mint function.

    #### addAssetToToken

    addAssetToToken is used to add a new asset to the token and accepts three arguments:
    - tokenId: uint256 type of argument specifying the ID of the token we are adding asset to
    - assetId: uint64 type of argument specifying the ID of the asset we are adding to the token
    - overwrites: uint64 type of argument specifying the ID of the asset we are overwriting with the desired asset

    #### addAssetEntry
    The `addAssetEntry` function is used to add a new URI for the new asset of the token and accepts one argument:
    - `metadataURI`: string type of argument specifying the metadata URI of a new asset

    #### totalAssets
    The totalAssets function is used to retrieve a total number of assets defined in the collection.

    #### transfer
    The transfer function is used to transfer one token from one account to another and accepts two arguments:
    - `to`: address type of argument specifying the address of the account to which the token should be transferred to
    - `tokenId`: uint256 type of argument specifying the token ID of the token to be transferred

    #### nestTransfer
    The nestTransfer is used to transfer the NFT to another NFT residing in a specified contract. It can only be called by a direct owner or a parent NFT's smart contract or a caller that was given the allowance. This will nest the given NFT into the specified one. It accepts three arguments:
    - `to`: address type of argument specifying the address of the intended parent NFT's smart contract
    - `tokenId`: uint256 type of argument specifying the ID of the token we want to send to be nested
    - `destinationId`: uint256 type of argument specifying the ID of the intended parent token NFT

    #### tokenURI
    The tokenURI is used to retrieve the metadata URI of the desired token and accepts one argument:
    - `tokenId`: uint256 type of argument representing the token ID of which we are retrieving the URI

    #### updateRoyaltyRecipient
    The updateRoyaltyRecipient function is used to update the royalty recipient and accepts one argument:
    - `newRoyaltyRecipient`: address type of argument specifying the address of the new beneficiary recipient

    ## Deploy Script

    The deploy script for the `SimpleNestableMultiAsset` smart contract resides in the `deployNestableMultiAsset.ts`.
    The script uses the `ethers`, `SimpleNestable` and `ContractTransaction` imports. The empty deploy script should look like this:

    ```
    import { ethers } from "hardhat";
    import { SimpleNestable } from "../typechain-types";
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
      const pricePerMint = ethers.utils.parseEther("0.0000000001");
      const totalTokens = 5;
      const [owner] = await ethers.getSigners();
    ```

    Now that the constants are ready, we can deploy the smart contract and log the addresses of the contracts to the console:

    ```
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
    ```

    A custom script added to `package.json` allows us to easily run the script:

    ```
      "scripts": {
        "deploy-nestable-multi-asset": "hardhat run scripts/deployNestableMultiAsset.ts"
      }
    ```

    Using the script with `npm run deploy-nestable-multi-asset` should return the following output:

    ```
    npm run deploy-nestable-multi-asset

    > @rmrk-team/evm-contract-samples@0.1.0 deploy-nestable-multi-asset
    > hardhat run scripts/deployNestableMultiAsset.ts

    Sample contract deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
    ```