---
sidebar_position: 15
---

# EVM, multi-asset part 1

An asset is a type of output for an NFT, usually a media file.

An asset can be an image, a movie, a PDF file, device config file... A multi-asset NFT is one that can output a different asset based on specific contextual information, e.g. load a PDF if loaded into a PDF reader, vs. loading an image in a virtual gallery, vs. loading hardware configuration in an IoT control hub.

An asset is NOT an NFT or a standalone entity you can reference. It is part of an NFT - one of several outputs it can have.
Every RMRK NFT has zero or more assets. When it has zero assets, the metadata is "root level". Any new asset added to this NFT will override the root metadata, making this NFT revealable.

## SimpleMultiAsset

The SimpleMultiAsset example uses [RMRKMultiAssetImpl](https://github.com/rmrk-team/evm/blob/dev/contracts/implementations/nativeTokenPay/RMRKMultiAssetImpl.sol). It is used by importing it using the import statement below the pragma definition:

```
import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKMultiAssetImpl.sol";
```

Once the RMRKMultiAssetImpl.sol is imported into our file, we can set the inheritance of our smart contract:

```solidity
  contract SimpleMultiAsset is RMRKMultiAssetImpl {

  }
```

We won't be passing all of the required parameters, to intialize RMRKMultiAssetImpl contract, to the constructor, but will hardcode some of the values.

The values that we will pass are:

- `data`: struct type of argument providing a number of initialization values, used to avoid initialization transaction being reverted due to passing too many parameters

The parameters that we will hardcode to the initialization of RMRKMultiAssetImpl are:

- `name`: string type of argument representing the name of the collection will be set to SimpleMultiAsset
- `symbol`: string type od argument representing the symbol of the collection will be set to SMA
- `collectionMetadata_`: string type of argument representing the metadata URI of the collection will be set to ipfs://meta
- `tokenURI_`: string type of argument representing the base metadata URI of tokens will be set to ipfs://tokenMeta

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

Basis points are the smallest supported denomination of percent. In our case this is one hundredth of a percent. This means that 1 basis point equals 0.01% and 10000 basis points equal 100%. So for example, if you want to set royalty percentage to 5%, the royaltyPercentageBps value should be 500.

So the constructor of the SimpleMultiAsset should look like this:

```
    constructor(InitData memory data)
        RMRKMultiAssetImpl(
            "SimpleMultiAsset",
            "SMA",
            "ipfs://meta",
            "ipfs://tokenMeta",
            data
        )
    {}
```

The full code of `SimpleMultiAsset.sol` is therefore:

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKMultiAssetImpl.sol";

contract SimpleMultiAsset is RMRKMultiAssetImpl {
    // NOTE: Additional custom arguments can be added to the constructor based on your needs.
    constructor(
        uint256 maxSupply,
        uint256 pricePerMint
    ) RMRKMultiAssetImpl(
        "SimpleMultiAsset",
        "SMA",
        maxSupply,
        pricePerMint,
        "ipfs://meta",
        "ipfs://tokenMeta",
        msg.sender,
        10
    ) {}
}
```

## RMRKMultiAssetImpl

Let's take a moment to examine the core of this implementation, the `RMRKMultiAssetImpl`.

It uses the `RMRKRoyalties`, `RMRKMultiAsset`, `RMRKCollectionMetadata` and `RMRKMintingUtils` smart contracts from RMRK stack. To dive deeper into their operation, please refer to their respective documentation.

Two errors are defined:

```
error RMRKMintUnderpriced();
error RMRKMintZero();
```

`RMRKMintUnderpriced()` is used when not enough value is used when attempting to mint a token and `RMRKMintZero()` is used when attempting to mint 0 tokens.

The `RMRKMultiAssetImpl` implements all of the required functionality of the `MultiAsset` lego. It implements standard NFT methods like `mint`, `transfer`, `approve`, `burn`,... In addition to these methods it also implements the methods specific to `MultiAsset` RMRK lego:

- addAssetToToken
- addAssetEntry
- totalAssets
- tokenURI
- updateRoyaltyRecipient

WARNING: The `RMRKMultiAssetImpl` only has minimal access control implemented. If you intend to use it, make sure to define your own, otherwise your smart contracts are at risk of unexpected behaviour.

#### mint

The mint function is used to mint parent NFTs and accepts two arguments:
- `to`: address type of argument that specifies who should receive the newly minted tokens
- `numToMint`: uint256 type of argument that specifies how many tokens should be minted

There are a few constraints to this function:

- after minting, the total number of tokens should not exceed the maximum allowed supply
- attempting to mint 0 tokens is not allowed as it makes no sense to pay for the gas without any effect
- value should accompany transaction equal to a price per mint multiplied by the `numToMint`

#### addAssetToToken

The `addAssetToToken` function is used to add a new asset to the token and accepts three arguments:

- `tokenId`: uint256 type of argument specifying the ID of the token we are adding asset to
- `assetId`: uint64 type of argument specifying the ID of the asset we are adding to the token
- `replacesAssetWithId`: uint64 type of argument specifying the ID of the asset we are overwriting with the desired asset
  
#### addAssetEntry

`addAssetEntry` is used to add a new URI for the new asset of the token and accepts one argument:

- `metadataURI`: string type of argument specifying the metadata URI of a new asset

#### totalAssets

`totalAssets` is used to retrieve a total number of assets defined in the collection.

#### tokenURI

`tokenURI` is used to retrieve the metadata URI of the desired token and accepts one argument:

- `tokenId`: uint256 type of argument representing the token ID of which we are retrieving the URI

#### updateRoyaltyRecipient

`updateRoyaltyRecipient` function is used to update the royalty recipient and accepts one argument:

- `newRoyaltyRecipient`: address type of argument specifying the address of the new beneficiary recipient

---

## Training Data

    # EVM, multi-asset part 1

    An asset is a type of output for an NFT, usually a media file.

    An asset can be an image, a movie, a PDF file, device config file... A multi-asset NFT is one that can output a different asset based on specific contextual information, e.g. load a PDF if loaded into a PDF reader, vs. loading an image in a virtual gallery, vs. loading hardware configuration in an IoT control hub.

    An asset is NOT an NFT or a standalone entity you can reference. It is part of an NFT - one of several outputs it can have.
    Every RMRK NFT has zero or more assets. When it has zero assets, the metadata is "root level". Any new asset added to this NFT will override the root metadata, making this NFT revealable.

    ## SimpleMultiAsset

    The SimpleMultiAsset example uses [RMRKMultiAssetImpl](https://github.com/rmrk-team/evm/blob/dev/contracts/implementations/nativeTokenPay/RMRKMultiAssetImpl.sol). It is used by importing it using the import statement below the pragma definition:

    ```
    import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKMultiAssetImpl.sol";
    ```

    Once the RMRKMultiAssetImpl.sol is imported into our file, we can set the inheritance of our smart contract:

    ```solidity
    contract SimpleMultiAsset is RMRKMultiAssetImpl {

    }
    ```

    We won't be passing all of the required parameters, to intialize RMRKMultiAssetImpl contract, to the constructor, but will hardcode some of the values.

    The values that we will pass are:

    - `data`: struct type of argument providing a number of initialization values, used to avoid initialization transaction being reverted due to passing too many parameters

    The parameters that we will hardcode to the initialization of RMRKMultiAssetImpl are:

    - `name`: string type of argument representing the name of the collection will be set to SimpleMultiAsset
    - `symbol`: string type od argument representing the symbol of the collection will be set to SMA
    - `collectionMetadata_`: string type of argument representing the metadata URI of the collection will be set to ipfs://meta
    - `tokenURI_`: string type of argument representing the base metadata URI of tokens will be set to ipfs://tokenMeta

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

    Basis points are the smallest supported denomination of percent. In our case this is one hundredth of a percent. This means that 1 basis point equals 0.01% and 10000 basis points equal 100%. So for example, if you want to set royalty percentage to 5%, the royaltyPercentageBps value should be 500.

    So the constructor of the SimpleMultiAsset should look like this:

    ```
        constructor(InitData memory data)
            RMRKMultiAssetImpl(
                "SimpleMultiAsset",
                "SMA",
                "ipfs://meta",
                "ipfs://tokenMeta",
                data
            )
        {}
    ```

    The full code of `SimpleMultiAsset.sol` is therefore:

    ```
    // SPDX-License-Identifier: UNLICENSED
    pragma solidity ^0.8.16;

    import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKMultiAssetImpl.sol";

    contract SimpleMultiAsset is RMRKMultiAssetImpl {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            uint256 maxSupply,
            uint256 pricePerMint
        ) RMRKMultiAssetImpl(
            "SimpleMultiAsset",
            "SMA",
            maxSupply,
            pricePerMint,
            "ipfs://meta",
            "ipfs://tokenMeta",
            msg.sender,
            10
        ) {}
    }
    ```

    ## RMRKMultiAssetImpl

    Let's take a moment to examine the core of this implementation, the `RMRKMultiAssetImpl`.

    It uses the `RMRKRoyalties`, `RMRKMultiAsset`, `RMRKCollectionMetadata` and `RMRKMintingUtils` smart contracts from RMRK stack. To dive deeper into their operation, please refer to their respective documentation.

    Two errors are defined:

    ```
    error RMRKMintUnderpriced();
    error RMRKMintZero();
    ```

    `RMRKMintUnderpriced()` is used when not enough value is used when attempting to mint a token and `RMRKMintZero()` is used when attempting to mint 0 tokens.

    The `RMRKMultiAssetImpl` implements all of the required functionality of the `MultiAsset` lego. It implements standard NFT methods like `mint`, `transfer`, `approve`, `burn`,... In addition to these methods it also implements the methods specific to `MultiAsset` RMRK lego:

    - addAssetToToken
    - addAssetEntry
    - totalAssets
    - tokenURI
    - updateRoyaltyRecipient

    WARNING: The `RMRKMultiAssetImpl` only has minimal access control implemented. If you intend to use it, make sure to define your own, otherwise your smart contracts are at risk of unexpected behaviour.

    #### mint

    The mint function is used to mint parent NFTs and accepts two arguments:
    - `to`: address type of argument that specifies who should receive the newly minted tokens
    - `numToMint`: uint256 type of argument that specifies how many tokens should be minted

    There are a few constraints to this function:

    - after minting, the total number of tokens should not exceed the maximum allowed supply
    - attempting to mint 0 tokens is not allowed as it makes no sense to pay for the gas without any effect
    - value should accompany transaction equal to a price per mint multiplied by the `numToMint`

    #### addAssetToToken

    The `addAssetToToken` function is used to add a new asset to the token and accepts three arguments:

    - `tokenId`: uint256 type of argument specifying the ID of the token we are adding asset to
    - `assetId`: uint64 type of argument specifying the ID of the asset we are adding to the token
    - `replacesAssetWithId`: uint64 type of argument specifying the ID of the asset we are overwriting with the desired asset
    
    #### addAssetEntry

    `addAssetEntry` is used to add a new URI for the new asset of the token and accepts one argument:

    - `metadataURI`: string type of argument specifying the metadata URI of a new asset

    #### totalAssets

    `totalAssets` is used to retrieve a total number of assets defined in the collection.

    #### tokenURI

    `tokenURI` is used to retrieve the metadata URI of the desired token and accepts one argument:

    - `tokenId`: uint256 type of argument representing the token ID of which we are retrieving the URI

    #### updateRoyaltyRecipient

    `updateRoyaltyRecipient` function is used to update the royalty recipient and accepts one argument:

    - `newRoyaltyRecipient`: address type of argument specifying the address of the new beneficiary recipient
