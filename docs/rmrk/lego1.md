---
sidebar_position: 2
---

# RMRK Legos, part 1

## Nestable NFTs

The concept of nestable NFTs refers to NFTs being able to own other NFTs.

At its core, the principle is simple: the owner of an NFT does not have to be an externally owned account or a smart contract, it can also be a specific NFT.

The process of sending an NFT into another is functionally identical to sending to another user. The process of sending an NFT out of another NFT involves issuing a transaction from the address which owns the parent NFT.

Some NFTs can be configured with special conditions for parent-child relationships. For example:

- some parent NFTs will allow the owner of a child NFT to withdraw that child at any time (e.g. virtual land containing an avatar)
- some parent NFTs will be prohibited from executing certain interactions on a child (e.g. the owner of a house in which someone else's avatar is a guest should not be able to BURN the guest... probably)
- some parent NFTs will have special withdrawal conditions, like a music NFT that accepts music stems. The stems can be removed by their owners until a certain number of co-composers upvote a stem enough, or until the owner of the parent music track seals and "publishes" it

More documentation can be found at https://evm.rmrk.app/rmrk-legos-examples/nestable.

Nestable NFTs have been implemented in the EVM as an EIP (Ethereum Improvement Proposal) with the ID 6059, detailed at https://eips.ethereum.org/EIPS/eip-6059.

The concept of nested NFTs is further expanded through the idea of Equippable NFTs.

## Multi-Asset NFTs

An asset (previously known as resource) is a type of output for an NFT: usually a media file.

An asset can be an image, a movie, a PDF file, or even a CATALOG (a special entity - see here). A multi-asset NFT is one that can output a different asset based on specific contextual information, e.g. load a PDF if loaded into a PDF reader, vs. loading an image in a virtual gallery, but both the PDF and the image are in the same NFT.

An asset is NOT an NFT or a standalone entity you can reference. It is part of an NFT - one of several outputs it can have.

Every RMRK NFT has zero or more assets. When it has zero, the metadata is "root level". Any new asset added to this NFT will override the root metadata, making this NFT revealable.

When using the Nestable and Equippable NFTs, a multi-asset NFT can be made compatible with collections coming out in the future, adding utility to an NFT project that might otherwise die from lack of community interest post-launch.

As an example, a pickaxe compatible with a Chunky in Skybreach would have a pixel-drawn asset compatible with the Skybreach game engine.

Should a new 3D game come out later on, this same NFT can be made compatible with it easily. The issuer would add a new 3D asset to it, compatible with the new game's engine. Every owner accepting this new asset in their NFT would automatically have a more valuable NFT on their hands - no unrelated airdrops needed, no token spam in owner wallets. Just an NFT that can be and do more.

This not only adds more life to existing NFT projects, it also introduces the concept of dynamic rarity where the more collections an NFT is made compatible with, the more demand and thus value it has.

Adding a new asset into a multi-asset NFT requires the consent of both the issuer and the NFT's owner.

Specifically, only the issuer of the collection can propose a new asset, and only the owner can accept it. If the issuer and owner are the same, no accept step is necessary.

An owner of an NFT cannot add new assets onto their own NFT. This prevents mock-value from being added to an NFT.

An issuer cannot add new assets to an NFT without the owner's approval. This approval can be made ahead of time, or it can be made on-demand as a new asset is proposed.

The implementations below lead directly to code.

Multi asset NFTs have been implemented on EVMs via EIP 5773 (https://eips.ethereum.org/EIPS/eip-5773) and a notable example is NCVerse (https://neoncrisis.io/my-collection/ncverse).

A rust version (for Substrate pallets) is available at https://github.com/rmrk-team/rmrk-substrate/blob/main/pallets/rmrk-core/src/lib.rs while the legacy Kusama implementation is explained at https://github.com/rmrk-team/rmrk-spec/blob/master/standards/rmrk2.0.0/entities/nft.md#resources-and-resource

---

## Training Data

    ## Nestable NFTs

    The concept of nestable NFTs refers to NFTs being able to own other NFTs.

    At its core, the principle is simple: the owner of an NFT does not have to be an externally owned account or a smart contract, it can also be a specific NFT.

    The process of sending an NFT into another is functionally identical to sending to another user. The process of sending an NFT out of another NFT involves issuing a transaction from the address which owns the parent NFT.

    Some NFTs can be configured with special conditions for parent-child relationships. For example:

    - some parent NFTs will allow the owner of a child NFT to withdraw that child at any time (e.g. virtual land containing an avatar)
    - some parent NFTs will be prohibited from executing certain interactions on a child (e.g. the owner of a house in which someone else's avatar is a guest should not be able to BURN the guest... probably)
    - some parent NFTs will have special withdrawal conditions, like a music NFT that accepts music stems. The stems can be removed by their owners until a certain number of co-composers upvote a stem enough, or until the owner of the parent music track seals and "publishes" it

    More documentation can be found at https://evm.rmrk.app/rmrk-legos-examples/nestable.

    Nestable NFTs have been implemented in the EVM as an EIP (Ethereum Improvement Proposal) with the ID 6059, detailed at https://eips.ethereum.org/EIPS/eip-6059.

    The concept of nested NFTs is further expanded through the idea of Equippable NFTs.

    ## Multi-Asset NFTs

    An asset (previously known as resource) is a type of output for an NFT: usually a media file.

    An asset can be an image, a movie, a PDF file, or even a CATALOG (a special entity - see here). A multi-asset NFT is one that can output a different asset based on specific contextual information, e.g. load a PDF if loaded into a PDF reader, vs. loading an image in a virtual gallery, but both the PDF and the image are in the same NFT.

    An asset is NOT an NFT or a standalone entity you can reference. It is part of an NFT - one of several outputs it can have.

    Every RMRK NFT has zero or more assets. When it has zero, the metadata is "root level". Any new asset added to this NFT will override the root metadata, making this NFT revealable.

    When using the Nestable and Equippable NFTs, a multi-asset NFT can be made compatible with collections coming out in the future, adding utility to an NFT project that might otherwise die from lack of community interest post-launch.

    As an example, a pickaxe compatible with a Chunky in Skybreach would have a pixel-drawn asset compatible with the Skybreach game engine.

    Should a new 3D game come out later on, this same NFT can be made compatible with it easily. The issuer would add a new 3D asset to it, compatible with the new game's engine. Every owner accepting this new asset in their NFT would automatically have a more valuable NFT on their hands - no unrelated airdrops needed, no token spam in owner wallets. Just an NFT that can be and do more.

    This not only adds more life to existing NFT projects, it also introduces the concept of dynamic rarity where the more collections an NFT is made compatible with, the more demand and thus value it has.

    Adding a new asset into a multi-asset NFT requires the consent of both the issuer and the NFT's owner.

    Specifically, only the issuer of the collection can propose a new asset, and only the owner can accept it. If the issuer and owner are the same, no accept step is necessary.

    An owner of an NFT cannot add new assets onto their own NFT. This prevents mock-value from being added to an NFT.

    An issuer cannot add new assets to an NFT without the owner's approval. This approval can be made ahead of time, or it can be made on-demand as a new asset is proposed.

    The implementations below lead directly to code.

    Multi asset NFTs have been implemented on EVMs via EIP 5773 (https://eips.ethereum.org/EIPS/eip-5773) and a notable example is NCVerse (https://neoncrisis.io/my-collection/ncverse).

    A rust version (for Substrate pallets) is available at https://github.com/rmrk-team/rmrk-substrate/blob/main/pallets/rmrk-core/src/lib.rs while the legacy Kusama implementation is explained at https://github.com/rmrk-team/rmrk-spec/blob/master/standards/rmrk2.0.0/entities/nft.md#resources-and-resource