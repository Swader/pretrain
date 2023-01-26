---
sidebar_position: 20
---

# EVM, merged equippable p1

The `MergedEquippable` composite of RMRK legos uses both the `Nestable` and `MultiAsset` RMRK legos as well as the Equippable lego. In addition to these three RMRK legos, it also requires the Catalog RMRK lego. Let's first examine the Catalog RMRK lego and then the Equippable one.

## Catalog

A Catalog can be considered a catalogue of parts from which an NFT can be composed. Parts can be either of the slot type or fixed type. Slots are intended for equippables.

NOTE: Catalogs are used through assets. Assets can cherry pick from the list of parts within the catalog, they can also define the slots they are allowed to receive.

Catalogs can be of different media types.

The catalog's type indicates what the final output of an NFT will be when this asset is being rendered. Supported types are PNG, SVG, audio, video, even mixed.

### Equippable

Equippables are NFTs that can be equipped in the before mentioned slots. They have a set format and predefined space in the parent NFT.

Assets that can be equipped into a slot each have a reference ID. The reference ID can be used to specify which parent NFT the group of assets belonging to a specific reference ID can be equipped to. Additionally slots can specify which collection can be used within it or to allow any collection to be equipped into it.

Each slot of the NFT can have a predefined collection of allowed NFT collections to be equipped to this slot.

In this tutorial we will examine the MergedEquippable composite of RMRK blocks:

- SimpleEquippable and SimpleCatalog work together to showcase the minimal implementation of the MergedEquippable RMRK lego composite.
- AdvancedEquippable and AdvancedCatalog work together to showcase a more customizable implementation of the MergedEquippable RMRK lego composite.

## Simple MergedEquippable

The simple MergedEquippable consists of two smart contracts. Let's first examine the SimpleCatalog smart contract and then move on to the SimpleEquippable.

### SimpleCatalog

NOTE: As the SimpleCatalog smart contract is used by both MergedEquippable as well as SplitEquippable it resides in the root contracts/ directory.

