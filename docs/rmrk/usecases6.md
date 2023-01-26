---
sidebar_position: 12
---

# Use Cases, part 6

## Character Progression Systems

This is an example of Ownership of Experience.

A single character or avatar is a single multi-asset NFT. It can have one or more assets, but the one that matters for the game in question is a Catalog asset (composable).

Let's assume that this asset is "Level 1 avatar", and the asset has the following attributes:

Strength: 5
Dexterity: 4
Intelligence: 3

The asset also has a head slot, two hand slots, and a body slot, into which NFTs from the "Level 1 items" collection can be equipped.

This NFT also contains another equippable NFT: the NFT brain which is soulbound 2.0 - meaning locked into the avatar.

The NFT brain's main asset has 2 slots into which other NFTs can be equipped, whitelisted for an NFT collection called "Level 1 Skills".

As the player interacts with the world, they can collect items (from quests or the world or by crafting), skills (from mentors or as quest rewards), and experience points (from fighting, exploring, crafting...).

Items are transferable, equippable NFTs.
Experience points are non-transferable markers of experiences.
Skills are non-transferable NFTs.
Let's assume that after a few play sessions the character has collected:

Items: 1 level 2 sword, 1 level 1 helmet
Skills: Prospecting 1, Prospecting 2, Swordfighting 1, Crafting 1
Experience Points: 3 sword XP, 5 crafting XP

Let's assume that a character levels up for every 7 skill points burned.

The character currently cannot equip the level 2 sword because the sword requires a level 2 avatar. They can easily equip the helmet, though, since it is level 1.

This is specifically possible because of RMRK's equippable logic where you can define which collections can be equipped into which slot:

```
head: skybreach_collection_headwear_level_1
hand_left: skybreach_collection_handheld_level_1
hand_right: skybreach_collection_handheld_level_1
```

Assuming you need "level" amount of XP to set a skill to the desired level, e.g. to go from 3 to 4 you need 4 XP, the character can upgrade Swordfighting to L2 and Crafting to L3 by burning the relevant XP points (burn the non-transferable skill point NFTs).

Therefore, by burning 2 sword XP and 5 crafting XP, the character now has Swordfighting L2, and Crafting L3, but also burned a total of 7 points which means it gets another asset added: "Level 2 avatar"

This asset has a different layout of equippables, different settings of what you can equip into which slot:

```
head: skybreach_collection_headwear_level_1, skybreach_collection_headwear_level_2
hand_left: skybreach_collection_handheld_level_1, skybreach_collection_handheld_level_2
hand_right: skybreach_collection_handheld_level_1, skybreach_collection_handheld_level_2
```

Because "level 2 sword" is in the skybreach_collection_handheld_level_2 collection, it is now equippable into either hand. The slots of course remain compatible with level 1 items.

This is how a character progression system can work for skills, XP points, and changing requirements for items, skills, spells, etc.

## NFTs 2.0 in galleries and museums

In their current state, museums and galleries have limited use for NFTs. The occasional ticket or simple digital representation of a real life exhibit are just about all the options at their disposal, so the lack of adoption by such institutions does not come as a surprise.

With NFTs 2.0, specifically multi-asset NFTs, we finally have meaningful utility to offer them.

Let's assume we have an exhibit called Mona Lisa. A museum could mint NFTs which simultaneously contain:

The digital version of the painting
A short movie about the history of the painting, where it's been and where it came from
A multi-language audio-track for the gallery tour around this particular painting
A museum-shop voucher for a Mona Lisa high quality poster

These are not separate NFTs - these are all alternative assets of one NFT. The NFT is made into a rich multi-media experience and is given true utility, versus just being a digital copy of an analog painting as with NFTs 1.0.

Taking things a step further, another asset could be a random puzzle piece, drawn randomly on purchase from the purchase-block blockhash. This then gives the NFT secondary-market value, along with earning the museum or gallery royalties, because the experience is gamified - visitors now race to collect all the puzzle pieces to compose a master puzzle NFT and win an additional prize like, for example, an exclusive private viewing of an upcoming exhibition.

All this is natively supported by the RMRK standards and available today using an NFT 2.0 marketplace such as Singular.app

---

