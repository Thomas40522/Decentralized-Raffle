//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract Raffles is VRFConsumerBase{

    bytes32 internal keyHash;
    uint internal fee;
    uint public randomResult;

    constructor()
        VRFConsumerBase(
        0x326C977E6efc84E512bB9C30f76E30c160eD06FB, // VRF Coordinator
        0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D  // LINK Token
        )
    {
        keyHash = 0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15;
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }

    // Request randomness
    function getRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
    }

    function generateWinner(uint _raffleId) external {
        Raffle storage raffle = raffles[_raffleId];
        if (raffle.entriesNum <= raffle.maxEntries) {
            for (uint i = 0; i < raffle.entriesNum; i++) {
                raffle.winners.push(raffle.entries[i]);
            }
        } else {
            for (uint i = 0; i < raffle.maxEntries; i++) {
                fulfillRandomness(getRandomNumber(), i);
                raffle.winners.push(raffle.entries[randomResult % raffle.entriesNum]);
            }
        }
        raffle.active = false;
    }
    
    event newEntry(address entryAddress);
    mapping (uint => address) public raffleToOwner;
    Raffle[] public raffles;

    struct Raffle {
        uint id;
        address owner;
        string name;
        uint entryFee;
        uint maxEntries;
        uint numWinners;
        uint endingTime;
        bool active;
        address[] entries;
        uint entriesNum;
        address[] winners;
    }
    
    modifier onlyUnique(uint _raffleId, address _sender) {
        Raffle storage raffle = raffles[_raffleId];
        for (uint i = 0; i < raffle.entries.length; i++) {
            require(raffle.entries[i] != _sender);
        }
        _;
    }

    function createEntry(uint _raffleId) external onlyUnique(_raffleId, msg.sender){
        Raffle storage raffle = raffles[_raffleId];
        require(msg.sender.balance >= raffle.entryFee);
        raffle.entries.push(msg.sender);
        raffle.entriesNum++;
        emit newEntry(msg.sender);
    }

    function createRaffle(string memory _name, uint _entryFee, uint _maxEntries, uint _endingTime, uint _numWinners) public {
        address[] memory emptyEntries;
        address[] memory emptyWinners;
        Raffle memory newRaffle = Raffle({
            id: raffles.length,
            owner: msg.sender,
            name: _name,
            entryFee: _entryFee,
            maxEntries: _maxEntries,
            numWinners: _numWinners,
            endingTime: _endingTime,
            active: true,
            entries: emptyEntries,
            entriesNum: 0,
            winners: emptyWinners
        });
        raffles.push(newRaffle);
    }

    function getRaffle() external view returns(Raffle[] memory){
        return raffles;
    }
}
