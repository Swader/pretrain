---
sidebar_position: 17
---

# EVM, nestable part 1

The concept of nested NFTs refers to NFTs being able to own other NFTs.

At its core, the principle is simple: the owner of an NFT does not have to be an externally owned account or a smart contract, it can also be a specific NFT.

The process of sending an NFT into another is functionally identical to sending it to another user. The process of sending an NFT out of another NFT involves issuing a transaction from the address which owns the parent.

Some NFTs can be configured with special conditions for parent-child relationships. For example:

- some parent NFTs will allow the owner of a child NFT to withdraw that child at any time (e.g. virtual land containing an avatar)
- some parent NFTs will be prohibited from executing certain interactions on a child (e.g. the owner of a house in which someone else's avatar is a guest should not be able to BURN the guest... probably)
- some parent NFTs will have special withdrawal conditions, like a music NFT that accepts music stems. The stems can be removed by their owners until a certain number of co-composers upvote a stem enough, or until the owner of the parent music track seals and "publishes" it

NOTE: To dig deeper into the Nestable RMRK lego, you can also refer to the [EIP-6059](https://eips.ethereum.org/EIPS/eip-6059) that we published.

## SimpleNestable

The SimpleNestable example uses the [`RMRKNestableImpl`](https://github.com/rmrk-team/evm/blob/dev/contracts/implementations/nativeTokenPay/RMRKNestableImpl.sol). It is used by importing it using the import statement below the pragma definition:

```
import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKNestableImpl.sol";
```

Once the `RMRKNestableImpl.sol` is imported into our file, we can set the inheritance of our smart contract:

```
contract SimpleNestable is RMRKNestableImpl {

}
```

The `RMRKNestableImpl` implements all of the required functionality of the Nested RMRK lego. It implements minting of parent NFTs as well as child NFTs. Transferring and burning the NFTs is also implemented.

WARNING: The `RMRKNestableImpl` only has minimal access control implemented. If you intend to use it, make sure to define your own, otherwise your smart contracts are at risk of unexpected behaviour.

The constructor to initialize the RMRKNestableImpl accepts the following arguments:

- `name_`: string argument that should represent the name of the NFT collection
- `symbol_`: string argument that should represent the symbol of the NFT collection
- `collectionMetadata_`: string argument that defines the metadata URI of the whole collection
- `tokenURI_`: string argument that defines the base URI of the token metadata
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

In order to properly initiate the inherited smart contract, our smart contract needs to accept the arguments, mentioned above, in the constructor and pass them to `RMRKNestableImpl`:

```
    constructor(
        string memory name,
        string memory symbol,
        string memory collectionMetadata,
        string memory tokenURI,
        InitData memory data
    )
        RMRKNestableImpl(
            name,
            symbol,
            collectionMetadata,
            tokenURI,
            data
        )
    {}
```

The full code is therefore:

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKNestableImpl.sol";

contract SimpleNestable is RMRKNestableImpl {
    // NOTE: Additional custom arguments can be added to the constructor based on your needs.
    constructor(
        string memory name,
        string memory symbol,
        string memory collectionMetadata,
        string memory tokenURI,
        InitData memory data
    )
        RMRKNestableImpl(
            name,
            symbol,
            collectionMetadata,
            tokenURI,
            data
        )
    {}
}
```

## RMRKNestableImpl

Let's take a moment to examine the core of this implementation, the `RMRKNestableImpl`.

It uses the `RMRKRoyalties`, `RMRKNestable`, `RMRKCollectionMetadata` and `RMRKMintingUtils` smart contracts from RMRK stack. To dive deeper into their operation, please refer to their respective documentation.

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

#### nestMint

The nestMint function is used to mint child NFTs to be owned by the parent NFT and accepts three arguments:

- `to`: address type of argument specifying the address of the smart contract to which the parent NFT belongs to
- `numToMint`: uint256 type of argument specifying the amount of tokens to be minted
- `destinationId`: uint256 type of argument specifying the ID of the parent NFT to which to mint the child NFT

The constraints of nestMint are similar to the ones set out for mint function.

#### transfer

Can only be called by a direct owner or a parent NFT's smart contract or a caller that was given the allowance and is used to transfer the NFT to the specified address.

#### nestTransfer

Can only be called by a direct owner or a parent NFT's smart contract or a caller that was given the allowance and is used to transfer the NFT to another NFT residing in a specified contract. This will nest the given NFT into the specified one.

#### tokenURI

The tokenURI function is used to get the metadata URI of the given token and accepts one argument:

- uint256 type of argument specifying the ID of the token

#### updateRoyaltyRecipient

The updateRoyaltyRecipient function is used to update the royalty recipient and accepts one argument:

- newRoyaltyRecipient: address type of argument specifying the address of the new beneficiary recipient

## Deploy Script

The deploy script for the `SimpleNestable` smart contract resides in the `deployNestable.ts`.
The script uses `ethers`, `SimpleNestable` and `ContractTransaction` imports. The empty deploy script should look like this:

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
  const pricePerMint = ethers.utils.parseEther("0.0001");
  const totalTokens = 5;
  const [owner] = await ethers.getSigners();
```

Now that the constants are ready, we can deploy the smart contracts and log the addresses of the contracts to the console:

```
  const contractFactory = await ethers.getContractFactory("SimpleNestable");
  const parent: SimpleNestable = await contractFactory.deploy(
    "Kanaria",
    "KAN",
    "ipfs://collectionMeta",
    "ipfs://tokenMeta",
    {
      erc20TokenAddress: ethers.constants.AddressZero,
      tokenUriIsEnumerable: true,
      royaltyRecipient: await owner.getAddress(),
      royaltyPercentageBps: 10,
      maxSupply: 1000,
      pricePerMint: pricePerMint
    }
  );
  const child: SimpleNestable = await contractFactory.deploy(
    "Chunky",
    "CHN",
    "ipfs://collectionMeta",
    "ipfs://tokenMeta",
    {
      erc20TokenAddress: ethers.constants.AddressZero,
      tokenUriIsEnumerable: true,
      royaltyRecipient: await owner.getAddress(),
      royaltyPercentageBps: 10,
      maxSupply: 1000,
      pricePerMint: pricePerMint
    }
  );


  await parent.deployed();
  await child.deployed();
  console.log(
    `Sample contracts deployed to ${parent.address} and ${child.address}`
  );
```

A custom script added to package.json allows us to easily run the script:

```
  "scripts": {
    "deploy-nestable": "hardhat run scripts/deployNestable.ts"
  }
```

Using the script with `npm run deploy-nestable` should return the following output:

```
npm run deploy-nestable

> @rmrk-team/evm-contract-samples@0.1.0 deploy-nestable
> hardhat run scripts/deployNestable.ts

Compiled 47 Solidity files successfully
Sample contracts deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3 and 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

---

## Training Data

    The concept of nested NFTs refers to NFTs being able to own other NFTs.

    At its core, the principle is simple: the owner of an NFT does not have to be an externally owned account or a smart contract, it can also be a specific NFT.

    The process of sending an NFT into another is functionally identical to sending it to another user. The process of sending an NFT out of another NFT involves issuing a transaction from the address which owns the parent.

    Some NFTs can be configured with special conditions for parent-child relationships. For example:

    - some parent NFTs will allow the owner of a child NFT to withdraw that child at any time (e.g. virtual land containing an avatar)
    - some parent NFTs will be prohibited from executing certain interactions on a child (e.g. the owner of a house in which someone else's avatar is a guest should not be able to BURN the guest... probably)
    - some parent NFTs will have special withdrawal conditions, like a music NFT that accepts music stems. The stems can be removed by their owners until a certain number of co-composers upvote a stem enough, or until the owner of the parent music track seals and "publishes" it

    NOTE: To dig deeper into the Nestable RMRK lego, you can also refer to the [EIP-6059](https://eips.ethereum.org/EIPS/eip-6059) that we published.

    ## SimpleNestable

    The SimpleNestable example uses the [`RMRKNestableImpl`](https://github.com/rmrk-team/evm/blob/dev/contracts/implementations/nativeTokenPay/RMRKNestableImpl.sol). It is used by importing it using the import statement below the pragma definition:

    ```
    import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKNestableImpl.sol";
    ```

    Once the `RMRKNestableImpl.sol` is imported into our file, we can set the inheritance of our smart contract:

    ```
    contract SimpleNestable is RMRKNestableImpl {

    }
    ```

    The `RMRKNestableImpl` implements all of the required functionality of the Nested RMRK lego. It implements minting of parent NFTs as well as child NFTs. Transferring and burning the NFTs is also implemented.

    WARNING: The `RMRKNestableImpl` only has minimal access control implemented. If you intend to use it, make sure to define your own, otherwise your smart contracts are at risk of unexpected behaviour.

    The constructor to initialize the RMRKNestableImpl accepts the following arguments:

    - `name_`: string argument that should represent the name of the NFT collection
    - `symbol_`: string argument that should represent the symbol of the NFT collection
    - `collectionMetadata_`: string argument that defines the metadata URI of the whole collection
    - `tokenURI_`: string argument that defines the base URI of the token metadata
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

    In order to properly initiate the inherited smart contract, our smart contract needs to accept the arguments, mentioned above, in the constructor and pass them to `RMRKNestableImpl`:

    ```
        constructor(
            string memory name,
            string memory symbol,
            string memory collectionMetadata,
            string memory tokenURI,
            InitData memory data
        )
            RMRKNestableImpl(
                name,
                symbol,
                collectionMetadata,
                tokenURI,
                data
            )
        {}
    ```

    The full code is therefore:

    ```
    // SPDX-License-Identifier: UNLICENSED
    pragma solidity ^0.8.16;

    import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKNestableImpl.sol";

    contract SimpleNestable is RMRKNestableImpl {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            string memory name,
            string memory symbol,
            string memory collectionMetadata,
            string memory tokenURI,
            InitData memory data
        )
            RMRKNestableImpl(
                name,
                symbol,
                collectionMetadata,
                tokenURI,
                data
            )
        {}
    }
    ```

    ## RMRKNestableImpl

    Let's take a moment to examine the core of this implementation, the `RMRKNestableImpl`.

    It uses the `RMRKRoyalties`, `RMRKNestable`, `RMRKCollectionMetadata` and `RMRKMintingUtils` smart contracts from RMRK stack. To dive deeper into their operation, please refer to their respective documentation.

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

    #### nestMint
    The nestMint function is used to mint child NFTs to be owned by the parent NFT and accepts three arguments:
    - `to`: address type of argument specifying the address of the smart contract to which the parent NFT belongs to
    - `numToMint`: uint256 type of argument specifying the amount of tokens to be minted
    - `destinationId`: uint256 type of argument specifying the ID of the parent NFT to which to mint the child NFT

    The constraints of nestMint are similar to the ones set out for mint function.

    #### transfer
    Can only be called by a direct owner or a parent NFT's smart contract or a caller that was given the allowance and is used to transfer the NFT to the specified address.

    #### nestTransfer
    Can only be called by a direct owner or a parent NFT's smart contract or a caller that was given the allowance and is used to transfer the NFT to another NFT residing in a specified contract. This will nest the given NFT into the specified one.

    #### tokenURI
    The tokenURI function is used to get the metadata URI of the given token and accepts one argument:
    - uint256 type of argument specifying the ID of the token

    #### updateRoyaltyRecipient
    The updateRoyaltyRecipient function is used to update the royalty recipient and accepts one argument:
    - newRoyaltyRecipient: address type of argument specifying the address of the new beneficiary recipient

    ## Deploy Script

    The deploy script for the `SimpleNestable` smart contract resides in the `deployNestable.ts`.
    The script uses `ethers`, `SimpleNestable` and `ContractTransaction` imports. The empty deploy script should look like this:

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
      const pricePerMint = ethers.utils.parseEther("0.0001");
      const totalTokens = 5;
      const [owner] = await ethers.getSigners();
    ```

    Now that the constants are ready, we can deploy the smart contracts and log the addresses of the contracts to the console:

    ```
      const contractFactory = await ethers.getContractFactory("SimpleNestable");
      const parent: SimpleNestable = await contractFactory.deploy(
        "Kanaria",
        "KAN",
        "ipfs://collectionMeta",
        "ipfs://tokenMeta",
        {
          erc20TokenAddress: ethers.constants.AddressZero,
          tokenUriIsEnumerable: true,
          royaltyRecipient: await owner.getAddress(),
          royaltyPercentageBps: 10,
          maxSupply: 1000,
          pricePerMint: pricePerMint
        }
      );
      const child: SimpleNestable = await contractFactory.deploy(
        "Chunky",
        "CHN",
        "ipfs://collectionMeta",
        "ipfs://tokenMeta",
        {
          erc20TokenAddress: ethers.constants.AddressZero,
          tokenUriIsEnumerable: true,
          royaltyRecipient: await owner.getAddress(),
          royaltyPercentageBps: 10,
          maxSupply: 1000,
          pricePerMint: pricePerMint
        }
      );


      await parent.deployed();
      await child.deployed();
      console.log(
        `Sample contracts deployed to ${parent.address} and ${child.address}`
      );
    ```

    A custom script added to package.json allows us to easily run the script:

    ```
      "scripts": {
        "deploy-nestable": "hardhat run scripts/deployNestable.ts"
      }
    ```

    Using the script with `npm run deploy-nestable` should return the following output:

    ```
    npm run deploy-nestable

    > @rmrk-team/evm-contract-samples@0.1.0 deploy-nestable
    > hardhat run scripts/deployNestable.ts

    Compiled 47 Solidity files successfully
    Sample contracts deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3 and 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
    ```
