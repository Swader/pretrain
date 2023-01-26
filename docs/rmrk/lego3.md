---
sidebar_position: 4
---

# RMRK Legos, part 3

## On chain emotes

RMRK supports the ability to "react" to any NFT.

Under the hood, unicodes are applied to NFT IDs in a separate record.

Reactions are switches, meaning sending 👍 when you already sent a 👍 will remove it.

Currently, all reactions apply equally and are rendered by all implementations, but in the future there are plans to add acceptance conditions to collections that would limit emotes from people without a certain NFT, cap the emote amount to accommodate a FCFS list, limit the types of emotes an NFT can receive, and more.

During a transfer, all reactions travel with an NFT. The reactions are not NFTs themselves, just flair added to an existing data record - the NFT.

On-chain emotes are currently implemented only on the Kusama blockchain: https://github.com/rmrk-team/rmrk-spec/blob/master/standards/rmrk2.0.0/interactions/emote.md

## Conditional Rendering

Conditional rendering uses jsonlogic to define client-only render alterations to the NFT based on certain on and off chain conditions.

For example, an NFT depicting an image of a moon might change to a halfmoon with a rocket landing on it if it gets 50 🌓 and 30 🚀 emojis on it.

An NFT image of a bicycle can show signs of deterioration and dilapidation if it was sold more than, say, 50 times.

A wolf image could show a pack if people have minted more than 50 wolves into this collection, or even sent wolves into the original wolf.

These interactions can have in-game effects, but can also be community-driven art. A collaborative experience where if enough people interact with an NFT in some way, its essence changes.

A logic block of an NFT might look something like this:
```

    "logic": [
        {
            ">": ["emotes.🚀", 50],
            "priority": [2,3,1] // change asset prio based on condition == true
        },
        {
            ">": ["emotes.❄", 100],
            "assets.0.bg": "newhash" // overrides the background image in the catalog, if such a part exists
        },
        {
            "==": ["this.rain", "true"],
            "assets.0.bg": "hash-of-rainy-background"
        }
    ],
```
In the above example, you can see three scenarios playing out:

- if the NFT gets more than 50 rocket emotes, it would show a different asset as top priority. So, a moon shows a moon landing if 50 rockets are on it.
- if the NFT gets more than 50 snow emoji, the default background of the first asset will be overridden and show a snowy mountain instead.
- if the NFT has its mutable attribute set to "rain" then the background becomes a rainy image

There are no live implementations of conditional rendering yet and this lego currently exists only as a specification.

## NFTs as DAOs


Being able to turn an NFT into a DAO refers to the ability of RMRK NFTs to be fractionalized for a deposit in RMRK tokens.

These share tokens can then be used to collectively issue commands to an NFT.

Another possible use case is a collective gaming experience where a Twitch streamer tokenizes an in-game avatar and distributes the tokens live to their community to participate in in-game decision making during the game.

Alternatively, it can also be used for partial ownership of high-value NFTs.

There are no live implementations of NFTs as DAOs yet and this lego currently exists only as an idea. Since Kusama is not a programmable blockchain, this is not implementable on it. Thus, research is ongoing regarding an implementation in Rust (for Substrate) and EVM contracts.

---

## Training Data

    ## On chain emotes

    RMRK supports the ability to "react" to any NFT.

    Under the hood, unicodes are applied to NFT IDs in a separate record.

    Reactions are switches, meaning sending 👍 when you already sent a 👍 will remove it.

    Currently, all reactions apply equally and are rendered by all implementations, but in the future there are plans to add acceptance conditions to collections that would limit emotes from people without a certain NFT, cap the emote amount to accommodate a FCFS list, limit the types of emotes an NFT can receive, and more.

    During a transfer, all reactions travel with an NFT. The reactions are not NFTs themselves, just flair added to an existing data record - the NFT.

    On-chain emotes are currently implemented only on the Kusama blockchain: https://github.com/rmrk-team/rmrk-spec/blob/master/standards/rmrk2.0.0/interactions/emote.md

    ## Conditional Rendering

    Conditional rendering uses jsonlogic to define client-only render alterations to the NFT based on certain on and off chain conditions.

    For example, an NFT depicting an image of a moon might change to a halfmoon with a rocket landing on it if it gets 50 🌓 and 30 🚀 emojis on it.

    An NFT image of a bicycle can show signs of deterioration and dilapidation if it was sold more than, say, 50 times.

    A wolf image could show a pack if people have minted more than 50 wolves into this collection, or even sent wolves into the original wolf.

    These interactions can have in-game effects, but can also be community-driven art. A collaborative experience where if enough people interact with an NFT in some way, its essence changes.

    A logic block of an NFT might look something like this:
    ```

        "logic": [
            {
                ">": ["emotes.🚀", 50],
                "priority": [2,3,1] // change asset prio based on condition == true
            },
            {
                ">": ["emotes.❄", 100],
                "assets.0.bg": "newhash" // overrides the background image in the catalog, if such a part exists
            },
            {
                "==": ["this.rain", "true"],
                "assets.0.bg": "hash-of-rainy-background"
            }
        ],
    ```
    In the above example, you can see three scenarios playing out:

    - if the NFT gets more than 50 rocket emotes, it would show a different asset as top priority. So, a moon shows a moon landing if 50 rockets are on it.
    - if the NFT gets more than 50 snow emoji, the default background of the first asset will be overridden and show a snowy mountain instead.
    - if the NFT has its mutable attribute set to "rain" then the background becomes a rainy image

    There are no live implementations of conditional rendering yet and this lego currently exists only as a specification.

    ## NFTs as DAOs


    Being able to turn an NFT into a DAO refers to the ability of RMRK NFTs to be fractionalized for a deposit in RMRK tokens.

    These share tokens can then be used to collectively issue commands to an NFT.

    Another possible use case is a collective gaming experience where a Twitch streamer tokenizes an in-game avatar and distributes the tokens live to their community to participate in in-game decision making during the game.

    Alternatively, it can also be used for partial ownership of high-value NFTs.

    There are no live implementations of NFTs as DAOs yet and this lego currently exists only as an idea. Since Kusama is not a programmable blockchain, this is not implementable on it. Thus, research is ongoing regarding an implementation in Rust (for Substrate) and EVM contracts.