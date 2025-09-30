// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Identity is Ownable {
    struct IdentityRecord {
        address owner;
        bytes32 govIdHash;
        bytes32 metadataHash;
        bool verified;
        uint256 createdAt;
    }

    mapping(address => IdentityRecord) public records;

    event Registered(address indexed user, bytes32 govIdHash, uint256 ts);
    event Verified(address indexed user, address indexed verifier, uint256 ts);
    event Revoked(address indexed user, address indexed revoker, uint256 ts);

    function register(bytes32 govIdHash, bytes32 metadataHash) external {
        require(records[msg.sender].createdAt == 0, "already registered");
        records[msg.sender] = IdentityRecord({
            owner: msg.sender,
            govIdHash: govIdHash,
            metadataHash: metadataHash,
            verified: false,
            createdAt: block.timestamp
        });
        emit Registered(msg.sender, govIdHash, block.timestamp);
    }

    function verify(address user) external onlyOwner {
        require(records[user].createdAt != 0, "not registered");
        records[user].verified = true;
        emit Verified(user, msg.sender, block.timestamp);
    }

    function revoke(address user) external onlyOwner {
        require(records[user].createdAt != 0, "not registered");
        records[user].verified = false;
        emit Revoked(user, msg.sender, block.timestamp);
    }

    function isVerified(address user) external view returns (bool) {
        return records[user].verified;
    }
}
