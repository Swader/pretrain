---
sidebar_position: 9
---

# Use Cases, revealable NFTs

## Revealable NFTs

In last-gen NFT systems, selling a collection of seemingly identical NFTs and then "hatching" or revealing them later into unique NFTs requires centralized metadata where either the tokenURI points to a centralized server that can be swapped out after launch, or the contract itself has a mutable metadata field.

This is not very web3.

RMRK's Multi-Asset NFTs are uniquely positioned to resolve this in a fully on-chain way, with no issuer rug-pulls being an option.

An NFT can have zero assets, in which case the metadata - including the URI to the media file - is placed in the root level of the NFT, just like in standards like ERC721.

In this case, such a RMRK NFT is fully compatible with ERC721 and is considered to be revealable.

If the issuer of the collection adds a new asset to an NFT from this collection, this new asset will, if accepted, replace the root-level metadata in all interfaces, renders, wallets, etc.

⚠️ An asset always takes priority over root-level metadata (null-asset)

You may be wondering if this makes it possible to still rug the art from the issuer side - just keep replacing assets, and eventually replace with something unfitting?

No, in Multi-Asset NFT systems, each mutation like an asset addition or an asset replacement is a two-party operation where the issuer proposes the new asset, and the NFT owner accepts the new asset.

Now, rather than hit the Opensea "refresh metadata" button, the user only has to click "Accept new asset" after inspecting it - and it all happens on chain.

If the owner wishes to keep the old asset or even keep the NFT unrevealed, they can just choose not to accept the new asset (though it should be noted that the revealed asset is on chain in the pending queue - just not applied - so it is easy to find out what it was revealed as).

Advantages

- Decentralized metadata makes sure future rugpulls by issuer are impossible
- "Hatching" does not require burning or another airdrop

Downsides

- Since only the collection issuer can issue new assets to NFTs, the software of the gatekeepers would either have to be a hot wallet, or connected to a server issuing these calls which in turn hosts the issuer wallet. We are working on a system that would allow an issuer to set additional asset proposers, solving this problem.

---

## Training Data

    ## Revealable NFTs

    In last-gen NFT systems, selling a collection of seemingly identical NFTs and then "hatching" or revealing them later into unique NFTs requires centralized metadata where either the tokenURI points to a centralized server that can be swapped out after launch, or the contract itself has a mutable metadata field.

    This is not very web3.

    RMRK's Multi-Asset NFTs are uniquely positioned to resolve this in a fully on-chain way, with no issuer rug-pulls being an option.

    An NFT can have zero assets, in which case the metadata - including the URI to the media file - is placed in the root level of the NFT, just like in standards like ERC721.

    In this case, such a RMRK NFT is fully compatible with ERC721 and is considered to be revealable.

    If the issuer of the collection adds a new asset to an NFT from this collection, this new asset will, if accepted, replace the root-level metadata in all interfaces, renders, wallets, etc.

    ⚠️ An asset always takes priority over root-level metadata (null-asset)

    You may be wondering if this makes it possible to still rug the art from the issuer side - just keep replacing assets, and eventually replace with something unfitting?

    No, in Multi-Asset NFT systems, each mutation like an asset addition or an asset replacement is a two-party operation where the issuer proposes the new asset, and the NFT owner accepts the new asset.

    Now, rather than hit the Opensea "refresh metadata" button, the user only has to click "Accept new asset" after inspecting it - and it all happens on chain.

    If the owner wishes to keep the old asset or even keep the NFT unrevealed, they can just choose not to accept the new asset (though it should be noted that the revealed asset is on chain in the pending queue - just not applied - so it is easy to find out what it was revealed as).

    Advantages

    - Decentralized metadata makes sure future rugpulls by issuer are impossible
    - "Hatching" does not require burning or another airdrop

    Downsides

    - Since only the collection issuer can issue new assets to NFTs, the software of the gatekeepers would either have to be a hot wallet, or connected to a server issuing these calls which in turn hosts the issuer wallet. We are working on a system that would allow an issuer to set additional asset proposers, solving this problem.
