// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.0;

/// @notice Registry mapping an address to its stealth key information.
contract IERC5564Registry {

  mapping(address => mapping(uint => uint)) public spendingKeys;
  mapping(address => mapping(uint => uint)) public scanningKeys;


  /// @notice Returns the stealth public keys for the given `registrant` to compute a stealth
  /// address accessible only to that `registrant` using the provided `generator` contract.
  /// @dev MUST return zero if a registrant has not registered keys for the given generator.
  /// @dev The pubkeys are returned as `bytes memory` to support pubkeys of any  format and size.
  /// @dev Generator contracts SHOULD be written to support a single public key, or two public keys:
  /// one viewing key and one spending key. This can be inferred from the length of the key material.
  function stealthKeys(address _registrant)
    external
    view
    returns (uint spkx, uint spky, uint sckx, uint scky) {
       return (
         spendingKeys[_registrant][0], spendingKeys[_registrant][1],
         scanningKeys[_registrant][0], scanningKeys[_registrant][1]
       );
    }

  /// @notice Sets the caller's stealth public keys for the `generator` contract.
  /// @dev The pubkey is passed as `bytes memory` to support pubkeys of any format and size.
  /// @dev Generator contracts SHOULD be written to support a single public key, or two public keys:
  /// one viewing key and one spending key. This can be inferred from the length of the key material.
  function registerKeys(
    uint _SpPubKeyX, 
    uint _SpPubKeyY, 
    uint _ScPubKeyX, 
    uint _ScPubKeyY
  ) external {
    spendingKeys[msg.sender][0] = _SpPubKeyX;
    spendingKeys[msg.sender][1] = _SpPubKeyY;
    scanningKeys[msg.sender][1] = _ScPubKeyX;
    scanningKeys[msg.sender][1] = _ScPubKeyY;
    emit StealthKeyChanged(
      msg.sender, 
      _SpPubKeyX, 
      _SpPubKeyY, 
      _ScPubKeyX, 
      _ScPubKeyY
    );
  }


  /// @dev Event emitted when a registrant updates their registered stealth keys.
  event StealthKeyChanged(
    address indexed registrant, 
    uint _SpPubKeyX, 
    uint _SpPubKeyY, 
    uint _ScPubKeyX, 
    uint _ScPubKeyY
  );
}

contract IERC5564Messenger {
  event Announcement(
    address indexed stealthRecipient,
    uint indexed sharedSecretX,
    uint indexed sharedSecretY
  );
}

contract PrivateDonation is IERC5564Messenger {

    function donate(
        address stealthRecipient,
        uint sharedSecretX,
        uint sharedSecretY
    ) public payable {
        (bool sent,)= stealthRecipient.call{value: msg.value}(""); 
        emit Announcement(stealthRecipient, sharedSecretX, sharedSecretY);
    }
}