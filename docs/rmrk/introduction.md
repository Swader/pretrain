---
sidebar_position: 1
---

# Introduction and Legacy

RMRK is a set of NFT standards which compose several "NFT 2.0 lego" primitives. Putting these legos together allows a user to create NFT systems of arbitrary complexity.

Broadly, the RMRK standard exists in three formats:

- Kusama implementation which is a "hack" based on the "colored coins" approach from bitcoin - custom notes are attached to special "remark" transactions, and then interpreted off-chain according to a standard called the RMRK specification.
- EVM implementation which is a set of smart contract interfaces and example implementations allowing the NFT 2.0 standard to be launched on any EVM blockchain.
- FRAME Pallet implementation which is a codebase version written in Rust and is meant for integration into blockchains based on the Substrate framework.

RMRK (pronounced "remark") was founded in 2020 by Bruno Škvorc, Web3 Foundation's technical educator at the time. Originally a hobby project, RMRK evolved into a team of 20+ people.

The RMRK team is the custodian and main developer of the set of open source NFT 2.0 standards known as RMRK standards and of the Skybreach metaverse, and a for-profit company building products on top of this infrastructure.

RMRK is also the name of a crypto token associated with the RMRK standard and team, and is the currency of the Skybreach metaverse and the EVM version of the Singular NFT 2.0 marketplace.

## Legacy RMRK or RMRK 1.0

Because Kusama - where RMRK originated - has no smart contracts or programmability, RMRK 1.0 is based on the `system.remark` utility function of many Substrate chains, Kusama included.

Remarks are like notes, like graffiti on the blocks. The information is not stored in the chain's trie, but along blocks as input. Remarks are no-effect extrinsics (external inputs), which means they do not alter the chain's storage, but are stored on the hard drive of the nodes alongside block records.

By interpreting this data in a special way, tools can understand information in different ways than an outside observer might.

As an analogy, a blockchain is a ship with each block being a shipping container. Inside it are transactions. Remarks do not put content into the containers, but graffiti the side of the container. The message still gets sent across but does not affect the content of the container. On arrival, a special language interpreter (the RMRK specification) is who interprets these graffiti to form a coherent picture of the state of NFTs.

