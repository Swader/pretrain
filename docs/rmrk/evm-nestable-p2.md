---
sidebar_position: 17
---

# EVM, nestable part 2

## User Journey

With the deploy script ready, we can examine how the journey of a user using nestable would look like using these two smart contracts.

The base of it is the same as the deploy script, as we need to deploy the smart contracts in order to interact with them:

```
import { ethers } from "hardhat";
import { SimpleNestable } from "../typechain-types";
import { ContractTransaction } from "ethers";

async function main() {
  const pricePerMint = ethers.utils.parseEther("0.0001");
  const totalTokens = 5;
  const [owner] = await ethers.getSigners();

  const contractFactory = await ethers.getContractFactory("SimpleNestable");
  const parent: SimpleNestable = await contractFactory.deploy(
    "Kanaria",
    "KAN",
    "ipfs://collectionMeta",
    "ipfs://tokenMeta",
    {
      erc20TokenAddress: ethers.constants.AddressZero,
      tokenUriIsEnumerable: true,
      royaltyRecipient: await owner.getAddress(),
      royaltyPercentageBps: 10,
      maxSupply: 1000,
      pricePerMint: pricePerMint
    }
  );
  const child: SimpleNestable = await contractFactory.deploy(
    "Chunky",
    "CHN",
    "ipfs://collectionMeta",
    "ipfs://tokenMeta",
    {
      erc20TokenAddress: ethers.constants.AddressZero,
      tokenUriIsEnumerable: true,
      royaltyRecipient: await owner.getAddress(),
      royaltyPercentageBps: 10,
      maxSupply: 1000,
      pricePerMint: pricePerMint
    }
  );

  await parent.deployed();
  await child.deployed();
  console.log(
    `Sample contracts deployed to ${parent.address} and ${child.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

First thing that needs to be done after the smart contracts are deployed is to mint the NFTs. Minting the parent NFT is a straightforward process. We will use the `totalTokens` constant in order to specify how many of the parent tokens to mint:

```
  console.log("Minting parent NFTs");
  let tx = await parent.mint(owner.address, totalTokens, {
    value: pricePerMint.mul(totalTokens),
  });
  await tx.wait();
  console.log("Minted totalTokens tokens");
  let totalSupply = await parent.totalSupply();
  console.log("Total parent tokens: %s", totalSupply);
```

Minting child NFTs that should be nested is a different process. We will mint 2 nested NFTs for each parent NFT. If we examine the `nestMint` call that is being prepared, we can see that the first argument is the parent smart contract address, the second one is the amount of child NFTs to be nested to the given token and third is the ID of the parent token to which to nest the child. In this script, we will build a set of transactions to mint the nested tokens and then send them once they are all ready:

```
  console.log("Minting child NFTs");
  let allTx: ContractTransaction[] = [];
  for (let i = 1; i <= totalTokens; i++) {
    let tx = await child.nestMint(parent.address, 2, i, {
      value: pricePerMint.mul(2),
    });
    allTx.push(tx);
  }
  console.log("Added 2 chunkies per kanaria");
  console.log("Awaiting for all tx to finish...");
  await Promise.all(allTx.map((tx) => tx.wait()));

  totalSupply = await child.totalSupply();
  console.log("Total child tokens: %s", totalSupply);
```

Once the child NFTs are minted, we can examine the difference between `ownerOf` and `directOwnerOf` functions. The former should return the address of the root owner (which should be the owner's address in our case) and the latter should return the array of values related to intended parent. The array is structured like this:

```
[
  address of the owner,
  token ID of the parent NFT,
  isNft boolean value
]
```

In our case, the address of the owner should equal the parent token's smart contract, the ID should equal the parent NFT's ID and the boolean value of `isNft` should be set to true. If we would be calling the `directOwnerOf` one the parent NFT, the owner should be the same as the one returned from the `ownerOf`, ID should equal 0 and the `isNft` value should be set to `false`. The section covering these calls should look like this:

```
  console.log("Inspecting child NFT with the ID of 1");
  let parentId = await child.ownerOf(1);
  let rmrkParent = await child.directOwnerOf(1);
  console.log("Chunky's id 1 owner  is ", parentId);
  console.log("Chunky's id 1 rmrk owner is ", rmrkParent);
  console.log("Parent address: ", parent.address);
```

For the nestable process to be completed, the `acceptChild` method should be called on the parent NFT:

```
  console.log("Accepting the fist child NFT for the parent NFT with ID 1");
  tx = await parent.acceptChild(1, 0, child.address, 1);
  await tx.wait();
```

The section of the script above accepted the child NFT with the ID of 1 at the index 0 for the parent NFT with the ID of 1 in the parent NFT's smart contract.

NOTE: When accepting the nested NFTs, the index of the pending NFT represents its index in a FIFO like stack. So having 2 NFTs in the pending stack, and accepting the one with the index of 0 will move the next one to this spot. Accepting the second NFT from the stack, after the first one was already accepted, should then be done by accepting the pending NFT with index of 0. So two identical calls in succession should accept both pending NFTs.

The parent NFT with ID 1 now has one accepted and one pending child NFTs. We can examine both using the childrenOf and pendingChildren methods:

```
  console.log("Exaimning accepted and pending children of parent NFT with ID 1");
  console.log("Children: ", await parent.childrenOf(1));
  console.log("Pending: ", await parent.pendingChildrenOf(1));
```

Both of these methods return the array of tokens contained in the list, be it for child NFTs or for pending NFTs. The array contains two values:

- `contractAddress` is the address of the child NFT's smart contract
- `tokenId` is the ID of the child NFT in its smart contract

Once the NFT is nested, it can also be unnested. When doing so, the owner of the token should be specified, as they will be the ones owning the token from that point on (or until they nest or sell it). Additionally pending status has to be passed, as the procedure to unnest differs for the NFTs that have already been accepted from those that are still pending (passing false indicates that the child NFT has already been nested). We will remove the nested NFT with nestable ID of 0 from the parent NFT with ID 1:

```
  console.log("Removing the nested NFT from the parent token with the ID of 1");
  tx = await parent.transferChild(1, owner.address, 0, 0, child.address, 1, false, "0x");
  await tx.wait();
```

NOTE: Unnesting the child NFT is done in the similar manner as accepting a pending child NFT. Once the nested NFT at ID 0 has been unnested the following NFT's IDs are reduced by 1.

Finally, let's observe the child NFT that we just unnested. We will use the ownerOf and directOwnerOf methods to observe it:

```
  parentId = await child.ownerOf(1);
  rmrkParent = await child.directOwnerOf(1);
  console.log("Chunky's id 1 parent is ", parentId);
  console.log("Chunky's id 1 rmrk owner is ", rmrkParent);
```

The `directOwnerOf` should return the address of the owner and the ID should be 0 as well as `isNft` should be `false`.

With the user journey script concluded, we can add a custom helper to the `package.json` to make running it easier:

```
    "user-journey-nestable": "hardhat run scripts/nestableUserJourney.ts"
```

Running it using `npm run user-journey-nestable` should return the following output:

```
npm run user-journey-nestable

> @rmrk-team/evm-contract-samples@0.1.0 user-journey-nestable
> hardhat run scripts/nestableUserJourney.ts

Sample contracts deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3 and 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
Minting parent NFTs
Minted totalTokens tokens
Total parent tokens: 5
Minting child NFTs
Added 2 chunkies per kanaria
Awaiting for all tx to finish...
Total child tokens: 10
Inspecting child NFT with the ID of 1
Chunky's id 1 owner  is  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Chunky's id 1 rmrk owner is  [
  '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  BigNumber { value: "1" },
  true
]
Parent address:  0x5FbDB2315678afecb367f032d93F642f64180aa3
Accepting the fist child NFT for the parent NFT with ID 1
Exaimning accepted and pending children of parent NFT with ID 1
Children:  [
  [
    BigNumber { value: "1" },
    '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    tokenId: BigNumber { value: "1" },
    contractAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
  ]
]
Pending:  [
  [
    BigNumber { value: "2" },
    '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    tokenId: BigNumber { value: "2" },
    contractAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
  ]
]
Removing the nested NFT from the parent token with the ID of 1
Chunky's id 1 parent is  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Chunky's id 1 rmrk owner is  [
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  BigNumber { value: "0" },
  false
]
```

This concludes our work on the `SimpleNestable.sol`. We can now move on to examining the `AdvancedNestable.sol`.

## AdvancedNestable

The `AdvancedNestable` smart contract allows for more flexibility when using the nestable lego. It implements minimum required implementation in order to be compatible with RMRK nestable, but leaves more business logic implementation freedom to the developer. It uses the `RMRKNestable.sol` import to gain access to the `Nestable` lego:

```
import "@rmrk-team/evm-contracts/contracts/RMRK/nestable/RMRKNestable.sol";
```

We only need `name` and `symbol` of the NFT in order to properly initialize it after the `AdvancedNestable` inherits it:

```
contract AdvancedNestable is RMRKNestable {
    // NOTE: Additional custom arguments can be added to the constructor based on your needs.
    constructor(
        string memory name,
        string memory symbol
    )
        RMRKNestable(name, symbol)
    {
        // Custom optional: constructor logic
    }
}
```

The full code is thus:

```
// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.16;

import "@rmrk-team/evm-contracts/contracts/RMRK/nestable/RMRKNestable.sol";


contract AdvancedNestable is RMRKNestable {
    // NOTE: Additional custom arguments can be added to the constructor based on your needs.
    constructor(
        string memory name,
        string memory symbol
    )
        RMRKNestable(name, symbol)
    {
        // Custom optional: constructor logic
    }
}
```

Using `RMRKNestable` requires custom implementation of minting logic. Available internal functions to use when writing it are:

- `_mint(address to, uint256 tokenId)`
- `_safeMint(address to, uint256 tokenId)`
- `_safeMint(address to, uint256 tokenId, bytes memory data)`
- `_nestMint(address to, uint256 tokenId, uint256 destinationId)`

The latter is used to nest mint the NFT directly to the parent NFT. If you intend to support it at the minting stage, you should implement it in your smart contract.

In addition to the minting functions, you should also implement the burning and transfer functions if they apply to your use case:
- `_burn(uint256 tokenId)`
- `transferFrom(address from, address to, uint256 tokenId)`
- `nestTransfer(address from, address to, uint256 tokenId, uint256 destinationId)`

Any additional function supporting your NFT use case and utility can also be added. Remember to thoroughly test your smart contracts with extensive test suites and define strict access control rules for the functions that you implement.

---

## Training Data

    ## User Journey

    With the deploy script ready, we can examine how the journey of a user using nestable would look like using these two smart contracts.

    The base of it is the same as the deploy script, as we need to deploy the smart contracts in order to interact with them:

    ```
    import { ethers } from "hardhat";
    import { SimpleNestable } from "../typechain-types";
    import { ContractTransaction } from "ethers";

    async function main() {
      const pricePerMint = ethers.utils.parseEther("0.0001");
      const totalTokens = 5;
      const [owner] = await ethers.getSigners();

      const contractFactory = await ethers.getContractFactory("SimpleNestable");
      const parent: SimpleNestable = await contractFactory.deploy(
        "Kanaria",
        "KAN",
        "ipfs://collectionMeta",
        "ipfs://tokenMeta",
        {
          erc20TokenAddress: ethers.constants.AddressZero,
          tokenUriIsEnumerable: true,
          royaltyRecipient: await owner.getAddress(),
          royaltyPercentageBps: 10,
          maxSupply: 1000,
          pricePerMint: pricePerMint
        }
      );
      const child: SimpleNestable = await contractFactory.deploy(
        "Chunky",
        "CHN",
        "ipfs://collectionMeta",
        "ipfs://tokenMeta",
        {
          erc20TokenAddress: ethers.constants.AddressZero,
          tokenUriIsEnumerable: true,
          royaltyRecipient: await owner.getAddress(),
          royaltyPercentageBps: 10,
          maxSupply: 1000,
          pricePerMint: pricePerMint
        }
      );

      await parent.deployed();
      await child.deployed();
      console.log(
        `Sample contracts deployed to ${parent.address} and ${child.address}`
      );
    }

    main().catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
    ```

    First thing that needs to be done after the smart contracts are deployed is to mint the NFTs. Minting the parent NFT is a straightforward process. We will use the `totalTokens` constant in order to specify how many of the parent tokens to mint:

    ```
      console.log("Minting parent NFTs");
      let tx = await parent.mint(owner.address, totalTokens, {
        value: pricePerMint.mul(totalTokens),
      });
      await tx.wait();
      console.log("Minted totalTokens tokens");
      let totalSupply = await parent.totalSupply();
      console.log("Total parent tokens: %s", totalSupply);
    ```

    Minting child NFTs that should be nested is a different process. We will mint 2 nested NFTs for each parent NFT. If we examine the `nestMint` call that is being prepared, we can see that the first argument is the parent smart contract address, the second one is the amount of child NFTs to be nested to the given token and third is the ID of the parent token to which to nest the child. In this script, we will build a set of transactions to mint the nested tokens and then send them once they are all ready:

    ```
      console.log("Minting child NFTs");
      let allTx: ContractTransaction[] = [];
      for (let i = 1; i <= totalTokens; i++) {
        let tx = await child.nestMint(parent.address, 2, i, {
          value: pricePerMint.mul(2),
        });
        allTx.push(tx);
      }
      console.log("Added 2 chunkies per kanaria");
      console.log("Awaiting for all tx to finish...");
      await Promise.all(allTx.map((tx) => tx.wait()));

      totalSupply = await child.totalSupply();
      console.log("Total child tokens: %s", totalSupply);
    ```

    Once the child NFTs are minted, we can examine the difference between `ownerOf` and `directOwnerOf` functions. The former should return the address of the root owner (which should be the owner's address in our case) and the latter should return the array of values related to intended parent. The array is structured like this:

    ```
    [
      address of the owner,
      token ID of the parent NFT,
      isNft boolean value
    ]
    ```

    In our case, the address of the owner should equal the parent token's smart contract, the ID should equal the parent NFT's ID and the boolean value of `isNft` should be set to true. If we would be calling the `directOwnerOf` one the parent NFT, the owner should be the same as the one returned from the `ownerOf`, ID should equal 0 and the `isNft` value should be set to `false`. The section covering these calls should look like this:

    ```
      console.log("Inspecting child NFT with the ID of 1");
      let parentId = await child.ownerOf(1);
      let rmrkParent = await child.directOwnerOf(1);
      console.log("Chunky's id 1 owner  is ", parentId);
      console.log("Chunky's id 1 rmrk owner is ", rmrkParent);
      console.log("Parent address: ", parent.address);
    ```

    For the nestable process to be completed, the `acceptChild` method should be called on the parent NFT:

    ```
      console.log("Accepting the fist child NFT for the parent NFT with ID 1");
      tx = await parent.acceptChild(1, 0, child.address, 1);
      await tx.wait();
    ```

    The section of the script above accepted the child NFT with the ID of 1 at the index 0 for the parent NFT with the ID of 1 in the parent NFT's smart contract.

    NOTE: When accepting the nested NFTs, the index of the pending NFT represents its index in a FIFO like stack. So having 2 NFTs in the pending stack, and accepting the one with the index of 0 will move the next one to this spot. Accepting the second NFT from the stack, after the first one was already accepted, should then be done by accepting the pending NFT with index of 0. So two identical calls in succession should accept both pending NFTs.

    The parent NFT with ID 1 now has one accepted and one pending child NFTs. We can examine both using the childrenOf and pendingChildren methods:

    ```
      console.log("Exaimning accepted and pending children of parent NFT with ID 1");
      console.log("Children: ", await parent.childrenOf(1));
      console.log("Pending: ", await parent.pendingChildrenOf(1));
    ```

    Both of these methods return the array of tokens contained in the list, be it for child NFTs or for pending NFTs. The array contains two values:

    - `contractAddress` is the address of the child NFT's smart contract
    - `tokenId` is the ID of the child NFT in its smart contract

    Once the NFT is nested, it can also be unnested. When doing so, the owner of the token should be specified, as they will be the ones owning the token from that point on (or until they nest or sell it). Additionally pending status has to be passed, as the procedure to unnest differs for the NFTs that have already been accepted from those that are still pending (passing false indicates that the child NFT has already been nested). We will remove the nested NFT with nestable ID of 0 from the parent NFT with ID 1:

    ```
      console.log("Removing the nested NFT from the parent token with the ID of 1");
      tx = await parent.transferChild(1, owner.address, 0, 0, child.address, 1, false, "0x");
      await tx.wait();
    ```

    NOTE: Unnesting the child NFT is done in the similar manner as accepting a pending child NFT. Once the nested NFT at ID 0 has been unnested the following NFT's IDs are reduced by 1.

    Finally, let's observe the child NFT that we just unnested. We will use the ownerOf and directOwnerOf methods to observe it:

    ```
      parentId = await child.ownerOf(1);
      rmrkParent = await child.directOwnerOf(1);
      console.log("Chunky's id 1 parent is ", parentId);
      console.log("Chunky's id 1 rmrk owner is ", rmrkParent);
    ```

    The `directOwnerOf` should return the address of the owner and the ID should be 0 as well as `isNft` should be `false`.

    With the user journey script concluded, we can add a custom helper to the `package.json` to make running it easier:

    ```
        "user-journey-nestable": "hardhat run scripts/nestableUserJourney.ts"
    ```

    Running it using `npm run user-journey-nestable` should return the following output:

    ```
    npm run user-journey-nestable

    > @rmrk-team/evm-contract-samples@0.1.0 user-journey-nestable
    > hardhat run scripts/nestableUserJourney.ts

    Sample contracts deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3 and 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
    Minting parent NFTs
    Minted totalTokens tokens
    Total parent tokens: 5
    Minting child NFTs
    Added 2 chunkies per kanaria
    Awaiting for all tx to finish...
    Total child tokens: 10
    Inspecting child NFT with the ID of 1
    Chunky's id 1 owner  is  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    Chunky's id 1 rmrk owner is  [
      '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      BigNumber { value: "1" },
      true
    ]
    Parent address:  0x5FbDB2315678afecb367f032d93F642f64180aa3
    Accepting the fist child NFT for the parent NFT with ID 1
    Exaimning accepted and pending children of parent NFT with ID 1
    Children:  [
      [
        BigNumber { value: "1" },
        '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
        tokenId: BigNumber { value: "1" },
        contractAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
      ]
    ]
    Pending:  [
      [
        BigNumber { value: "2" },
        '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
        tokenId: BigNumber { value: "2" },
        contractAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
      ]
    ]
    Removing the nested NFT from the parent token with the ID of 1
    Chunky's id 1 parent is  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    Chunky's id 1 rmrk owner is  [
      '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      BigNumber { value: "0" },
      false
    ]
    ```

    This concludes our work on the `SimpleNestable.sol`. We can now move on to examining the `AdvancedNestable.sol`.

    ## AdvancedNestable

    The `AdvancedNestable` smart contract allows for more flexibility when using the nestable lego. It implements minimum required implementation in order to be compatible with RMRK nestable, but leaves more business logic implementation freedom to the developer. It uses the `RMRKNestable.sol` import to gain access to the `Nestable` lego:

    ```
    import "@rmrk-team/evm-contracts/contracts/RMRK/nestable/RMRKNestable.sol";
    ```

    We only need `name` and `symbol` of the NFT in order to properly initialize it after the `AdvancedNestable` inherits it:

    ```
    contract AdvancedNestable is RMRKNestable {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            string memory name,
            string memory symbol
        )
            RMRKNestable(name, symbol)
        {
            // Custom optional: constructor logic
        }
    }
    ```

    The full code is thus:

    ```
    // SPDX-License-Identifier: Apache-2.0

    pragma solidity ^0.8.16;

    import "@rmrk-team/evm-contracts/contracts/RMRK/nestable/RMRKNestable.sol";


    contract AdvancedNestable is RMRKNestable {
        // NOTE: Additional custom arguments can be added to the constructor based on your needs.
        constructor(
            string memory name,
            string memory symbol
        )
            RMRKNestable(name, symbol)
        {
            // Custom optional: constructor logic
        }
    }
    ```

    Using `RMRKNestable` requires custom implementation of minting logic. Available internal functions to use when writing it are:

    - `_mint(address to, uint256 tokenId)`
    - `_safeMint(address to, uint256 tokenId)`
    - `_safeMint(address to, uint256 tokenId, bytes memory data)`
    - `_nestMint(address to, uint256 tokenId, uint256 destinationId)`

    The latter is used to nest mint the NFT directly to the parent NFT. If you intend to support it at the minting stage, you should implement it in your smart contract.

    In addition to the minting functions, you should also implement the burning and transfer functions if they apply to your use case:
    - `_burn(uint256 tokenId)`
    - `transferFrom(address from, address to, uint256 tokenId)`
    - `nestTransfer(address from, address to, uint256 tokenId, uint256 destinationId)`

    Any additional function supporting your NFT use case and utility can also be added. Remember to thoroughly test your smart contracts with extensive test suites and define strict access control rules for the functions that you implement.