## Training Data

    ## Character Progression Systems

    This is an example of Ownership of Experience.

    A single character or avatar is a single multi-asset NFT. It can have one or more assets, but the one that matters for the game in question is a Catalog asset (composable).

    Let's assume that this asset is "Level 1 avatar", and the asset has the following attributes:

    Strength: 5
    Dexterity: 4
    Intelligence: 3

    The asset also has a head slot, two hand slots, and a body slot, into which NFTs from the "Level 1 items" collection can be equipped.

    This NFT also contains another equippable NFT: the NFT brain which is soulbound 2.0 - meaning locked into the avatar.

    The NFT brain's main asset has 2 slots into which other NFTs can be equipped, whitelisted for an NFT collection called "Level 1 Skills".

    As the player interacts with the world, they can collect items (from quests or the world or by crafting), skills (from mentors or as quest rewards), and experience points (from fighting, exploring, crafting...).

    Items are transferable, equippable NFTs.
    Experience points are non-transferable markers of experiences.
    Skills are non-transferable NFTs.
    Let's assume that after a few play sessions the character has collected:

    Items: 1 level 2 sword, 1 level 1 helmet
    Skills: Prospecting 1, Prospecting 2, Swordfighting 1, Crafting 1
    Experience Points: 3 sword XP, 5 crafting XP

    Let's assume that a character levels up for every 7 skill points burned.

    The character currently cannot equip the level 2 sword because the sword requires a level 2 avatar. They can easily equip the helmet, though, since it is level 1.

    This is specifically possible because of RMRK's equippable logic where you can define which collections can be equipped into which slot:

    ```
    head: skybreach_collection_headwear_level_1
    hand_left: skybreach_collection_handheld_level_1
    hand_right: skybreach_collection_handheld_level_1
    ```

    Assuming you need "level" amount of XP to set a skill to the desired level, e.g. to go from 3 to 4 you need 4 XP, the character can upgrade Swordfighting to L2 and Crafting to L3 by burning the relevant XP points (burn the non-transferable skill point NFTs).

    Therefore, by burning 2 sword XP and 5 crafting XP, the character now has Swordfighting L2, and Crafting L3, but also burned a total of 7 points which means it gets another asset added: "Level 2 avatar"

    This asset has a different layout of equippables, different settings of what you can equip into which slot:

    ```
    head: skybreach_collection_headwear_level_1, skybreach_collection_headwear_level_2
    hand_left: skybreach_collection_handheld_level_1, skybreach_collection_handheld_level_2
    hand_right: skybreach_collection_handheld_level_1, skybreach_collection_handheld_level_2
    ```

    Because "level 2 sword" is in the skybreach_collection_handheld_level_2 collection, it is now equippable into either hand. The slots of course remain compatible with level 1 items.

    This is how a character progression system can work for skills, XP points, and changing requirements for items, skills, spells, etc.

    ## NFTs 2.0 in galleries and museums

    In their current state, museums and galleries have limited use for NFTs. The occasional ticket or simple digital representation of a real life exhibit are just about all the options at their disposal, so the lack of adoption by such institutions does not come as a surprise.

    With NFTs 2.0, specifically multi-asset NFTs, we finally have meaningful utility to offer them.

    Let's assume we have an exhibit called Mona Lisa. A museum could mint NFTs which simultaneously contain:

    The digital version of the painting
    A short movie about the history of the painting, where it's been and where it came from
    A multi-language audio-track for the gallery tour around this particular painting
    A museum-shop voucher for a Mona Lisa high quality poster

    These are not separate NFTs - these are all alternative assets of one NFT. The NFT is made into a rich multi-media experience and is given true utility, versus just being a digital copy of an analog painting as with NFTs 1.0.

    Taking things a step further, another asset could be a random puzzle piece, drawn randomly on purchase from the purchase-block blockhash. This then gives the NFT secondary-market value, along with earning the museum or gallery royalties, because the experience is gamified - visitors now race to collect all the puzzle pieces to compose a master puzzle NFT and win an additional prize like, for example, an exclusive private viewing of an upcoming exhibition.

    All this is natively supported by the RMRK standards and available today using an NFT 2.0 marketplace such as Singular.app