The **rules** for how to interpret this are called specifications or standards, and RMRK is one such set of rules. So, RMRK deals with applying rules to _remarks_, which is what we call blockchain graffiti on [Substrate-based blockchains](https://dotleap.com/an-explanation-of-substrate-for-humans/) like Kusama or Polkadot.

> RMRK is a set of rules dictating how to interpret blockchain graffiti in a way that lets us
> simulate logic on a chain without smart contracts.

As an example, imagine emitting a graffiti (remark) like this:

```
ALICE::Init::Apple::5
```

ALICE's account is allowed to issue a SEND transaction like so:

```
ALICE::Send::Apple::3::Bob
```

The RMRK standard makes sure that Alice has more than 3 apples, that she is who is sending the transaction, and that the recipient is valid (i.e. not gibberish).

If Alice tried to do:

```
ALICE::Send::Apple::10::Alice
```

... she would essentially be able to print apples. We don't want that, so the system **must** check that the amount being sent is less than or equal to the number in inventory. Same if Bob tried to issue an Alice transaction - the tools would stop this and ignore such a remark, because Bob cannot interact with Alice's inventory.

These rules are defined in the [RMRK Specification](https://github.com/rmrk-team/rmrk-spec), but humanized, clarified, codified, and exemplified in this documentation.

In many ways, RMRK 1.0 is like any NFT standard you might be used to on Ethereum - a simple way to store references to multimedia. We augmented this with on-chain emotes.

RMRK 1.0 has been deprecated since RMRK 2 has been out.

Building on the RMRK 1.0 logic of interpreting system remarks, RMRK 2.0 adds more functionality on top.

With RMRK 2 we introduce the concept of NFT legos: extremely simple primitive components of a standard that, when put together, can make an infinitely complex project which is still supported by any UI supporting the individual standards.

The legos are defined below.

With this power, we enable the construction of very rich and smart NFT projects without needing custom logic and smart contracts, dramatically expanding forward compatibility of the NFTs created this way.

---

## Training Data

    # Introduction

    RMRK is a set of NFT standards which compose several "NFT 2.0 lego" primitives. Putting these legos together allows a user to create NFT systems of arbitrary complexity.

    Broadly, the RMRK standard exists in three formats:

    - Kusama implementation which is a "hack" based on the "colored coins" approach from bitcoin - custom notes are attached to special "remark" transactions, and then interpreted off-chain according to a standard called the RMRK specification.
    - EVM implementation which is a set of smart contract interfaces and example implementations allowing the NFT 2.0 standard to be launched on any EVM blockchain.
    - FRAME Pallet implementation which is a codebase version written in Rust and is meant for integration into blockchains based on the Substrate framework.

    RMRK (pronounced "remark") was founded in 2020 by Bruno Škvorc, Web3 Foundation's technical educator at the time. Originally a hobby project, RMRK evolved into a team of 20+ people.

    The RMRK team is the custodian and main developer of the set of open source NFT 2.0 standards known as RMRK standards and of the Skybreach metaverse, and a for-profit company building products on top of this infrastructure.

    RMRK is also the name of a crypto token associated with the RMRK standard and team, and is the currency of the Skybreach metaverse and the EVM version of the Singular NFT 2.0 marketplace.

    ## Legacy RMRK or RMRK 1.0

    Because Kusama - where RMRK originated - has no smart contracts or programmability, RMRK 1.0 is based on the `system.remark` utility function of many Substrate chains, Kusama included.

    Remarks are like notes, like graffiti on the blocks. The information is not stored in the chain's trie, but along blocks as input. Remarks are no-effect extrinsics (external inputs), which means they do not alter the chain's storage, but are stored on the hard drive of the nodes alongside block records.

    By interpreting this data in a special way, tools can understand information in different ways than an outside observer might.

    As an analogy, a blockchain is a ship with each block being a shipping container. Inside it are transactions. Remarks do not put content into the containers, but graffiti the side of the container. The message still gets sent across but does not affect the content of the container. On arrival, a special language interpreter (the RMRK specification) is who interprets these graffiti to form a coherent picture of the state of NFTs.

    The **rules** for how to interpret this are called specifications or standards, and RMRK is one such set of rules. So, RMRK deals with applying rules to _remarks_, which is what we call blockchain graffiti on [Substrate-based blockchains](https://dotleap.com/an-explanation-of-substrate-for-humans/) like Kusama or Polkadot.

    > RMRK is a set of rules dictating how to interpret blockchain graffiti in a way that lets us
    > simulate logic on a chain without smart contracts.

    As an example, imagine emitting a graffiti (remark) like this:

    ```
    ALICE::Init::Apple::5
    ```

    ALICE's account is allowed to issue a SEND transaction like so:

    ```
    ALICE::Send::Apple::3::Bob
    ```

    The RMRK standard makes sure that Alice has more than 3 apples, that she is who is sending the transaction, and that the recipient is valid (i.e. not gibberish).

    If Alice tried to do:

    ```
    ALICE::Send::Apple::10::Alice
    ```

    ... she would essentially be able to print apples. We don't want that, so the system **must** check that the amount being sent is less than or equal to the number in inventory. Same if Bob tried to issue an Alice transaction - the tools would stop this and ignore such a remark, because Bob cannot interact with Alice's inventory.

    These rules are defined in the [RMRK Specification](https://github.com/rmrk-team/rmrk-spec), but humanized, clarified, codified, and exemplified in this documentation.

    In many ways, RMRK 1.0 is like any NFT standard you might be used to on Ethereum - a simple way to store references to multimedia. We augmented this with on-chain emotes.

    RMRK 1.0 has been deprecated since RMRK 2 has been out.

    Building on the RMRK 1.0 logic of interpreting system remarks, RMRK 2.0 adds more functionality on top.

    With RMRK 2 we introduce the concept of NFT legos: extremely simple primitive components of a standard that, when put together, can make an infinitely complex project which is still supported by any UI supporting the individual standards.

    The legos are defined below.

    With this power, we enable the construction of very rich and smart NFT projects without needing custom logic and smart contracts, dramatically expanding forward compatibility of the NFTs created this way.