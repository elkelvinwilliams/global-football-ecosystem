// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

/// @title GFE AnchorRegistry
/// @notice Stores Merkle roots of off-chain record-hash batches. Contains no
///         personal data — only roots and timestamps. Records are verified by
///         recomputing a salted leaf hash and checking the inclusion path.
contract AnchorRegistry is AccessControl {
    bytes32 public constant ANCHOR_ROLE = keccak256("ANCHOR_ROLE");

    struct Batch {
        bytes32 root;
        uint64 timestamp;
    }

    mapping(uint256 => Batch) public batches;

    event Anchored(uint256 indexed batchId, bytes32 root, uint64 timestamp);

    constructor(address admin, address anchorer) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ANCHOR_ROLE, anchorer);
    }

    function anchorRoot(uint256 batchId, bytes32 root) external onlyRole(ANCHOR_ROLE) {
        require(batches[batchId].timestamp == 0, "batch exists");
        batches[batchId] = Batch(root, uint64(block.timestamp));
        emit Anchored(batchId, root, uint64(block.timestamp));
    }

    function verify(
        uint256 batchId,
        bytes32 leaf,
        bytes32[] calldata path,
        bool[] calldata leftSide
    ) external view returns (bool) {
        require(path.length == leftSide.length, "path mismatch");
        bytes32 node = leaf;
        for (uint256 i = 0; i < path.length; i++) {
            node = leftSide[i]
                ? keccak256(abi.encodePacked(path[i], node))
                : keccak256(abi.encodePacked(node, path[i]));
        }
        return node == batches[batchId].root;
    }
}
