export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": []
    },
    {
        "type": "error",
        "name": "Unregistered",
        "inputs": []
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Registered",
        "inputs": [
            {
                "type": "bytes32",
                "name": "node",
                "indexed": true
            },
            {
                "type": "tuple",
                "name": "ownership",
                "indexed": false,
                "components": [
                    {
                        "type": "address",
                        "name": "owner"
                    },
                    {
                        "type": "bool",
                        "name": "subnode"
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "isOwner",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_owner"
            },
            {
                "type": "bytes32",
                "name": "_node"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "owner",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes32",
                "name": "_node"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "_owner"
            }
        ]
    },
    {
        "type": "function",
        "name": "predictDeterministicAddresses",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "bytes32",
                "name": "_node"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "l1Token"
            },
            {
                "type": "address",
                "name": "l2Token"
            }
        ]
    },
    {
        "type": "function",
        "name": "register",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address",
                "name": "_owner"
            },
            {
                "type": "bytes32",
                "name": "_node"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "registerSub",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address",
                "name": "_owner"
            },
            {
                "type": "string",
                "name": "_subname"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "whatIsTheAddressOf",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "string",
                "name": "name"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "_owner"
            },
            {
                "type": "address",
                "name": "_receiver"
            },
            {
                "type": "bytes32",
                "name": "_node"
            }
        ]
    }
]