The SimpleCatalog example uses the [RMRKCatalogImpl](https://github.com/rmrk-team/evm/blob/dev/contracts/implementations/RMRKCatalogImpl.sol). It is used by importing it using the import statement below the pragma definition:

```
import "@rmrk-team/evm-contracts/contracts/implementations/RMRKCatalogImpl.sol";
```

Once the RMRKCatalogImpl.sol is imported into out file, we can set the inheritance of our smart contract:

```
contract SimpleCatalog is RMRKCatalogImpl {

}
```

The RMRKCatalogImpl implements all of the required functionality of the Catalog RMRK lego. It implements adding of parts and equippable addresses as well as managing the equippables.

WARNING: The RMRKCatalogImpl only has minimal access control implemented. If you intend to use it, make sure to define your own, otherwise your smart contracts are at risk of unexpected behaviour.

The constructor to initialize the RMRKCatalogImpl accepts the following arguments:

- `symbol_`: string type of argument representing the symbol of the catalog lego
- `type_`: string type of argument representing the type of the catalog lego

In order to properly initialize the inherited smart contract, our smart contract needs to accept the arguments, mentioned above, in the constructor and pass them to RMRKCatalogImpl:

```
    constructor(
        string memory symbol,
        string memory type_
    ) RMRKCatalogImpl(symbol, type_) {}
```

Thus, the total code is:

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "@rmrk-team/evm-contracts/contracts/implementations/RMRKCatalogImpl.sol";

contract SimpleCatalog is RMRKCatalogImpl {
    // NOTE: Additional custom arguments can be added to the constructor based on your needs.
    constructor(
        string memory symbol,
        string memory type_
    ) RMRKCatalogImpl(symbol, type_) {}
}
```

### RMRKCatalogImpl

Let's take a moment to examine the core of this implementation, the `RMRKCatalogImpl`.

It uses the `RMRKCatalog` and `OwnableLock` smart contracts from RMRK stack. To dive deeper into their operation, please refer to their respective documentation.

The following functions are available:

#### addPart

The `addPart` function is used to add a single catalog item entry and accept one argument:

- intakeStruct: struct type of argument used to pass the values of the part of the catalog item entry to be added. It consists of:
  - partId: uint64 type of argument specifying the ID of the entry we want to add
  - part: struct type of argument defining the RMRK catalog item. It consists of:
    - itemType: enum type of argument defining the type of the item. The possible values are:
      - None
      - Slot
      - Fixed
    - z: uint8 type of argument specifying the layer the visual should appear in on the SVG base
    - equippable: address[] type of argument specifying the addresses of the collections that can equip this part
    - metadataURI: string type of argument specifying the metadata URI of the part

The `intakeStruct` should look something like this:

```
[
    partID,
    [
        itemType,
        z,
        [
            permittedCollectionAddress0,
            permittedCollectionAddress1,
            permittedCollectionAddress2
        ],
        metadataURI
    ]
]
```

#### addPartList

The `addPartList` function is used to add a batch of catalog item entries and accepts an array of `IntakeStructs` described above. So an example of two IntakeStructs that would be passed to the function is:

```
[
    [
        partID0,
        [
            itemType,
            z,
            [
                permittedCollectionAddress0,
                permittedCollectionAddress1,
                permittedCollectionAddress2
            ],
            metadataURI
        ]
    ],
    [
        partID1,
        [
            itemType,
            z,
            [
                permittedCollectionAddress0,
                permittedCollectionAddress1,
                permittedCollectionAddress2
            ],
            metadataURI
        ]
    ]
]
```

#### addEquippableAddresses

The `addEquippableAddresses` function is used to add a number of equippable addresses to a single catalog entry. These define the collections that are allowed to be equipped in place of the catalog entry. It accepts two arguments:

- `partId`: uint64 type of argument specifying the ID of the part that we are adding the equippable addresses to. Only parts of slot type are valid.
- `equippableAddresses`: address[] type of argument specifying the array of addresses of the collections that may equip this part

#### setEquippableAddresses

The `setEquippableAddreses` function is used to update the equippable addresses of a single catalog entry. Using it overwrites the currently set equippable addresses. It accepts two arguments:

- `partId`: uint64 type of argument specifying the ID of the part that we are setting the equippable addresses for. Only parts of slot type are valid.
- `equippableAddresses`: address[] type of argument specifying the array of addresses of the collections that may equip this part

#### setEquippableToAll

The `setEquippableToAll` function is used to set the desired entry as equippable to any collection and accepts one argument:
- `partId`: uint64 type of argument specifying which catalog entry we want to set as being equippable to any collection

#### resetEquippableAddresses

The `resetEquippableAddresses` function is used to remove all of the entries allowing for the entry to be equipped and accepts one argument:
- `partId`: uint64 type of argument specifying which part we want to remove the equippable addresses from. Only parts of slot type are valid.

## SimpleEquippable

The SimpleEquippable example uses the [RMRKEquippableImpl](https://github.com/rmrk-team/evm/blob/dev/contracts/implementations/nativeTokenPay/RMRKEquippableImpl.sol). It is used by importing it using the import statement below the pragma definition:

```
import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKEquippableImpl.sol";
```

The [RMRKEquipRenderUtils](https://github.com/rmrk-team/evm/blob/dev/contracts/RMRK/utils/RMRKEquipRenderUtils.sol) is imported in the same manner, but only so that we can use it within the user journey script:

```
import "@rmrk-team/evm-contracts/contracts/RMRK/utils/RMRKEquipRenderUtils.sol";
```

Once both are imported, we can set the inheritance of our smart contract for the `RMRKEquippableImpl.sol`:

```
contract SimpleEquippable is RMRKEquippableImpl {

}
```

The `RMRKEquippableImpl` implements all of the required functionality of the MergedEquippable RMRK lego composite. It implements minting, burning and asset management.

WARNING: The RMRKEquippableImpl only has minimal access control implemented. If you intend to use it, make sure to define your own, otherwise your smart contracts are at risk of unexpected behaviour.

The constructor to initialize the `RMRKEquippableImpl` accepts the following arguments:

- `name`: string type of argument specifying the name of the collection
- `symbol`: string type of argument specifying the symbol of the collection
- `collectionMetadata`: string type of argument specifying the metadata URI of the whole collection
- `tokenURI`: string type of argument specifying the base URI of the token metadata
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

NOTE: Basis points are the smallest supported denomination of percent. In our case this is one hundredth of a percent. This means that 1 basis point equals 0.01% and 10000 basis points equal 100%. So for example, if you want to set royalty percentage to 5%, the `royaltyPercentageBps` value should be 500.

In order to properly initiate the inherited smart contract, our smart contract needs to accept the arguments, mentioned above, in the constructor and pass them to the RMRKEquippableImpl:

```
    constructor(
        string memory name,
        string memory symbol,
        string memory collectionMetadata,
        string memory tokenURI,
        InitData memory data
    )
        RMRKEquippableImpl(
            name,
            symbol,
            collectionMetadata,
            tokenURI,
            data
        )
    {}
```

Thus, the total code is:

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKEquippableImpl.sol";
import "@rmrk-team/evm-contracts/contracts/RMRK/utils/RMRKEquipRenderUtils.sol";

contract SimpleEquippable is RMRKEquippableImpl {
    // NOTE: Additional custom arguments can be added to the constructor based on your needs.
    constructor(
        string memory name,
        string memory symbol,
        string memory collectionMetadata,
        string memory tokenURI,
        InitData memory data
    )
        RMRKEquippableImpl(
            name,
            symbol,
            collectionMetadata,
            tokenURI,
            data
        )
    {}
}
```

### RMRKEquippableImpl

Let's take a moment to examine the core of this implementation, the RMRKEquippableImpl.

It uses the `RMRKEquippable`, `RMRKRoyalties`, `RMRKCollectionMetadata` and `RMRKMintingUtils` smart contracts from RMRK stack. to dive deeper into their operation, please refer to their respective documentation.

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
- value should accompany transaction equal to a price per mint multiplied by the numToMint
- function can only be called while the sale is still open

#### nestMint
The nestMint function is used to mint child NFTs to be owned by the parent NFT and accepts three arguments:
- `to`: address type of argument specifying the address of the smart contract to which the parent NFT belongs to
- `numToMint`: uint256 type of argument specifying the amount of tokens to be minted
- `destinationId`: uint256 type of argument specifying the ID of the parent NFT to which to mint the child NFT
The constraints of nestMint are similar to the ones set out for mint function.

#### addAssetToToken
The addAssetToToken is used to add a new asset to the token and accepts three arguments:
- `tokenId`: uint256 type of argument specifying the ID of the token we are adding asset to
- `assetId`: uint64 type of argument specifying the ID of the asset we are adding to the token
- `replacesAssetWithId`: uint64 type of argument specifying the ID of the asset we are overwriting with the desired asset

#### addEquippableAssetEntry
The addEquippableAssetEntry is used to add a new asset of the collection and accepts three arguments:
- `equippableGroupId`: uint64 type of argument specifying the ID of the group this asset belongs to. This ID can then be referenced in the setValidParentRefId in order to allow every asset with this equippable reference ID to be equipped into an NFT
- `catalogAddress`: address type of argument specifying the address of the Catalog smart contract
- `metadataURI`: string type of argument specifying the URI of the asset
- `partIds`: uint64[] type of argument specifying the fixed and slot parts IDs for this asset

#### setValidParentForEquippableGroup
The setValidParentForEquippableGroup is used to declare which group of assets are equippable into the parent address at the given slot and accepts three arguments:
- `equippableGroupId`: uint64 type of argument specifying the group of assets that can be equipped
- `parentAddress`: address type of argument specifying the address into which the asset is equippable
- `partId`: uint64 type of argument specifying the ID of the part it can be equipped to

#### totalAssets
The totalAssets is used to retrieve a total number of assets defined in the collection.

#### updateRoyaltyRecipient
The updateRoyaltyRecipient function is used to update the royalty recipient and accepts one argument:
- `newRoyaltyRecipient`: address type of argument specifying the address of the new beneficiary recipient

---

## Training Data

    The `MergedEquippable` composite of RMRK legos uses both the `Nestable` and `MultiAsset` RMRK legos as well as the Equippable lego. In addition to these three RMRK legos, it also requires the Catalog RMRK lego. Let's first examine the Catalog RMRK lego and then the Equippable one.

    ## Catalog

    A Catalog can be considered a catalogue of parts from which an NFT can be composed. Parts can be either of the slot type or fixed type. Slots are intended for equippables.

    NOTE: Catalogs are used through assets. Assets can cherry pick from the list of parts within the catalog, they can also define the slots they are allowed to receive.

    Catalogs can be of different media types.

    The catalog's type indicates what the final output of an NFT will be when this asset is being rendered. Supported types are PNG, SVG, audio, video, even mixed.

    ### Equippable

    Equippables are NFTs that can be equipped in the before mentioned slots. They have a set format and predefined space in the parent NFT.

    Assets that can be equipped into a slot each have a reference ID. The reference ID can be used to specify which parent NFT the group of assets belonging to a specific reference ID can be equipped to. Additionally slots can specify which collection can be used within it or to allow any collection to be equipped into it.

    Each slot of the NFT can have a predefined collection of allowed NFT collections to be equipped to this slot.

    In this tutorial we will examine the MergedEquippable composite of RMRK blocks:

    - SimpleEquippable and SimpleCatalog work together to showcase the minimal implementation of the MergedEquippable RMRK lego composite.
    - AdvancedEquippable and AdvancedCatalog work together to showcase a more customizable implementation of the MergedEquippable RMRK lego composite.

    ## Simple MergedEquippable

    The simple MergedEquippable consists of two smart contracts. Let's first examine the SimpleCatalog smart contract and then move on to the SimpleEquippable.

    ### SimpleCatalog

    NOTE: As the SimpleCatalog smart contract is used by both MergedEquippable as well as SplitEquippable it resides in the root contracts/ directory.

    The SimpleCatalog example uses the [RMRKCatalogImpl](https://github.com/rmrk-team/evm/blob/dev/contracts/implementations/RMRKCatalogImpl.sol). It is used by importing it using the import statement below the pragma definition:

    ```
    import "@rmrk-team/evm-contracts/contracts/implementations/RMRKCatalogImpl.sol";
    ```

    Once the RMRKCatalogImpl.sol is imported into out file, we can set the inheritance of our smart contract:

    ```
    contract SimpleCatalog is RMRKCatalogImpl {

    }
    ```

    The RMRKCatalogImpl implements all of the required functionality of the Catalog RMRK lego. It implements adding of parts and equippable addresses as well as managing the equippables.

    WARNING: The RMRKCatalogImpl only has minimal access control implemented. If you intend to use it, make sure to define your own, otherwise your smart contracts are at risk of unexpected behaviour.

    The constructor to initialize the RMRKCatalogImpl accepts the following arguments:

    - `symbol_`: string type of argument representing the symbol of the catalog lego
    - `type_`: string type of argument representing the type of the catalog lego

    In order to properly initialize the inherited smart contract, our smart contract needs to accept the arguments, mentioned above, in the constructor and pass them to RMRKCatalogImpl:

    ```
        constructor(
            string memory symbol,
            string memory type_
        ) RMRKCatalogImpl(symbol, type_) {}
    ```

    Thus, the total code is:

    ```
    // SPDX-License-Identifier: UNLICENSED
    pragma solidity ^0.8.16;

    import "@rmrk-team/evm-contracts/contracts/implementations/RMRKCatalogImpl.sol";

    contract SimpleCatalog is RMRKCatalogImpl {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            string memory symbol,
            string memory type_
        ) RMRKCatalogImpl(symbol, type_) {}
    }
    ```

    ### RMRKCatalogImpl

    Let's take a moment to examine the core of this implementation, the `RMRKCatalogImpl`.

    It uses the `RMRKCatalog` and `OwnableLock` smart contracts from RMRK stack. To dive deeper into their operation, please refer to their respective documentation.

    The following functions are available:

    #### addPart

    The `addPart` function is used to add a single catalog item entry and accept one argument:

    - intakeStruct: struct type of argument used to pass the values of the part of the catalog item entry to be added. It consists of:
      - partId: uint64 type of argument specifying the ID of the entry we want to add
      - part: struct type of argument defining the RMRK catalog item. It consists of:
        - itemType: enum type of argument defining the type of the item. The possible values are:
          - None
          - Slot
          - Fixed
        - z: uint8 type of argument specifying the layer the visual should appear in on the SVG base
        - equippable: address[] type of argument specifying the addresses of the collections that can equip this part
        - metadataURI: string type of argument specifying the metadata URI of the part

    The `intakeStruct` should look something like this:

    ```
    [
        partID,
        [
            itemType,
            z,
            [
                permittedCollectionAddress0,
                permittedCollectionAddress1,
                permittedCollectionAddress2
            ],
            metadataURI
        ]
    ]
    ```

    #### addPartList

    The `addPartList` function is used to add a batch of catalog item entries and accepts an array of `IntakeStructs` described above. So an example of two IntakeStructs that would be passed to the function is:

    ```
    [
        [
            partID0,
            [
                itemType,
                z,
                [
                    permittedCollectionAddress0,
                    permittedCollectionAddress1,
                    permittedCollectionAddress2
                ],
                metadataURI
            ]
        ],
        [
            partID1,
            [
                itemType,
                z,
                [
                    permittedCollectionAddress0,
                    permittedCollectionAddress1,
                    permittedCollectionAddress2
                ],
                metadataURI
            ]
        ]
    ]
    ```

    #### addEquippableAddresses

    The `addEquippableAddresses` function is used to add a number of equippable addresses to a single catalog entry. These define the collections that are allowed to be equipped in place of the catalog entry. It accepts two arguments:

    - `partId`: uint64 type of argument specifying the ID of the part that we are adding the equippable addresses to. Only parts of slot type are valid.
    - `equippableAddresses`: address[] type of argument specifying the array of addresses of the collections that may equip this part

    #### setEquippableAddresses

    The `setEquippableAddreses` function is used to update the equippable addresses of a single catalog entry. Using it overwrites the currently set equippable addresses. It accepts two arguments:

    - `partId`: uint64 type of argument specifying the ID of the part that we are setting the equippable addresses for. Only parts of slot type are valid.
    - `equippableAddresses`: address[] type of argument specifying the array of addresses of the collections that may equip this part

    #### setEquippableToAll

    The `setEquippableToAll` function is used to set the desired entry as equippable to any collection and accepts one argument:
    - `partId`: uint64 type of argument specifying which catalog entry we want to set as being equippable to any collection

    #### resetEquippableAddresses

    The `resetEquippableAddresses` function is used to remove all of the entries allowing for the entry to be equipped and accepts one argument:
    - `partId`: uint64 type of argument specifying which part we want to remove the equippable addresses from. Only parts of slot type are valid.

    ## SimpleEquippable

    The SimpleEquippable example uses the [RMRKEquippableImpl](https://github.com/rmrk-team/evm/blob/dev/contracts/implementations/nativeTokenPay/RMRKEquippableImpl.sol). It is used by importing it using the import statement below the pragma definition:

    ```
    import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKEquippableImpl.sol";
    ```

    The [RMRKEquipRenderUtils](https://github.com/rmrk-team/evm/blob/dev/contracts/RMRK/utils/RMRKEquipRenderUtils.sol) is imported in the same manner, but only so that we can use it within the user journey script:

    ```
    import "@rmrk-team/evm-contracts/contracts/RMRK/utils/RMRKEquipRenderUtils.sol";
    ```

    Once both are imported, we can set the inheritance of our smart contract for the `RMRKEquippableImpl.sol`:

    ```
    contract SimpleEquippable is RMRKEquippableImpl {

    }
    ```

    The `RMRKEquippableImpl` implements all of the required functionality of the MergedEquippable RMRK lego composite. It implements minting, burning and asset management.

    WARNING: The RMRKEquippableImpl only has minimal access control implemented. If you intend to use it, make sure to define your own, otherwise your smart contracts are at risk of unexpected behaviour.

    The constructor to initialize the `RMRKEquippableImpl` accepts the following arguments:

    - `name`: string type of argument specifying the name of the collection
    - `symbol`: string type of argument specifying the symbol of the collection
    - `collectionMetadata`: string type of argument specifying the metadata URI of the whole collection
    - `tokenURI`: string type of argument specifying the base URI of the token metadata
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

    NOTE: Basis points are the smallest supported denomination of percent. In our case this is one hundredth of a percent. This means that 1 basis point equals 0.01% and 10000 basis points equal 100%. So for example, if you want to set royalty percentage to 5%, the `royaltyPercentageBps` value should be 500.

    In order to properly initiate the inherited smart contract, our smart contract needs to accept the arguments, mentioned above, in the constructor and pass them to the RMRKEquippableImpl:

    ```
        constructor(
            string memory name,
            string memory symbol,
            string memory collectionMetadata,
            string memory tokenURI,
            InitData memory data
        )
            RMRKEquippableImpl(
                name,
                symbol,
                collectionMetadata,
                tokenURI,
                data
            )
        {}
    ```

    Thus, the total code is:

    ```
    // SPDX-License-Identifier: UNLICENSED
    pragma solidity ^0.8.16;

    import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKEquippableImpl.sol";
    import "@rmrk-team/evm-contracts/contracts/RMRK/utils/RMRKEquipRenderUtils.sol";

    contract SimpleEquippable is RMRKEquippableImpl {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            string memory name,
            string memory symbol,
            string memory collectionMetadata,
            string memory tokenURI,
            InitData memory data
        )
            RMRKEquippableImpl(
                name,
                symbol,
                collectionMetadata,
                tokenURI,
                data
            )
        {}
    }
    ```

    ### RMRKEquippableImpl

    Let's take a moment to examine the core of this implementation, the RMRKEquippableImpl.

    It uses the `RMRKEquippable`, `RMRKRoyalties`, `RMRKCollectionMetadata` and `RMRKMintingUtils` smart contracts from RMRK stack. to dive deeper into their operation, please refer to their respective documentation.

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
    - value should accompany transaction equal to a price per mint multiplied by the numToMint
    - function can only be called while the sale is still open

    #### nestMint
    The nestMint function is used to mint child NFTs to be owned by the parent NFT and accepts three arguments:
    - `to`: address type of argument specifying the address of the smart contract to which the parent NFT belongs to
    - `numToMint`: uint256 type of argument specifying the amount of tokens to be minted
    - `destinationId`: uint256 type of argument specifying the ID of the parent NFT to which to mint the child NFT
    The constraints of nestMint are similar to the ones set out for mint function.

    #### addAssetToToken
    The addAssetToToken is used to add a new asset to the token and accepts three arguments:
    - `tokenId`: uint256 type of argument specifying the ID of the token we are adding asset to
    - `assetId`: uint64 type of argument specifying the ID of the asset we are adding to the token
    - `replacesAssetWithId`: uint64 type of argument specifying the ID of the asset we are overwriting with the desired asset

    #### addEquippableAssetEntry
    The addEquippableAssetEntry is used to add a new asset of the collection and accepts three arguments:
    - `equippableGroupId`: uint64 type of argument specifying the ID of the group this asset belongs to. This ID can then be referenced in the setValidParentRefId in order to allow every asset with this equippable reference ID to be equipped into an NFT
    - `catalogAddress`: address type of argument specifying the address of the Catalog smart contract
    - `metadataURI`: string type of argument specifying the URI of the asset
    - `partIds`: uint64[] type of argument specifying the fixed and slot parts IDs for this asset

    #### setValidParentForEquippableGroup
    The setValidParentForEquippableGroup is used to declare which group of assets are equippable into the parent address at the given slot and accepts three arguments:
    - `equippableGroupId`: uint64 type of argument specifying the group of assets that can be equipped
    - `parentAddress`: address type of argument specifying the address into which the asset is equippable
    - `partId`: uint64 type of argument specifying the ID of the part it can be equipped to

    #### totalAssets
    The totalAssets is used to retrieve a total number of assets defined in the collection.

    #### updateRoyaltyRecipient
    The updateRoyaltyRecipient function is used to update the royalty recipient and accepts one argument:
    - `newRoyaltyRecipient`: address type of argument specifying the address of the new beneficiary recipient