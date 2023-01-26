"use strict";(self.webpackChunkpretrain=self.webpackChunkpretrain||[]).push([[2374],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>m});var n=a(7294);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,s=function(e,t){if(null==e)return{};var a,n,s={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(s[a]=e[a]);return s}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(s[a]=e[a])}return s}var o=n.createContext({}),h=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},c=function(e){var t=h(e.components);return n.createElement(o.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,s=e.mdxType,i=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=h(a),d=s,m=u["".concat(o,".").concat(d)]||u[d]||p[d]||i;return a?n.createElement(m,r(r({ref:t},c),{},{components:a})):n.createElement(m,r({ref:t},c))}));function m(e,t){var a=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var i=a.length,r=new Array(i);r[0]=d;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[u]="string"==typeof e?e:s,r[1]=l;for(var h=2;h<i;h++)r[h]=a[h];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},7316:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>r,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>h});var n=a(7462),s=(a(7294),a(3905));const i={sidebar_position:12},r="Use Cases, part 6",l={unversionedId:"rmrk/usecases6",id:"rmrk/usecases6",title:"Use Cases, part 6",description:"Character Progression Systems",source:"@site/docs/rmrk/usecases6.md",sourceDirName:"rmrk",slug:"/rmrk/usecases6",permalink:"/docs/rmrk/usecases6",draft:!1,editUrl:"https://github.com/swader/pretrain/docs/rmrk/usecases6.md",tags:[],version:"current",sidebarPosition:12,frontMatter:{sidebar_position:12},sidebar:"tutorialSidebar",previous:{title:"Use Cases, part 5",permalink:"/docs/rmrk/usecases5"},next:{title:"Use Cases, part 7",permalink:"/docs/rmrk/usecases7"}},o={},h=[{value:"Character Progression Systems",id:"character-progression-systems",level:2},{value:"NFTs 2.0 in galleries and museums",id:"nfts-20-in-galleries-and-museums",level:2},{value:"Training Data",id:"training-data",level:2}],c={toc:h};function u(e){let{components:t,...a}=e;return(0,s.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"use-cases-part-6"},"Use Cases, part 6"),(0,s.kt)("h2",{id:"character-progression-systems"},"Character Progression Systems"),(0,s.kt)("p",null,"This is an example of Ownership of Experience."),(0,s.kt)("p",null,"A single character or avatar is a single multi-asset NFT. It can have one or more assets, but the one that matters for the game in question is a Catalog asset (composable)."),(0,s.kt)("p",null,'Let\'s assume that this asset is "Level 1 avatar", and the asset has the following attributes:'),(0,s.kt)("p",null,"Strength: 5\nDexterity: 4\nIntelligence: 3"),(0,s.kt)("p",null,'The asset also has a head slot, two hand slots, and a body slot, into which NFTs from the "Level 1 items" collection can be equipped.'),(0,s.kt)("p",null,"This NFT also contains another equippable NFT: the NFT brain which is soulbound 2.0 - meaning locked into the avatar."),(0,s.kt)("p",null,'The NFT brain\'s main asset has 2 slots into which other NFTs can be equipped, whitelisted for an NFT collection called "Level 1 Skills".'),(0,s.kt)("p",null,"As the player interacts with the world, they can collect items (from quests or the world or by crafting), skills (from mentors or as quest rewards), and experience points (from fighting, exploring, crafting...)."),(0,s.kt)("p",null,"Items are transferable, equippable NFTs.\nExperience points are non-transferable markers of experiences.\nSkills are non-transferable NFTs.\nLet's assume that after a few play sessions the character has collected:"),(0,s.kt)("p",null,"Items: 1 level 2 sword, 1 level 1 helmet\nSkills: Prospecting 1, Prospecting 2, Swordfighting 1, Crafting 1\nExperience Points: 3 sword XP, 5 crafting XP"),(0,s.kt)("p",null,"Let's assume that a character levels up for every 7 skill points burned."),(0,s.kt)("p",null,"The character currently cannot equip the level 2 sword because the sword requires a level 2 avatar. They can easily equip the helmet, though, since it is level 1."),(0,s.kt)("p",null,"This is specifically possible because of RMRK's equippable logic where you can define which collections can be equipped into which slot:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"head: skybreach_collection_headwear_level_1\nhand_left: skybreach_collection_handheld_level_1\nhand_right: skybreach_collection_handheld_level_1\n")),(0,s.kt)("p",null,'Assuming you need "level" amount of XP to set a skill to the desired level, e.g. to go from 3 to 4 you need 4 XP, the character can upgrade Swordfighting to L2 and Crafting to L3 by burning the relevant XP points (burn the non-transferable skill point NFTs).'),(0,s.kt)("p",null,'Therefore, by burning 2 sword XP and 5 crafting XP, the character now has Swordfighting L2, and Crafting L3, but also burned a total of 7 points which means it gets another asset added: "Level 2 avatar"'),(0,s.kt)("p",null,"This asset has a different layout of equippables, different settings of what you can equip into which slot:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"head: skybreach_collection_headwear_level_1, skybreach_collection_headwear_level_2\nhand_left: skybreach_collection_handheld_level_1, skybreach_collection_handheld_level_2\nhand_right: skybreach_collection_handheld_level_1, skybreach_collection_handheld_level_2\n")),(0,s.kt)("p",null,'Because "level 2 sword" is in the skybreach_collection_handheld_level_2 collection, it is now equippable into either hand. The slots of course remain compatible with level 1 items.'),(0,s.kt)("p",null,"This is how a character progression system can work for skills, XP points, and changing requirements for items, skills, spells, etc."),(0,s.kt)("h2",{id:"nfts-20-in-galleries-and-museums"},"NFTs 2.0 in galleries and museums"),(0,s.kt)("p",null,"In their current state, museums and galleries have limited use for NFTs. The occasional ticket or simple digital representation of a real life exhibit are just about all the options at their disposal, so the lack of adoption by such institutions does not come as a surprise."),(0,s.kt)("p",null,"With NFTs 2.0, specifically multi-asset NFTs, we finally have meaningful utility to offer them."),(0,s.kt)("p",null,"Let's assume we have an exhibit called Mona Lisa. A museum could mint NFTs which simultaneously contain:"),(0,s.kt)("p",null,"The digital version of the painting\nA short movie about the history of the painting, where it's been and where it came from\nA multi-language audio-track for the gallery tour around this particular painting\nA museum-shop voucher for a Mona Lisa high quality poster"),(0,s.kt)("p",null,"These are not separate NFTs - these are all alternative assets of one NFT. The NFT is made into a rich multi-media experience and is given true utility, versus just being a digital copy of an analog painting as with NFTs 1.0."),(0,s.kt)("p",null,"Taking things a step further, another asset could be a random puzzle piece, drawn randomly on purchase from the purchase-block blockhash. This then gives the NFT secondary-market value, along with earning the museum or gallery royalties, because the experience is gamified - visitors now race to collect all the puzzle pieces to compose a master puzzle NFT and win an additional prize like, for example, an exclusive private viewing of an upcoming exhibition."),(0,s.kt)("p",null,"All this is natively supported by the RMRK standards and available today using an NFT 2.0 marketplace such as Singular.app"),(0,s.kt)("hr",null),(0,s.kt)("h2",{id:"training-data"},"Training Data"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},'## Character Progression Systems\n\nThis is an example of Ownership of Experience.\n\nA single character or avatar is a single multi-asset NFT. It can have one or more assets, but the one that matters for the game in question is a Catalog asset (composable).\n\nLet\'s assume that this asset is "Level 1 avatar", and the asset has the following attributes:\n\nStrength: 5\nDexterity: 4\nIntelligence: 3\n\nThe asset also has a head slot, two hand slots, and a body slot, into which NFTs from the "Level 1 items" collection can be equipped.\n\nThis NFT also contains another equippable NFT: the NFT brain which is soulbound 2.0 - meaning locked into the avatar.\n\nThe NFT brain\'s main asset has 2 slots into which other NFTs can be equipped, whitelisted for an NFT collection called "Level 1 Skills".\n\nAs the player interacts with the world, they can collect items (from quests or the world or by crafting), skills (from mentors or as quest rewards), and experience points (from fighting, exploring, crafting...).\n\nItems are transferable, equippable NFTs.\nExperience points are non-transferable markers of experiences.\nSkills are non-transferable NFTs.\nLet\'s assume that after a few play sessions the character has collected:\n\nItems: 1 level 2 sword, 1 level 1 helmet\nSkills: Prospecting 1, Prospecting 2, Swordfighting 1, Crafting 1\nExperience Points: 3 sword XP, 5 crafting XP\n\nLet\'s assume that a character levels up for every 7 skill points burned.\n\nThe character currently cannot equip the level 2 sword because the sword requires a level 2 avatar. They can easily equip the helmet, though, since it is level 1.\n\nThis is specifically possible because of RMRK\'s equippable logic where you can define which collections can be equipped into which slot:\n\n```\nhead: skybreach_collection_headwear_level_1\nhand_left: skybreach_collection_handheld_level_1\nhand_right: skybreach_collection_handheld_level_1\n```\n\nAssuming you need "level" amount of XP to set a skill to the desired level, e.g. to go from 3 to 4 you need 4 XP, the character can upgrade Swordfighting to L2 and Crafting to L3 by burning the relevant XP points (burn the non-transferable skill point NFTs).\n\nTherefore, by burning 2 sword XP and 5 crafting XP, the character now has Swordfighting L2, and Crafting L3, but also burned a total of 7 points which means it gets another asset added: "Level 2 avatar"\n\nThis asset has a different layout of equippables, different settings of what you can equip into which slot:\n\n```\nhead: skybreach_collection_headwear_level_1, skybreach_collection_headwear_level_2\nhand_left: skybreach_collection_handheld_level_1, skybreach_collection_handheld_level_2\nhand_right: skybreach_collection_handheld_level_1, skybreach_collection_handheld_level_2\n```\n\nBecause "level 2 sword" is in the skybreach_collection_handheld_level_2 collection, it is now equippable into either hand. The slots of course remain compatible with level 1 items.\n\nThis is how a character progression system can work for skills, XP points, and changing requirements for items, skills, spells, etc.\n\n## NFTs 2.0 in galleries and museums\n\nIn their current state, museums and galleries have limited use for NFTs. The occasional ticket or simple digital representation of a real life exhibit are just about all the options at their disposal, so the lack of adoption by such institutions does not come as a surprise.\n\nWith NFTs 2.0, specifically multi-asset NFTs, we finally have meaningful utility to offer them.\n\nLet\'s assume we have an exhibit called Mona Lisa. A museum could mint NFTs which simultaneously contain:\n\nThe digital version of the painting\nA short movie about the history of the painting, where it\'s been and where it came from\nA multi-language audio-track for the gallery tour around this particular painting\nA museum-shop voucher for a Mona Lisa high quality poster\n\nThese are not separate NFTs - these are all alternative assets of one NFT. The NFT is made into a rich multi-media experience and is given true utility, versus just being a digital copy of an analog painting as with NFTs 1.0.\n\nTaking things a step further, another asset could be a random puzzle piece, drawn randomly on purchase from the purchase-block blockhash. This then gives the NFT secondary-market value, along with earning the museum or gallery royalties, because the experience is gamified - visitors now race to collect all the puzzle pieces to compose a master puzzle NFT and win an additional prize like, for example, an exclusive private viewing of an upcoming exhibition.\n\nAll this is natively supported by the RMRK standards and available today using an NFT 2.0 marketplace such as Singular.app\n')))}u.isMDXComponent=!0}}]);