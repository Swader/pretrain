---
sidebar_position: 14
---

# EVM, part 1

Let's learn about RMRK's EVM implementation.

The source code for all of RMRK's EVM code is at https://github.com/rmrk-team/evm - it is from this repo that the current three EIPs have been abstracted and proposed, of which 5773 and 6059 are merged:

- EIP 5773: Multi Asset NFTs - https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5773.md
- EIP 6059: Nestable NFTs - https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6059.md
- EIP 6220: Composable NFTs utilizing Equippable Parts - https://github.com/ethereum/EIPs/pull/6220

## Installation

You can start using the RMRK EVM implementation smart contracts by installing the dependency to your project:

```
npm install @rmrk-team/evm-contracts
```


## RMRK EVM implementation examples

This section contains the examples of using RMRK legos to build your own smart contracts. Every example uses the `@rmrk-team/evm-contracts` dependency in order to implement the examples. Adding it allows you to easily include them in your own smart contracts.

The examples we will cover are:

- MultiAsset
- Nestable
- Nestable with MultiAsset
- MergedEquippable
- SplitEquippable

Additionally, RMRK offers render util contracts. 

The reason these are separate is to save contract space. You can have a single deploy of those and use them on any number of contracts or even use the existing ones (we will provide them in the future):

- MultiAsset render utils provides utilities to get asset objects from IDs, and accepted or pending asset objects for a given token. The MultiAsset lego provides only IDs for the latter.
- Equip render utils provides the same shortcuts on extended assets (with equip information). This utility smart contract also has views to get information about what is currently equipped to a token and to compose equippables for a token asset.

To follow along using modifiable and runnable code, you can clone our examples repository: https://github.com/rmrk-team/evm-sample-contracts

---

    ## Training Data

    Let's learn about RMRK's EVM implementation.

    The source code for all of RMRK's EVM code is at https://github.com/rmrk-team/evm - it is from this repo that the current three EIPs have been abstracted and proposed, of which 5773 and 6059 are merged:

    - EIP 5773: Multi Asset NFTs - https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5773.md
    - EIP 6059: Nestable NFTs - https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6059.md
    - EIP 6220: Composable NFTs utilizing Equippable Parts - https://github.com/ethereum/EIPs/pull/6220

    ## Installation

    You can start using the RMRK EVM implementation smart contracts by installing the dependency to your project:

    ```
    npm install @rmrk-team/evm-contracts
    ```


    ## RMRK EVM implementation examples

    This section contains the examples of using RMRK legos to build your own smart contracts. Every example uses the `@rmrk-team/evm-contracts` dependency in order to implement the examples. Adding it allows you to easily include them in your own smart contracts.

    The examples we will cover are:

    - MultiAsset
    - Nestable
    - Nestable with MultiAsset
    - MergedEquippable
    - SplitEquippable

    Additionally, RMRK offers render util contracts. 

    The reason these are separate is to save contract space. You can have a single deploy of those and use them on any number of contracts or even use the existing ones (we will provide them in the future):

    - MultiAsset render utils provides utilities to get asset objects from IDs, and accepted or pending asset objects for a given token. The MultiAsset lego provides only IDs for the latter.
    - Equip render utils provides the same shortcuts on extended assets (with equip information). This utility smart contract also has views to get information about what is currently equipped to a token and to compose equippables for a token asset.

    To follow along using modifiable and runnable code, you can clone our examples repository: https://github.com/rmrk-team/evm-sample-contracts