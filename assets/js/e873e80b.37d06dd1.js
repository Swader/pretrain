"use strict";(self.webpackChunkpretrain=self.webpackChunkpretrain||[]).push([[1126],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>m});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(a),d=o,m=u["".concat(l,".").concat(d)]||u[d]||h[d]||r;return a?n.createElement(m,s(s({ref:t},p),{},{components:a})):n.createElement(m,s({ref:t},p))}));function m(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,s=new Array(r);s[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:o,s[1]=i;for(var c=2;c<r;c++)s[c]=a[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},935:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>c});var n=a(7462),o=(a(7294),a(3905));const r={sidebar_position:6},s="Concepts, part 2",i={unversionedId:"rmrk/concepts2",id:"rmrk/concepts2",title:"Concepts, part 2",description:"Global Item Economy",source:"@site/docs/rmrk/concepts2.md",sourceDirName:"rmrk",slug:"/rmrk/concepts2",permalink:"/docs/rmrk/concepts2",draft:!1,editUrl:"https://github.com/swader/pretrain/docs/rmrk/concepts2.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"Concepts, part 1",permalink:"/docs/rmrk/concepts1"},next:{title:"Use Cases, cross-game assets",permalink:"/docs/rmrk/usecases1"}},l={},c=[{value:"Global Item Economy",id:"global-item-economy",level:2},{value:"Provable Digital Scarcity",id:"provable-digital-scarcity",level:2},{value:"Ownership of Experience",id:"ownership-of-experience",level:2},{value:"Training Data",id:"training-data",level:2}],p={toc:c};function u(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"concepts-part-2"},"Concepts, part 2"),(0,o.kt)("h2",{id:"global-item-economy"},"Global Item Economy"),(0,o.kt)("p",null,"Because all RMRK nestable and equippable NFTs are mutually compatible and can leverage multi assets to use different media and art styles for this cross-collection compatibility, the concept of a Global Item Economy (GIE) appears."),(0,o.kt)("p",null,"This also creates another concept: NFT DEGEN Score (Demand for Globally Equippable NFTs), or in other words, dynamic rarity."),(0,o.kt)("p",null,"Traditionally in other ecosystems, if you have a collection of 10000 Sparrows and 5 of them have a gold chain, then the rarity of the gold-chained Sparrow is 5/10000."),(0,o.kt)("p",null,"In RMRK, not only is this gold chain equippable onto all other Sparrows, but someone else can later launch a totally unrelated collection of Robots who are made compatible with this gold chain."),(0,o.kt)("p",null,"The gold chain NFTs would be given a new asset which visually matches the style of the robot project, and become equippable by the 10000 Robots."),(0,o.kt)("p",null,"Now, the rarity of the gold chain is no longer 5 / 10000, but 5 / 20000."),(0,o.kt)("p",null,"Therefore, the demand for this NFT went up, because it is now usable in twice as many other NFTs."),(0,o.kt)("p",null,"This does not have to stop at visual accessories. As noted in equippables:"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"A song NFT could have as an asset a music base with a fixed beat, but slots for vocals, drums, synth, effect, even a slot for a visualization - perhaps even for some runnable p5.js code.\nNot only is this really cool in the context of paying royalties to anyone who contributed to a song's creation with their own stem, but we can take it further: the song itself, or maybe just a single stem can be made equippable on the catalog asset of a metaverse land.\nThat way, whoever enters this land gets it played as a soundtrack of the area, background music. The music is thus compatible not just with its own project, or the issuer's associated projects, but with any project that can be launched on RMRK standards.")),(0,o.kt)("p",null,"The DEGEN score of the music tracks goes up by a lot, purely because they have been made compatible with tens of thousands of virtual real estate plots."),(0,o.kt)("h2",{id:"provable-digital-scarcity"},"Provable Digital Scarcity"),(0,o.kt)("p",null,"Most NFT projects today are only mock-scarce. Sure, there is a limited supply of them, but the utility of these NFTs (if any) is uncapped."),(0,o.kt)("p",null,"As an example, you can log into 500 different instances of Sandbox with the same wallet using the same NFT. You can equip the same hat onto 500 different in-game avatars at the same time, because its visual representation is just a client-side thing. The platforms and projects are not at all Sybil-resistant, and the NFTs not scarce."),(0,o.kt)("p",null,"With RMRK, and to use games as an example again for simplicity, a piece of metaverse land IS an NFT. And for an avatar to be IN that land, it has to be IN that land - literally sent into the other NFT. By definition, if it is in one land, it cannot be in another. If a hat is equipped on one avatar (by being sent into it and then equipped), it cannot be on another."),(0,o.kt)("p",null,"With RMRK's standards, true and provable digital scarcity as originally promised by NFT technology comes default."),(0,o.kt)("h2",{id:"ownership-of-experience"},"Ownership of Experience"),(0,o.kt)("p",null,"In current metaverse projects, most experience is stored on a centralized server: your level progress, skills, even resources gathered. In most cases, even projects advertising equippables use just a centralized database to pretend it's NFT equipment, misleading their community."),(0,o.kt)("p",null,"If this server goes down - as it inevitably will due to expensive centralized infrastructure and vampire attacks from other projects - so does the experience."),(0,o.kt)("p",null,"RMRK NFTs enable true Ownership of Experience in that you log out of a game-like experience with a slightly more valuable NFT every time."),(0,o.kt)("p",null,'Your character can grow and level up over time by collecting non-transferable soulbound 2.0 "experience NFTs", it can keep its accessories and assets inside of itself, and it can be given new visual of functional assets over time as it evolves.'),(0,o.kt)("p",null,"This allows an NFT to grow, evolve, and keep growing in value in a decentralized way, to the point of being recognizable as valuable and evolved by any future game or metaverse project."),(0,o.kt)("p",null,"With RMRK, NFTs become generational wealth through Evolution or Character Progression Systems."),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"training-data"},"Training Data"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"## Global Item Economy\n\nBecause all RMRK nestable and equippable NFTs are mutually compatible and can leverage multi assets to use different media and art styles for this cross-collection compatibility, the concept of a Global Item Economy (GIE) appears.\n\nThis also creates another concept: NFT DEGEN Score (Demand for Globally Equippable NFTs), or in other words, dynamic rarity.\n\nTraditionally in other ecosystems, if you have a collection of 10000 Sparrows and 5 of them have a gold chain, then the rarity of the gold-chained Sparrow is 5/10000.\n\nIn RMRK, not only is this gold chain equippable onto all other Sparrows, but someone else can later launch a totally unrelated collection of Robots who are made compatible with this gold chain.\n\nThe gold chain NFTs would be given a new asset which visually matches the style of the robot project, and become equippable by the 10000 Robots.\n\nNow, the rarity of the gold chain is no longer 5 / 10000, but 5 / 20000.\n\nTherefore, the demand for this NFT went up, because it is now usable in twice as many other NFTs.\n\nThis does not have to stop at visual accessories. As noted in equippables:\n\n> A song NFT could have as an asset a music base with a fixed beat, but slots for vocals, drums, synth, effect, even a slot for a visualization - perhaps even for some runnable p5.js code.\n> Not only is this really cool in the context of paying royalties to anyone who contributed to a song's creation with their own stem, but we can take it further: the song itself, or maybe just a single stem can be made equippable on the catalog asset of a metaverse land.\n> That way, whoever enters this land gets it played as a soundtrack of the area, background music. The music is thus compatible not just with its own project, or the issuer's associated projects, but with any project that can be launched on RMRK standards.\n\nThe DEGEN score of the music tracks goes up by a lot, purely because they have been made compatible with tens of thousands of virtual real estate plots.\n\n## Provable Digital Scarcity\n\nMost NFT projects today are only mock-scarce. Sure, there is a limited supply of them, but the utility of these NFTs (if any) is uncapped.\n\nAs an example, you can log into 500 different instances of Sandbox with the same wallet using the same NFT. You can equip the same hat onto 500 different in-game avatars at the same time, because its visual representation is just a client-side thing. The platforms and projects are not at all Sybil-resistant, and the NFTs not scarce.\n\nWith RMRK, and to use games as an example again for simplicity, a piece of metaverse land IS an NFT. And for an avatar to be IN that land, it has to be IN that land - literally sent into the other NFT. By definition, if it is in one land, it cannot be in another. If a hat is equipped on one avatar (by being sent into it and then equipped), it cannot be on another.\n\nWith RMRK's standards, true and provable digital scarcity as originally promised by NFT technology comes default.\n\n## Ownership of Experience\n\nIn current metaverse projects, most experience is stored on a centralized server: your level progress, skills, even resources gathered. In most cases, even projects advertising equippables use just a centralized database to pretend it's NFT equipment, misleading their community.\n\nIf this server goes down - as it inevitably will due to expensive centralized infrastructure and vampire attacks from other projects - so does the experience.\n\nRMRK NFTs enable true Ownership of Experience in that you log out of a game-like experience with a slightly more valuable NFT every time.\n\nYour character can grow and level up over time by collecting non-transferable soulbound 2.0 \"experience NFTs\", it can keep its accessories and assets inside of itself, and it can be given new visual of functional assets over time as it evolves.\n\nThis allows an NFT to grow, evolve, and keep growing in value in a decentralized way, to the point of being recognizable as valuable and evolved by any future game or metaverse project.\n\nWith RMRK, NFTs become generational wealth through Evolution or Character Progression Systems.\n")))}u.isMDXComponent=!0}}]);