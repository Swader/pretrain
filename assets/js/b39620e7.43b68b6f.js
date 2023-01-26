"use strict";(self.webpackChunkpretrain=self.webpackChunkpretrain||[]).push([[9985],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var a=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,s=function(e,t){if(null==e)return{};var n,a,s={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,s=e.mdxType,i=e.originalType,l=e.parentName,d=r(e,["components","mdxType","originalType","parentName"]),u=p(n),m=s,h=u["".concat(l,".").concat(m)]||u[m]||c[m]||i;return n?a.createElement(h,o(o({ref:t},d),{},{components:n})):a.createElement(h,o({ref:t},d))}));function h(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var i=n.length,o=new Array(i);o[0]=m;var r={};for(var l in t)hasOwnProperty.call(t,l)&&(r[l]=t[l]);r.originalType=e,r[u]="string"==typeof e?e:s,o[1]=r;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9247:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>r,toc:()=>p});var a=n(7462),s=(n(7294),n(3905));const i={sidebar_position:18},o="EVM, nestable and multi asset, part 1",r={unversionedId:"rmrk/evm-nma-p1",id:"rmrk/evm-nma-p1",title:"EVM, nestable and multi asset, part 1",description:"Nestable and MultiAsset RMRK legos can be used together to provide more utility to the NFT.",source:"@site/docs/rmrk/evm-nma-p1.md",sourceDirName:"rmrk",slug:"/rmrk/evm-nma-p1",permalink:"/docs/rmrk/evm-nma-p1",draft:!1,editUrl:"https://github.com/swader/pretrain/docs/rmrk/evm-nma-p1.md",tags:[],version:"current",sidebarPosition:18,frontMatter:{sidebar_position:18},sidebar:"tutorialSidebar",previous:{title:"EVM, nestable part 2",permalink:"/docs/rmrk/evm-nestable-p2"},next:{title:"EVM, nestable and multi asset, part 2",permalink:"/docs/rmrk/evm-nma-p2"}},l={},p=[{value:"SimpleNestableMultiAsset",id:"simplenestablemultiasset",level:2},{value:"RMRKNestableMultiAssetImpl",id:"rmrknestablemultiassetimpl",level:2},{value:"mint",id:"mint",level:4},{value:"nestMint",id:"nestmint",level:4},{value:"addAssetToToken",id:"addassettotoken",level:4},{value:"addAssetEntry",id:"addassetentry",level:4},{value:"totalAssets",id:"totalassets",level:4},{value:"transfer",id:"transfer",level:4},{value:"nestTransfer",id:"nesttransfer",level:4},{value:"tokenURI",id:"tokenuri",level:4},{value:"updateRoyaltyRecipient",id:"updateroyaltyrecipient",level:4},{value:"Deploy Script",id:"deploy-script",level:2},{value:"Training Data",id:"training-data",level:2}],d={toc:p};function u(e){let{components:t,...n}=e;return(0,s.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"evm-nestable-and-multi-asset-part-1"},"EVM, nestable and multi asset, part 1"),(0,s.kt)("p",null,"Nestable and MultiAsset RMRK legos can be used together to provide more utility to the NFT."),(0,s.kt)("h2",{id:"simplenestablemultiasset"},"SimpleNestableMultiAsset"),(0,s.kt)("p",null,"The ",(0,s.kt)("inlineCode",{parentName:"p"},"SimpleNestableMultiasset")," example uses the ",(0,s.kt)("inlineCode",{parentName:"p"},"RMRKNestableMultiAssetImpl"),". It is used by using the import statement below the pragma definition:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},'import "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKNestableMultiAssetImpl.sol";\n')),(0,s.kt)("p",null,"Once the ",(0,s.kt)("inlineCode",{parentName:"p"},"RMRKNestableMultiAsset.sol")," is imported into our file, we can set the inheritance of our smart contract:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"contract SimpleNestableMultiAsset is RMRKNestableMultiAssetImpl {\n\n}\n")),(0,s.kt)("p",null,"The ",(0,s.kt)("inlineCode",{parentName:"p"},"RMRKNestableMultiAssetImpl")," implements all of the required functionality of the Nested and MultiAsset RMRK legos. It implements minting of parent NFTS as well as child NFTs. Management of NFT assets is also implemented alongside the classic NFT functionality."),(0,s.kt)("p",null,"WARNING: The ",(0,s.kt)("inlineCode",{parentName:"p"},"RMRKNestableMultiAssetImpl")," only has minimal access control implemented. If you intend to use it, make sure to define your own, otherwise your smart contracts are at risk of unexpected behaviour."),(0,s.kt)("p",null,"The ",(0,s.kt)("inlineCode",{parentName:"p"},"constructor")," in this case accepts no arguments as most of the arguments required to properly initialize RMRKNestableMultiAssetImpl are hardcoded:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"RMRKNestableMultiAssetImpl"),": represents the name argument and sets the name of the collection"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"SNMA"),": represents the ",(0,s.kt)("inlineCode",{parentName:"li"},"symbol")," argument and sets the symbol of the collection"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"ipfs://meta"),": represents the ",(0,s.kt)("inlineCode",{parentName:"li"},"collectionMetadata_")," argument and sets the URI of the collection metadata"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"ipfs://tokenMeta"),": represents the ",(0,s.kt)("inlineCode",{parentName:"li"},"tokenURI_")," argument and sets the base URI of the token metadata")),(0,s.kt)("p",null,"The only available variable to pass to the ",(0,s.kt)("inlineCode",{parentName:"p"},"constructor")," is:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"data"),": struct type of argument providing a number of initialization values, used to avoid initialization transaction being reverted due to passing too many parameters")),(0,s.kt)("p",null,"NOTE: The InitData struct is used to pass the initialization parameters to the implementation smart contract. This is done so that the execution of the deploy transaction doesn't revert because we are trying to pass too many arguments.\nThe InitData struct contains the following fields:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"[\n    erc20TokenAddress,\n    tokenUriIsEnumerable,\n    royaltyRecipient,\n    royaltyPercentageBps, // Expressed in basis points\n    maxSupply,\n    pricePerMint\n]\n")),(0,s.kt)("p",null,"NOTE: Basis points are the smallest supported denomination of percent. In our case this is one hundredth of a percent. This means that 1 basis point equals 0.01% and 10000 basis points equal 100%. So for example, if you want to set royalty percentage to 5%, the royaltyPercentageBps value should be 500."),(0,s.kt)("p",null,"With the arguments passed upon initialization defined, we can add our constructor:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},'    constructor(InitData memory data)\n        RMRKNestableMultiAssetImpl(\n            "SimpleNestableMultiAsset",\n            "SNMA",\n            "ipfs://meta",\n            "ipfs://tokenMeta",\n            data\n        )\n    {}\n')),(0,s.kt)("p",null,"The full contract thus looks like this:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},'// SPDX-License-Identifier: UNLICENSED\npragma solidity ^0.8.16;\n\nimport "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKNestableMultiAssetImpl.sol";\n\ncontract SimpleNestableMultiAsset is RMRKNestableMultiAssetImpl {\n    // NOTE: Additional custom arguments can be added to the constructor based on your needs.\n    constructor(InitData memory data)\n        RMRKNestableMultiAssetImpl(\n            "SimpleNestableMultiAsset",\n            "SNMA",\n            "ipfs://meta",\n            "ipfs://tokenMeta",\n            data\n        )\n    {}\n}\n')),(0,s.kt)("h2",{id:"rmrknestablemultiassetimpl"},"RMRKNestableMultiAssetImpl"),(0,s.kt)("p",null,"Let's take a moment to examine the core of this implementation, the ",(0,s.kt)("inlineCode",{parentName:"p"},"RMRKNestableMultiAssetImpl"),"."),(0,s.kt)("p",null,"It uses ",(0,s.kt)("inlineCode",{parentName:"p"},"RMRKRoyalties"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"RMRKNestableMultiAsset"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"RMRKCollectionMetadata")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"RMRKMintingUtils")," smart contracts from RMRK stack."),(0,s.kt)("p",null,"Two errors are defined:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"error RMRKMintUnderpriced();\nerror RMRKMintZero();\n")),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"RMRKMintUnderpriced()")," is used when not enough value is used when attempting to mint a token and ",(0,s.kt)("inlineCode",{parentName:"p"},"RMRKMintZero()")," is used when attempting to mint 0 tokens."),(0,s.kt)("h4",{id:"mint"},"mint"),(0,s.kt)("p",null,"The mint function is used to mint parent NFTs and accepts two arguments:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"to"),": address type of argument that specifies who should receive the newly minted tokens"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"numToMint"),": uint256 type of argument that specifies how many tokens should be minted")),(0,s.kt)("p",null,"There are a few constraints to this function:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"after minting, the total number of tokens should not exceed the maximum allowed supply"),(0,s.kt)("li",{parentName:"ul"},"attempting to mint 0 tokens is not allowed as it makes no sense to pay for the gas without any effect"),(0,s.kt)("li",{parentName:"ul"},"value should accompany transaction equal to a price per mint multiplied by the ",(0,s.kt)("inlineCode",{parentName:"li"},"numToMint"))),(0,s.kt)("h4",{id:"nestmint"},"nestMint"),(0,s.kt)("p",null,"The nestMint function is used to mint child NFTs to be owned by the parent NFT and accepts three arguments:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"to"),": address type of argument specifying the address of the smart contract to which the parent NFT belongs to"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"numToMint"),": uint256 type of argument specifying the amount of tokens to be minted"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"destinationId"),": uint256 type of argument specifying the ID of the parent NFT to which to mint the child NFT")),(0,s.kt)("p",null,"The constraints of nestMint are similar to the ones set out for mint function."),(0,s.kt)("h4",{id:"addassettotoken"},"addAssetToToken"),(0,s.kt)("p",null,"addAssetToToken is used to add a new asset to the token and accepts three arguments:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"tokenId: uint256 type of argument specifying the ID of the token we are adding asset to"),(0,s.kt)("li",{parentName:"ul"},"assetId: uint64 type of argument specifying the ID of the asset we are adding to the token"),(0,s.kt)("li",{parentName:"ul"},"overwrites: uint64 type of argument specifying the ID of the asset we are overwriting with the desired asset")),(0,s.kt)("h4",{id:"addassetentry"},"addAssetEntry"),(0,s.kt)("p",null,"The ",(0,s.kt)("inlineCode",{parentName:"p"},"addAssetEntry")," function is used to add a new URI for the new asset of the token and accepts one argument:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"metadataURI"),": string type of argument specifying the metadata URI of a new asset")),(0,s.kt)("h4",{id:"totalassets"},"totalAssets"),(0,s.kt)("p",null,"The totalAssets function is used to retrieve a total number of assets defined in the collection."),(0,s.kt)("h4",{id:"transfer"},"transfer"),(0,s.kt)("p",null,"The transfer function is used to transfer one token from one account to another and accepts two arguments:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"to"),": address type of argument specifying the address of the account to which the token should be transferred to"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"tokenId"),": uint256 type of argument specifying the token ID of the token to be transferred")),(0,s.kt)("h4",{id:"nesttransfer"},"nestTransfer"),(0,s.kt)("p",null,"The nestTransfer is used to transfer the NFT to another NFT residing in a specified contract. It can only be called by a direct owner or a parent NFT's smart contract or a caller that was given the allowance. This will nest the given NFT into the specified one. It accepts three arguments:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"to"),": address type of argument specifying the address of the intended parent NFT's smart contract"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"tokenId"),": uint256 type of argument specifying the ID of the token we want to send to be nested"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"destinationId"),": uint256 type of argument specifying the ID of the intended parent token NFT")),(0,s.kt)("h4",{id:"tokenuri"},"tokenURI"),(0,s.kt)("p",null,"The tokenURI is used to retrieve the metadata URI of the desired token and accepts one argument:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"tokenId"),": uint256 type of argument representing the token ID of which we are retrieving the URI")),(0,s.kt)("h4",{id:"updateroyaltyrecipient"},"updateRoyaltyRecipient"),(0,s.kt)("p",null,"The updateRoyaltyRecipient function is used to update the royalty recipient and accepts one argument:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"newRoyaltyRecipient"),": address type of argument specifying the address of the new beneficiary recipient")),(0,s.kt)("h2",{id:"deploy-script"},"Deploy Script"),(0,s.kt)("p",null,"The deploy script for the ",(0,s.kt)("inlineCode",{parentName:"p"},"SimpleNestableMultiAsset")," smart contract resides in the ",(0,s.kt)("inlineCode",{parentName:"p"},"deployNestableMultiAsset.ts"),".\nThe script uses the ",(0,s.kt)("inlineCode",{parentName:"p"},"ethers"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"SimpleNestable")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"ContractTransaction")," imports. The empty deploy script should look like this:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},'import { ethers } from "hardhat";\nimport { SimpleNestable } from "../typechain-types";\nimport { ContractTransaction } from "ethers";\n\nasync function main() {\n\n}\n\nmain().catch((error) => {\n  console.error(error);\n  process.exitCode = 1;\n});\n')),(0,s.kt)("p",null,"Before we can deploy the parent and child smart contracts, we should prepare the constants that we will use in the script:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},'  const pricePerMint = ethers.utils.parseEther("0.0000000001");\n  const totalTokens = 5;\n  const [owner] = await ethers.getSigners();\n')),(0,s.kt)("p",null,"Now that the constants are ready, we can deploy the smart contract and log the addresses of the contracts to the console:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},'  const contractFactory = await ethers.getContractFactory(\n    "SimpleNestableMultiAsset"\n  );\n  const token: SimpleNestableMultiAsset = await contractFactory.deploy(\n    {\n      erc20TokenAddress: ethers.constants.AddressZero,\n      tokenUriIsEnumerable: true,\n      royaltyRecipient: await owner.getAddress(),\n      royaltyPercentageBps: 10,\n      maxSupply: 1000,\n      pricePerMint: pricePerMint\n    }\n  );\n\n  await token.deployed();\n  console.log(`Sample contract deployed to ${token.address}`);\n')),(0,s.kt)("p",null,"A custom script added to ",(0,s.kt)("inlineCode",{parentName:"p"},"package.json")," allows us to easily run the script:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},'  "scripts": {\n    "deploy-nestable-multi-asset": "hardhat run scripts/deployNestableMultiAsset.ts"\n  }\n')),(0,s.kt)("p",null,"Using the script with ",(0,s.kt)("inlineCode",{parentName:"p"},"npm run deploy-nestable-multi-asset")," should return the following output:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"npm run deploy-nestable-multi-asset\n\n> @rmrk-team/evm-contract-samples@0.1.0 deploy-nestable-multi-asset\n> hardhat run scripts/deployNestableMultiAsset.ts\n\nSample contract deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3\n")),(0,s.kt)("hr",null),(0,s.kt)("h2",{id:"training-data"},"Training Data"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},'Nestable and MultiAsset RMRK legos can be used together to provide more utility to the NFT.\n\n## SimpleNestableMultiAsset\n\nThe `SimpleNestableMultiasset` example uses the `RMRKNestableMultiAssetImpl`. It is used by using the import statement below the pragma definition:\n\n```\nimport "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKNestableMultiAssetImpl.sol";\n```\n\nOnce the `RMRKNestableMultiAsset.sol` is imported into our file, we can set the inheritance of our smart contract:\n\n```\ncontract SimpleNestableMultiAsset is RMRKNestableMultiAssetImpl {\n\n}\n```\n\nThe `RMRKNestableMultiAssetImpl` implements all of the required functionality of the Nested and MultiAsset RMRK legos. It implements minting of parent NFTS as well as child NFTs. Management of NFT assets is also implemented alongside the classic NFT functionality.\n\nWARNING: The `RMRKNestableMultiAssetImpl` only has minimal access control implemented. If you intend to use it, make sure to define your own, otherwise your smart contracts are at risk of unexpected behaviour.\n\nThe `constructor` in this case accepts no arguments as most of the arguments required to properly initialize RMRKNestableMultiAssetImpl are hardcoded:\n\n- `RMRKNestableMultiAssetImpl`: represents the name argument and sets the name of the collection\n- `SNMA`: represents the `symbol` argument and sets the symbol of the collection\n- `ipfs://meta`: represents the `collectionMetadata_` argument and sets the URI of the collection metadata\n- `ipfs://tokenMeta`: represents the `tokenURI_` argument and sets the base URI of the token metadata\n\nThe only available variable to pass to the `constructor` is:\n\n- `data`: struct type of argument providing a number of initialization values, used to avoid initialization transaction being reverted due to passing too many parameters\n\nNOTE: The InitData struct is used to pass the initialization parameters to the implementation smart contract. This is done so that the execution of the deploy transaction doesn\'t revert because we are trying to pass too many arguments.\nThe InitData struct contains the following fields:\n\n```\n[\n    erc20TokenAddress,\n    tokenUriIsEnumerable,\n    royaltyRecipient,\n    royaltyPercentageBps, // Expressed in basis points\n    maxSupply,\n    pricePerMint\n]\n```\n\nNOTE: Basis points are the smallest supported denomination of percent. In our case this is one hundredth of a percent. This means that 1 basis point equals 0.01% and 10000 basis points equal 100%. So for example, if you want to set royalty percentage to 5%, the royaltyPercentageBps value should be 500.\n\nWith the arguments passed upon initialization defined, we can add our constructor:\n\n```\n    constructor(InitData memory data)\n        RMRKNestableMultiAssetImpl(\n            "SimpleNestableMultiAsset",\n            "SNMA",\n            "ipfs://meta",\n            "ipfs://tokenMeta",\n            data\n        )\n    {}\n```\n\nThe full contract thus looks like this:\n\n```\n// SPDX-License-Identifier: UNLICENSED\npragma solidity ^0.8.16;\n\nimport "@rmrk-team/evm-contracts/contracts/implementations/nativeTokenPay/RMRKNestableMultiAssetImpl.sol";\n\ncontract SimpleNestableMultiAsset is RMRKNestableMultiAssetImpl {\n    // NOTE: Additional custom arguments can be added to the constructor based on your needs.\n    constructor(InitData memory data)\n        RMRKNestableMultiAssetImpl(\n            "SimpleNestableMultiAsset",\n            "SNMA",\n            "ipfs://meta",\n            "ipfs://tokenMeta",\n            data\n        )\n    {}\n}\n```\n\n## RMRKNestableMultiAssetImpl\n\nLet\'s take a moment to examine the core of this implementation, the `RMRKNestableMultiAssetImpl`.\n\nIt uses `RMRKRoyalties`, `RMRKNestableMultiAsset`, `RMRKCollectionMetadata` and `RMRKMintingUtils` smart contracts from RMRK stack.\n\nTwo errors are defined:\n\n```\nerror RMRKMintUnderpriced();\nerror RMRKMintZero();\n```\n\n`RMRKMintUnderpriced()` is used when not enough value is used when attempting to mint a token and `RMRKMintZero()` is used when attempting to mint 0 tokens.\n\n#### mint\n\nThe mint function is used to mint parent NFTs and accepts two arguments:\n- `to`: address type of argument that specifies who should receive the newly minted tokens\n- `numToMint`: uint256 type of argument that specifies how many tokens should be minted\n\nThere are a few constraints to this function:\n- after minting, the total number of tokens should not exceed the maximum allowed supply\n- attempting to mint 0 tokens is not allowed as it makes no sense to pay for the gas without any effect\n- value should accompany transaction equal to a price per mint multiplied by the `numToMint`\n\n#### nestMint\n\nThe nestMint function is used to mint child NFTs to be owned by the parent NFT and accepts three arguments:\n- `to`: address type of argument specifying the address of the smart contract to which the parent NFT belongs to\n- `numToMint`: uint256 type of argument specifying the amount of tokens to be minted\n- `destinationId`: uint256 type of argument specifying the ID of the parent NFT to which to mint the child NFT\n\nThe constraints of nestMint are similar to the ones set out for mint function.\n\n#### addAssetToToken\n\naddAssetToToken is used to add a new asset to the token and accepts three arguments:\n- tokenId: uint256 type of argument specifying the ID of the token we are adding asset to\n- assetId: uint64 type of argument specifying the ID of the asset we are adding to the token\n- overwrites: uint64 type of argument specifying the ID of the asset we are overwriting with the desired asset\n\n#### addAssetEntry\nThe `addAssetEntry` function is used to add a new URI for the new asset of the token and accepts one argument:\n- `metadataURI`: string type of argument specifying the metadata URI of a new asset\n\n#### totalAssets\nThe totalAssets function is used to retrieve a total number of assets defined in the collection.\n\n#### transfer\nThe transfer function is used to transfer one token from one account to another and accepts two arguments:\n- `to`: address type of argument specifying the address of the account to which the token should be transferred to\n- `tokenId`: uint256 type of argument specifying the token ID of the token to be transferred\n\n#### nestTransfer\nThe nestTransfer is used to transfer the NFT to another NFT residing in a specified contract. It can only be called by a direct owner or a parent NFT\'s smart contract or a caller that was given the allowance. This will nest the given NFT into the specified one. It accepts three arguments:\n- `to`: address type of argument specifying the address of the intended parent NFT\'s smart contract\n- `tokenId`: uint256 type of argument specifying the ID of the token we want to send to be nested\n- `destinationId`: uint256 type of argument specifying the ID of the intended parent token NFT\n\n#### tokenURI\nThe tokenURI is used to retrieve the metadata URI of the desired token and accepts one argument:\n- `tokenId`: uint256 type of argument representing the token ID of which we are retrieving the URI\n\n#### updateRoyaltyRecipient\nThe updateRoyaltyRecipient function is used to update the royalty recipient and accepts one argument:\n- `newRoyaltyRecipient`: address type of argument specifying the address of the new beneficiary recipient\n\n## Deploy Script\n\nThe deploy script for the `SimpleNestableMultiAsset` smart contract resides in the `deployNestableMultiAsset.ts`.\nThe script uses the `ethers`, `SimpleNestable` and `ContractTransaction` imports. The empty deploy script should look like this:\n\n```\nimport { ethers } from "hardhat";\nimport { SimpleNestable } from "../typechain-types";\nimport { ContractTransaction } from "ethers";\n\nasync function main() {\n\n}\n\nmain().catch((error) => {\n  console.error(error);\n  process.exitCode = 1;\n});\n```\n\nBefore we can deploy the parent and child smart contracts, we should prepare the constants that we will use in the script:\n\n```\n  const pricePerMint = ethers.utils.parseEther("0.0000000001");\n  const totalTokens = 5;\n  const [owner] = await ethers.getSigners();\n```\n\nNow that the constants are ready, we can deploy the smart contract and log the addresses of the contracts to the console:\n\n```\n  const contractFactory = await ethers.getContractFactory(\n    "SimpleNestableMultiAsset"\n  );\n  const token: SimpleNestableMultiAsset = await contractFactory.deploy(\n    {\n      erc20TokenAddress: ethers.constants.AddressZero,\n      tokenUriIsEnumerable: true,\n      royaltyRecipient: await owner.getAddress(),\n      royaltyPercentageBps: 10,\n      maxSupply: 1000,\n      pricePerMint: pricePerMint\n    }\n  );\n\n  await token.deployed();\n  console.log(`Sample contract deployed to ${token.address}`);\n```\n\nA custom script added to `package.json` allows us to easily run the script:\n\n```\n  "scripts": {\n    "deploy-nestable-multi-asset": "hardhat run scripts/deployNestableMultiAsset.ts"\n  }\n```\n\nUsing the script with `npm run deploy-nestable-multi-asset` should return the following output:\n\n```\nnpm run deploy-nestable-multi-asset\n\n> @rmrk-team/evm-contract-samples@0.1.0 deploy-nestable-multi-asset\n> hardhat run scripts/deployNestableMultiAsset.ts\n\nSample contract deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3\n```\n')))}u.isMDXComponent=!0}}]);