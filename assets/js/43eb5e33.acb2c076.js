"use strict";(self.webpackChunkpretrain=self.webpackChunkpretrain||[]).push([[9924],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>m});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=a.createContext({}),d=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=d(e.components);return a.createElement(l.Provider,{value:n},e.children)},h="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),h=d(t),u=r,m=h["".concat(l,".").concat(u)]||h[u]||p[u]||o;return t?a.createElement(m,i(i({ref:n},c),{},{components:t})):a.createElement(m,i({ref:n},c))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=u;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[h]="string"==typeof e?e:r,i[1]=s;for(var d=2;d<o;d++)i[d]=t[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},1459:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>d});var a=t(7462),r=(t(7294),t(3905));const o={sidebar_position:17},i="EVM, nestable part 2",s={unversionedId:"rmrk/evm-nestable-p2",id:"rmrk/evm-nestable-p2",title:"EVM, nestable part 2",description:"User Journey",source:"@site/docs/rmrk/evm-nestable-p2.md",sourceDirName:"rmrk",slug:"/rmrk/evm-nestable-p2",permalink:"/docs/rmrk/evm-nestable-p2",draft:!1,editUrl:"https://github.com/swader/pretrain/docs/rmrk/evm-nestable-p2.md",tags:[],version:"current",sidebarPosition:17,frontMatter:{sidebar_position:17},sidebar:"tutorialSidebar",previous:{title:"EVM, nestable part 1",permalink:"/docs/rmrk/evm-nestable-p1"},next:{title:"EVM, nestable and multi asset, part 1",permalink:"/docs/rmrk/evm-nma-p1"}},l={},d=[{value:"User Journey",id:"user-journey",level:2},{value:"AdvancedNestable",id:"advancednestable",level:2},{value:"Training Data",id:"training-data",level:2}],c={toc:d};function h(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"evm-nestable-part-2"},"EVM, nestable part 2"),(0,r.kt)("h2",{id:"user-journey"},"User Journey"),(0,r.kt)("p",null,"With the deploy script ready, we can examine how the journey of a user using nestable would look like using these two smart contracts."),(0,r.kt)("p",null,"The base of it is the same as the deploy script, as we need to deploy the smart contracts in order to interact with them:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'import { ethers } from "hardhat";\nimport { SimpleNestable } from "../typechain-types";\nimport { ContractTransaction } from "ethers";\n\nasync function main() {\n  const pricePerMint = ethers.utils.parseEther("0.0001");\n  const totalTokens = 5;\n  const [owner] = await ethers.getSigners();\n\n  const contractFactory = await ethers.getContractFactory("SimpleNestable");\n  const parent: SimpleNestable = await contractFactory.deploy(\n    "Kanaria",\n    "KAN",\n    "ipfs://collectionMeta",\n    "ipfs://tokenMeta",\n    {\n      erc20TokenAddress: ethers.constants.AddressZero,\n      tokenUriIsEnumerable: true,\n      royaltyRecipient: await owner.getAddress(),\n      royaltyPercentageBps: 10,\n      maxSupply: 1000,\n      pricePerMint: pricePerMint\n    }\n  );\n  const child: SimpleNestable = await contractFactory.deploy(\n    "Chunky",\n    "CHN",\n    "ipfs://collectionMeta",\n    "ipfs://tokenMeta",\n    {\n      erc20TokenAddress: ethers.constants.AddressZero,\n      tokenUriIsEnumerable: true,\n      royaltyRecipient: await owner.getAddress(),\n      royaltyPercentageBps: 10,\n      maxSupply: 1000,\n      pricePerMint: pricePerMint\n    }\n  );\n\n  await parent.deployed();\n  await child.deployed();\n  console.log(\n    `Sample contracts deployed to ${parent.address} and ${child.address}`\n  );\n}\n\nmain().catch((error) => {\n  console.error(error);\n  process.exitCode = 1;\n});\n')),(0,r.kt)("p",null,"First thing that needs to be done after the smart contracts are deployed is to mint the NFTs. Minting the parent NFT is a straightforward process. We will use the ",(0,r.kt)("inlineCode",{parentName:"p"},"totalTokens")," constant in order to specify how many of the parent tokens to mint:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'  console.log("Minting parent NFTs");\n  let tx = await parent.mint(owner.address, totalTokens, {\n    value: pricePerMint.mul(totalTokens),\n  });\n  await tx.wait();\n  console.log("Minted totalTokens tokens");\n  let totalSupply = await parent.totalSupply();\n  console.log("Total parent tokens: %s", totalSupply);\n')),(0,r.kt)("p",null,"Minting child NFTs that should be nested is a different process. We will mint 2 nested NFTs for each parent NFT. If we examine the ",(0,r.kt)("inlineCode",{parentName:"p"},"nestMint")," call that is being prepared, we can see that the first argument is the parent smart contract address, the second one is the amount of child NFTs to be nested to the given token and third is the ID of the parent token to which to nest the child. In this script, we will build a set of transactions to mint the nested tokens and then send them once they are all ready:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'  console.log("Minting child NFTs");\n  let allTx: ContractTransaction[] = [];\n  for (let i = 1; i <= totalTokens; i++) {\n    let tx = await child.nestMint(parent.address, 2, i, {\n      value: pricePerMint.mul(2),\n    });\n    allTx.push(tx);\n  }\n  console.log("Added 2 chunkies per kanaria");\n  console.log("Awaiting for all tx to finish...");\n  await Promise.all(allTx.map((tx) => tx.wait()));\n\n  totalSupply = await child.totalSupply();\n  console.log("Total child tokens: %s", totalSupply);\n')),(0,r.kt)("p",null,"Once the child NFTs are minted, we can examine the difference between ",(0,r.kt)("inlineCode",{parentName:"p"},"ownerOf")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"directOwnerOf")," functions. The former should return the address of the root owner (which should be the owner's address in our case) and the latter should return the array of values related to intended parent. The array is structured like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"[\n  address of the owner,\n  token ID of the parent NFT,\n  isNft boolean value\n]\n")),(0,r.kt)("p",null,"In our case, the address of the owner should equal the parent token's smart contract, the ID should equal the parent NFT's ID and the boolean value of ",(0,r.kt)("inlineCode",{parentName:"p"},"isNft")," should be set to true. If we would be calling the ",(0,r.kt)("inlineCode",{parentName:"p"},"directOwnerOf")," one the parent NFT, the owner should be the same as the one returned from the ",(0,r.kt)("inlineCode",{parentName:"p"},"ownerOf"),", ID should equal 0 and the ",(0,r.kt)("inlineCode",{parentName:"p"},"isNft")," value should be set to ",(0,r.kt)("inlineCode",{parentName:"p"},"false"),". The section covering these calls should look like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'  console.log("Inspecting child NFT with the ID of 1");\n  let parentId = await child.ownerOf(1);\n  let rmrkParent = await child.directOwnerOf(1);\n  console.log("Chunky\'s id 1 owner  is ", parentId);\n  console.log("Chunky\'s id 1 rmrk owner is ", rmrkParent);\n  console.log("Parent address: ", parent.address);\n')),(0,r.kt)("p",null,"For the nestable process to be completed, the ",(0,r.kt)("inlineCode",{parentName:"p"},"acceptChild")," method should be called on the parent NFT:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'  console.log("Accepting the fist child NFT for the parent NFT with ID 1");\n  tx = await parent.acceptChild(1, 0, child.address, 1);\n  await tx.wait();\n')),(0,r.kt)("p",null,"The section of the script above accepted the child NFT with the ID of 1 at the index 0 for the parent NFT with the ID of 1 in the parent NFT's smart contract."),(0,r.kt)("p",null,"NOTE: When accepting the nested NFTs, the index of the pending NFT represents its index in a FIFO like stack. So having 2 NFTs in the pending stack, and accepting the one with the index of 0 will move the next one to this spot. Accepting the second NFT from the stack, after the first one was already accepted, should then be done by accepting the pending NFT with index of 0. So two identical calls in succession should accept both pending NFTs."),(0,r.kt)("p",null,"The parent NFT with ID 1 now has one accepted and one pending child NFTs. We can examine both using the childrenOf and pendingChildren methods:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'  console.log("Exaimning accepted and pending children of parent NFT with ID 1");\n  console.log("Children: ", await parent.childrenOf(1));\n  console.log("Pending: ", await parent.pendingChildrenOf(1));\n')),(0,r.kt)("p",null,"Both of these methods return the array of tokens contained in the list, be it for child NFTs or for pending NFTs. The array contains two values:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"contractAddress")," is the address of the child NFT's smart contract"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"tokenId")," is the ID of the child NFT in its smart contract")),(0,r.kt)("p",null,"Once the NFT is nested, it can also be unnested. When doing so, the owner of the token should be specified, as they will be the ones owning the token from that point on (or until they nest or sell it). Additionally pending status has to be passed, as the procedure to unnest differs for the NFTs that have already been accepted from those that are still pending (passing false indicates that the child NFT has already been nested). We will remove the nested NFT with nestable ID of 0 from the parent NFT with ID 1:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'  console.log("Removing the nested NFT from the parent token with the ID of 1");\n  tx = await parent.transferChild(1, owner.address, 0, 0, child.address, 1, false, "0x");\n  await tx.wait();\n')),(0,r.kt)("p",null,"NOTE: Unnesting the child NFT is done in the similar manner as accepting a pending child NFT. Once the nested NFT at ID 0 has been unnested the following NFT's IDs are reduced by 1."),(0,r.kt)("p",null,"Finally, let's observe the child NFT that we just unnested. We will use the ownerOf and directOwnerOf methods to observe it:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'  parentId = await child.ownerOf(1);\n  rmrkParent = await child.directOwnerOf(1);\n  console.log("Chunky\'s id 1 parent is ", parentId);\n  console.log("Chunky\'s id 1 rmrk owner is ", rmrkParent);\n')),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"directOwnerOf")," should return the address of the owner and the ID should be 0 as well as ",(0,r.kt)("inlineCode",{parentName:"p"},"isNft")," should be ",(0,r.kt)("inlineCode",{parentName:"p"},"false"),"."),(0,r.kt)("p",null,"With the user journey script concluded, we can add a custom helper to the ",(0,r.kt)("inlineCode",{parentName:"p"},"package.json")," to make running it easier:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'    "user-journey-nestable": "hardhat run scripts/nestableUserJourney.ts"\n')),(0,r.kt)("p",null,"Running it using ",(0,r.kt)("inlineCode",{parentName:"p"},"npm run user-journey-nestable")," should return the following output:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"npm run user-journey-nestable\n\n> @rmrk-team/evm-contract-samples@0.1.0 user-journey-nestable\n> hardhat run scripts/nestableUserJourney.ts\n\nSample contracts deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3 and 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512\nMinting parent NFTs\nMinted totalTokens tokens\nTotal parent tokens: 5\nMinting child NFTs\nAdded 2 chunkies per kanaria\nAwaiting for all tx to finish...\nTotal child tokens: 10\nInspecting child NFT with the ID of 1\nChunky's id 1 owner  is  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266\nChunky's id 1 rmrk owner is  [\n  '0x5FbDB2315678afecb367f032d93F642f64180aa3',\n  BigNumber { value: \"1\" },\n  true\n]\nParent address:  0x5FbDB2315678afecb367f032d93F642f64180aa3\nAccepting the fist child NFT for the parent NFT with ID 1\nExaimning accepted and pending children of parent NFT with ID 1\nChildren:  [\n  [\n    BigNumber { value: \"1\" },\n    '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',\n    tokenId: BigNumber { value: \"1\" },\n    contractAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'\n  ]\n]\nPending:  [\n  [\n    BigNumber { value: \"2\" },\n    '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',\n    tokenId: BigNumber { value: \"2\" },\n    contractAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'\n  ]\n]\nRemoving the nested NFT from the parent token with the ID of 1\nChunky's id 1 parent is  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266\nChunky's id 1 rmrk owner is  [\n  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',\n  BigNumber { value: \"0\" },\n  false\n]\n")),(0,r.kt)("p",null,"This concludes our work on the ",(0,r.kt)("inlineCode",{parentName:"p"},"SimpleNestable.sol"),". We can now move on to examining the ",(0,r.kt)("inlineCode",{parentName:"p"},"AdvancedNestable.sol"),"."),(0,r.kt)("h2",{id:"advancednestable"},"AdvancedNestable"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"AdvancedNestable")," smart contract allows for more flexibility when using the nestable lego. It implements minimum required implementation in order to be compatible with RMRK nestable, but leaves more business logic implementation freedom to the developer. It uses the ",(0,r.kt)("inlineCode",{parentName:"p"},"RMRKNestable.sol")," import to gain access to the ",(0,r.kt)("inlineCode",{parentName:"p"},"Nestable")," lego:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'import "@rmrk-team/evm-contracts/contracts/RMRK/nestable/RMRKNestable.sol";\n')),(0,r.kt)("p",null,"We only need ",(0,r.kt)("inlineCode",{parentName:"p"},"name")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"symbol")," of the NFT in order to properly initialize it after the ",(0,r.kt)("inlineCode",{parentName:"p"},"AdvancedNestable")," inherits it:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"contract AdvancedNestable is RMRKNestable {\n    // NOTE: Additional custom arguments can be added to the constructor based on your needs.\n    constructor(\n        string memory name,\n        string memory symbol\n    )\n        RMRKNestable(name, symbol)\n    {\n        // Custom optional: constructor logic\n    }\n}\n")),(0,r.kt)("p",null,"The full code is thus:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'// SPDX-License-Identifier: Apache-2.0\n\npragma solidity ^0.8.16;\n\nimport "@rmrk-team/evm-contracts/contracts/RMRK/nestable/RMRKNestable.sol";\n\n\ncontract AdvancedNestable is RMRKNestable {\n    // NOTE: Additional custom arguments can be added to the constructor based on your needs.\n    constructor(\n        string memory name,\n        string memory symbol\n    )\n        RMRKNestable(name, symbol)\n    {\n        // Custom optional: constructor logic\n    }\n}\n')),(0,r.kt)("p",null,"Using ",(0,r.kt)("inlineCode",{parentName:"p"},"RMRKNestable")," requires custom implementation of minting logic. Available internal functions to use when writing it are:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"_mint(address to, uint256 tokenId)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"_safeMint(address to, uint256 tokenId)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"_safeMint(address to, uint256 tokenId, bytes memory data)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"_nestMint(address to, uint256 tokenId, uint256 destinationId)"))),(0,r.kt)("p",null,"The latter is used to nest mint the NFT directly to the parent NFT. If you intend to support it at the minting stage, you should implement it in your smart contract."),(0,r.kt)("p",null,"In addition to the minting functions, you should also implement the burning and transfer functions if they apply to your use case:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"_burn(uint256 tokenId)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"transferFrom(address from, address to, uint256 tokenId)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"nestTransfer(address from, address to, uint256 tokenId, uint256 destinationId)"))),(0,r.kt)("p",null,"Any additional function supporting your NFT use case and utility can also be added. Remember to thoroughly test your smart contracts with extensive test suites and define strict access control rules for the functions that you implement."),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"training-data"},"Training Data"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'## User Journey\n\nWith the deploy script ready, we can examine how the journey of a user using nestable would look like using these two smart contracts.\n\nThe base of it is the same as the deploy script, as we need to deploy the smart contracts in order to interact with them:\n\n```\nimport { ethers } from "hardhat";\nimport { SimpleNestable } from "../typechain-types";\nimport { ContractTransaction } from "ethers";\n\nasync function main() {\n  const pricePerMint = ethers.utils.parseEther("0.0001");\n  const totalTokens = 5;\n  const [owner] = await ethers.getSigners();\n\n  const contractFactory = await ethers.getContractFactory("SimpleNestable");\n  const parent: SimpleNestable = await contractFactory.deploy(\n    "Kanaria",\n    "KAN",\n    "ipfs://collectionMeta",\n    "ipfs://tokenMeta",\n    {\n      erc20TokenAddress: ethers.constants.AddressZero,\n      tokenUriIsEnumerable: true,\n      royaltyRecipient: await owner.getAddress(),\n      royaltyPercentageBps: 10,\n      maxSupply: 1000,\n      pricePerMint: pricePerMint\n    }\n  );\n  const child: SimpleNestable = await contractFactory.deploy(\n    "Chunky",\n    "CHN",\n    "ipfs://collectionMeta",\n    "ipfs://tokenMeta",\n    {\n      erc20TokenAddress: ethers.constants.AddressZero,\n      tokenUriIsEnumerable: true,\n      royaltyRecipient: await owner.getAddress(),\n      royaltyPercentageBps: 10,\n      maxSupply: 1000,\n      pricePerMint: pricePerMint\n    }\n  );\n\n  await parent.deployed();\n  await child.deployed();\n  console.log(\n    `Sample contracts deployed to ${parent.address} and ${child.address}`\n  );\n}\n\nmain().catch((error) => {\n  console.error(error);\n  process.exitCode = 1;\n});\n```\n\nFirst thing that needs to be done after the smart contracts are deployed is to mint the NFTs. Minting the parent NFT is a straightforward process. We will use the `totalTokens` constant in order to specify how many of the parent tokens to mint:\n\n```\n  console.log("Minting parent NFTs");\n  let tx = await parent.mint(owner.address, totalTokens, {\n    value: pricePerMint.mul(totalTokens),\n  });\n  await tx.wait();\n  console.log("Minted totalTokens tokens");\n  let totalSupply = await parent.totalSupply();\n  console.log("Total parent tokens: %s", totalSupply);\n```\n\nMinting child NFTs that should be nested is a different process. We will mint 2 nested NFTs for each parent NFT. If we examine the `nestMint` call that is being prepared, we can see that the first argument is the parent smart contract address, the second one is the amount of child NFTs to be nested to the given token and third is the ID of the parent token to which to nest the child. In this script, we will build a set of transactions to mint the nested tokens and then send them once they are all ready:\n\n```\n  console.log("Minting child NFTs");\n  let allTx: ContractTransaction[] = [];\n  for (let i = 1; i <= totalTokens; i++) {\n    let tx = await child.nestMint(parent.address, 2, i, {\n      value: pricePerMint.mul(2),\n    });\n    allTx.push(tx);\n  }\n  console.log("Added 2 chunkies per kanaria");\n  console.log("Awaiting for all tx to finish...");\n  await Promise.all(allTx.map((tx) => tx.wait()));\n\n  totalSupply = await child.totalSupply();\n  console.log("Total child tokens: %s", totalSupply);\n```\n\nOnce the child NFTs are minted, we can examine the difference between `ownerOf` and `directOwnerOf` functions. The former should return the address of the root owner (which should be the owner\'s address in our case) and the latter should return the array of values related to intended parent. The array is structured like this:\n\n```\n[\n  address of the owner,\n  token ID of the parent NFT,\n  isNft boolean value\n]\n```\n\nIn our case, the address of the owner should equal the parent token\'s smart contract, the ID should equal the parent NFT\'s ID and the boolean value of `isNft` should be set to true. If we would be calling the `directOwnerOf` one the parent NFT, the owner should be the same as the one returned from the `ownerOf`, ID should equal 0 and the `isNft` value should be set to `false`. The section covering these calls should look like this:\n\n```\n  console.log("Inspecting child NFT with the ID of 1");\n  let parentId = await child.ownerOf(1);\n  let rmrkParent = await child.directOwnerOf(1);\n  console.log("Chunky\'s id 1 owner  is ", parentId);\n  console.log("Chunky\'s id 1 rmrk owner is ", rmrkParent);\n  console.log("Parent address: ", parent.address);\n```\n\nFor the nestable process to be completed, the `acceptChild` method should be called on the parent NFT:\n\n```\n  console.log("Accepting the fist child NFT for the parent NFT with ID 1");\n  tx = await parent.acceptChild(1, 0, child.address, 1);\n  await tx.wait();\n```\n\nThe section of the script above accepted the child NFT with the ID of 1 at the index 0 for the parent NFT with the ID of 1 in the parent NFT\'s smart contract.\n\nNOTE: When accepting the nested NFTs, the index of the pending NFT represents its index in a FIFO like stack. So having 2 NFTs in the pending stack, and accepting the one with the index of 0 will move the next one to this spot. Accepting the second NFT from the stack, after the first one was already accepted, should then be done by accepting the pending NFT with index of 0. So two identical calls in succession should accept both pending NFTs.\n\nThe parent NFT with ID 1 now has one accepted and one pending child NFTs. We can examine both using the childrenOf and pendingChildren methods:\n\n```\n  console.log("Exaimning accepted and pending children of parent NFT with ID 1");\n  console.log("Children: ", await parent.childrenOf(1));\n  console.log("Pending: ", await parent.pendingChildrenOf(1));\n```\n\nBoth of these methods return the array of tokens contained in the list, be it for child NFTs or for pending NFTs. The array contains two values:\n\n- `contractAddress` is the address of the child NFT\'s smart contract\n- `tokenId` is the ID of the child NFT in its smart contract\n\nOnce the NFT is nested, it can also be unnested. When doing so, the owner of the token should be specified, as they will be the ones owning the token from that point on (or until they nest or sell it). Additionally pending status has to be passed, as the procedure to unnest differs for the NFTs that have already been accepted from those that are still pending (passing false indicates that the child NFT has already been nested). We will remove the nested NFT with nestable ID of 0 from the parent NFT with ID 1:\n\n```\n  console.log("Removing the nested NFT from the parent token with the ID of 1");\n  tx = await parent.transferChild(1, owner.address, 0, 0, child.address, 1, false, "0x");\n  await tx.wait();\n```\n\nNOTE: Unnesting the child NFT is done in the similar manner as accepting a pending child NFT. Once the nested NFT at ID 0 has been unnested the following NFT\'s IDs are reduced by 1.\n\nFinally, let\'s observe the child NFT that we just unnested. We will use the ownerOf and directOwnerOf methods to observe it:\n\n```\n  parentId = await child.ownerOf(1);\n  rmrkParent = await child.directOwnerOf(1);\n  console.log("Chunky\'s id 1 parent is ", parentId);\n  console.log("Chunky\'s id 1 rmrk owner is ", rmrkParent);\n```\n\nThe `directOwnerOf` should return the address of the owner and the ID should be 0 as well as `isNft` should be `false`.\n\nWith the user journey script concluded, we can add a custom helper to the `package.json` to make running it easier:\n\n```\n    "user-journey-nestable": "hardhat run scripts/nestableUserJourney.ts"\n```\n\nRunning it using `npm run user-journey-nestable` should return the following output:\n\n```\nnpm run user-journey-nestable\n\n> @rmrk-team/evm-contract-samples@0.1.0 user-journey-nestable\n> hardhat run scripts/nestableUserJourney.ts\n\nSample contracts deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3 and 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512\nMinting parent NFTs\nMinted totalTokens tokens\nTotal parent tokens: 5\nMinting child NFTs\nAdded 2 chunkies per kanaria\nAwaiting for all tx to finish...\nTotal child tokens: 10\nInspecting child NFT with the ID of 1\nChunky\'s id 1 owner  is  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266\nChunky\'s id 1 rmrk owner is  [\n  \'0x5FbDB2315678afecb367f032d93F642f64180aa3\',\n  BigNumber { value: "1" },\n  true\n]\nParent address:  0x5FbDB2315678afecb367f032d93F642f64180aa3\nAccepting the fist child NFT for the parent NFT with ID 1\nExaimning accepted and pending children of parent NFT with ID 1\nChildren:  [\n  [\n    BigNumber { value: "1" },\n    \'0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512\',\n    tokenId: BigNumber { value: "1" },\n    contractAddress: \'0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512\'\n  ]\n]\nPending:  [\n  [\n    BigNumber { value: "2" },\n    \'0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512\',\n    tokenId: BigNumber { value: "2" },\n    contractAddress: \'0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512\'\n  ]\n]\nRemoving the nested NFT from the parent token with the ID of 1\nChunky\'s id 1 parent is  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266\nChunky\'s id 1 rmrk owner is  [\n  \'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266\',\n  BigNumber { value: "0" },\n  false\n]\n```\n\nThis concludes our work on the `SimpleNestable.sol`. We can now move on to examining the `AdvancedNestable.sol`.\n\n## AdvancedNestable\n\nThe `AdvancedNestable` smart contract allows for more flexibility when using the nestable lego. It implements minimum required implementation in order to be compatible with RMRK nestable, but leaves more business logic implementation freedom to the developer. It uses the `RMRKNestable.sol` import to gain access to the `Nestable` lego:\n\n```\nimport "@rmrk-team/evm-contracts/contracts/RMRK/nestable/RMRKNestable.sol";\n```\n\nWe only need `name` and `symbol` of the NFT in order to properly initialize it after the `AdvancedNestable` inherits it:\n\n```\ncontract AdvancedNestable is RMRKNestable {\n    // NOTE: Additional custom arguments can be added to the constructor based on your needs.\n    constructor(\n        string memory name,\n        string memory symbol\n    )\n        RMRKNestable(name, symbol)\n    {\n        // Custom optional: constructor logic\n    }\n}\n```\n\nThe full code is thus:\n\n```\n// SPDX-License-Identifier: Apache-2.0\n\npragma solidity ^0.8.16;\n\nimport "@rmrk-team/evm-contracts/contracts/RMRK/nestable/RMRKNestable.sol";\n\n\ncontract AdvancedNestable is RMRKNestable {\n    // NOTE: Additional custom arguments can be added to the constructor based on your needs.\n    constructor(\n        string memory name,\n        string memory symbol\n    )\n        RMRKNestable(name, symbol)\n    {\n        // Custom optional: constructor logic\n    }\n}\n```\n\nUsing `RMRKNestable` requires custom implementation of minting logic. Available internal functions to use when writing it are:\n\n- `_mint(address to, uint256 tokenId)`\n- `_safeMint(address to, uint256 tokenId)`\n- `_safeMint(address to, uint256 tokenId, bytes memory data)`\n- `_nestMint(address to, uint256 tokenId, uint256 destinationId)`\n\nThe latter is used to nest mint the NFT directly to the parent NFT. If you intend to support it at the minting stage, you should implement it in your smart contract.\n\nIn addition to the minting functions, you should also implement the burning and transfer functions if they apply to your use case:\n- `_burn(uint256 tokenId)`\n- `transferFrom(address from, address to, uint256 tokenId)`\n- `nestTransfer(address from, address to, uint256 tokenId, uint256 destinationId)`\n\nAny additional function supporting your NFT use case and utility can also be added. Remember to thoroughly test your smart contracts with extensive test suites and define strict access control rules for the functions that you implement.\n')))}h.isMDXComponent=!0}}]);