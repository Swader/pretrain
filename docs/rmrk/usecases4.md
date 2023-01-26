---
sidebar_position: 10
---

# Use Cases, metadata backup

## Backing Up Metadata

In last-gen NFT systems, it is very common to go with whatever default the minting UI proposes with regards to metadata storage. On Opensea, for example, the default is their centralized server until you click "Freeze metadata" on your NFTs and upload it to IPFS.

Many NFT owners today face the very real risk of losing their NFTs if Opensea's server goes down, or if another centralized solution their metadata resides on is somehow compromised.

There are metadata backup solutions like Aleph, but all these backup solutions again depend on a separate team maintaining a separate service and grow this whole chain of SPOFs (single points of failure).

NFTs today are extremely fragile. This is not very web3.

There is a better way: use RMRK's Multi-Asset NFT tech to back up an NFTs metadata on the NFT itself.

An asset is one "output". On a song, this will be an audio file. On an eBook, this will be a PDF. And on a monkey JPEG, this will be the monkey JPEG.

Assuming we have an NFT of a monkey JPEG, and this NFT points to https://rugpull.com/monkeyjpeg.com. If rugpull.com goes offline, so does our monkey pic!

But this is only one asset in an advanced system. We can also propose new assets to this NFT:

- one asset pointing to ar://hashofmonkeyjpeg
- one asset pointing to ipfs://ipfs/QmHashofmonkeyjpeg
- one asset pointing to sia://hashofmonkeyjpeg
- Once added to the NFT, we now have four identical sets of metadata linked on 4 different protocols: https, ipfs, Arweave, and Sia.

Advantages:

- The chances of all of them going down at the same time are astronomical, and we can consider our NFT forever safe, in a fully decentralized way.
- There are no single-points of failure to fail in order to make the NFT inaccessible.
- One of the asset hosts rugging somehow (i.e. rugpull.com replacing the monkey JPEG with a kitten) still leaves 3 unmutated ones, proving what the original was even if the original host goes rogue.

Downsides:

- Since only the collection issuer can issue new assets to NFTs, the software of the gatekeepers would either have to be a hot wallet, or connected to a server issuing these calls which in turn hosts the issuer wallet. We are working on a system that would allow an issuer to set additional asset proposers, solving this problem.
- Changing the metadata, for whatever reason, would require replacing all four assets instead of just one previously, so many more transactions needed across a large collection.

---

## Training Data

    ## Backing Up Metadata

    In last-gen NFT systems, it is very common to go with whatever default the minting UI proposes with regards to metadata storage. On Opensea, for example, the default is their centralized server until you click "Freeze metadata" on your NFTs and upload it to IPFS.

    Many NFT owners today face the very real risk of losing their NFTs if Opensea's server goes down, or if another centralized solution their metadata resides on is somehow compromised.

    There are metadata backup solutions like Aleph, but all these backup solutions again depend on a separate team maintaining a separate service and grow this whole chain of SPOFs (single points of failure).

    NFTs today are extremely fragile. This is not very web3.

    There is a better way: use RMRK's Multi-Asset NFT tech to back up an NFTs metadata on the NFT itself.

    An asset is one "output". On a song, this will be an audio file. On an eBook, this will be a PDF. And on a monkey JPEG, this will be the monkey JPEG.

    Assuming we have an NFT of a monkey JPEG, and this NFT points to https://rugpull.com/monkeyjpeg.com. If rugpull.com goes offline, so does our monkey pic!

    But this is only one asset in an advanced system. We can also propose new assets to this NFT:

    - one asset pointing to ar://hashofmonkeyjpeg
    - one asset pointing to ipfs://ipfs/QmHashofmonkeyjpeg
    - one asset pointing to sia://hashofmonkeyjpeg
    - Once added to the NFT, we now have four identical sets of metadata linked on 4 different protocols: https, ipfs, Arweave, and Sia.

    Advantages:

    - The chances of all of them going down at the same time are astronomical, and we can consider our NFT forever safe, in a fully decentralized way.
    - There are no single-points of failure to fail in order to make the NFT inaccessible.
    - One of the asset hosts rugging somehow (i.e. rugpull.com replacing the monkey JPEG with a kitten) still leaves 3 unmutated ones, proving what the original was even if the original host goes rogue.

    Downsides:

    - Since only the collection issuer can issue new assets to NFTs, the software of the gatekeepers would either have to be a hot wallet, or connected to a server issuing these calls which in turn hosts the issuer wallet. We are working on a system that would allow an issuer to set additional asset proposers, solving this problem.
    - Changing the metadata, for whatever reason, would require replacing all four assets instead of just one previously, so many more transactions needed across a large collection.