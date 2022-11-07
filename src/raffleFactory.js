import web3 from './web3';

const address = "0x1A46bF68695377f4E3AbE40332D33Ef5314535AE";

const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_raffleId",
				"type": "uint256"
			}
		],
		"name": "createEntry",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_entryFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_maxEntries",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endingTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numWinners",
				"type": "uint256"
			}
		],
		"name": "createRaffle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_raffleId",
				"type": "uint256"
			}
		],
		"name": "generateWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRandomNumber",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "entryAddress",
				"type": "address"
			}
		],
		"name": "newEntry",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "randomness",
				"type": "uint256"
			}
		],
		"name": "rawFulfillRandomness",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRaffle",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "entryFee",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxEntries",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "numWinners",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endingTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "active",
						"type": "bool"
					},
					{
						"internalType": "address[]",
						"name": "entries",
						"type": "address[]"
					},
					{
						"internalType": "uint256",
						"name": "entriesNum",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "winners",
						"type": "address[]"
					}
				],
				"internalType": "struct Raffles.Raffle[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "raffles",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "entryFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxEntries",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "numWinners",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endingTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "entriesNum",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "raffleToOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "randomResult",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export default new web3.eth.Contract(abi, address);