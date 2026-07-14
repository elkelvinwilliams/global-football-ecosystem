// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

/// @title GFE MandateRegistry (Phase 2)
/// @notice Lifecycle fingerprints for representation mandates. Stores only
///         salted hashes — never identities, terms or personal data. Disputes
///         freeze transitions; adjudication happens off-chain and the
///         resolution record is anchored separately (AnchorRegistry).
contract MandateRegistry is AccessControl {
    bytes32 public constant REGISTRAR_ROLE = keccak256("REGISTRAR_ROLE");

    enum Status {
        None,
        Registered,
        Consented,
        Terminated,
        Disputed
    }

    struct Entry {
        Status status;
        uint64 notBefore;
        uint64 notAfter;
        bytes32 consentHash;
    }

    mapping(bytes32 => Entry) public entries; // key: mandateHash

    event Registered(bytes32 indexed mandateHash, uint64 notBefore, uint64 notAfter);
    event Consented(bytes32 indexed mandateHash, bytes32 consentHash);
    event Terminated(bytes32 indexed mandateHash, bytes32 reasonHash);
    event Disputed(bytes32 indexed mandateHash);

    constructor(address admin, address registrar) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(REGISTRAR_ROLE, registrar);
    }

    function register(bytes32 mandateHash, uint64 notBefore, uint64 notAfter)
        external
        onlyRole(REGISTRAR_ROLE)
    {
        require(entries[mandateHash].status == Status.None, "exists");
        entries[mandateHash] = Entry(Status.Registered, notBefore, notAfter, 0);
        emit Registered(mandateHash, notBefore, notAfter);
    }

    function consent(bytes32 mandateHash, bytes32 consentHash) external onlyRole(REGISTRAR_ROLE) {
        Entry storage e = entries[mandateHash];
        require(e.status == Status.Registered, "bad state");
        e.status = Status.Consented;
        e.consentHash = consentHash;
        emit Consented(mandateHash, consentHash);
    }

    function terminate(bytes32 mandateHash, bytes32 reasonHash) external onlyRole(REGISTRAR_ROLE) {
        Entry storage e = entries[mandateHash];
        require(e.status == Status.Consented || e.status == Status.Registered, "bad state");
        e.status = Status.Terminated;
        emit Terminated(mandateHash, reasonHash);
    }

    function dispute(bytes32 mandateHash) external onlyRole(REGISTRAR_ROLE) {
        require(entries[mandateHash].status != Status.None, "unknown");
        entries[mandateHash].status = Status.Disputed;
        emit Disputed(mandateHash);
    }
}
