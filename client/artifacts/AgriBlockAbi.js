const AgriBlockAbi =  [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "cropCounter",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "dCropCounter",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "sdCropCounter",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_jwari",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "_bajari",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "_wheat",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "_groundnut",
        "type": "uint16"
      }
    ],
    "name": "setPrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_forDealer",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "_forSubdealer",
        "type": "uint16"
      }
    ],
    "name": "setProfitPercentage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_farmerName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phoneNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      }
    ],
    "name": "registerFarmer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_cropType",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "_quantity",
        "type": "uint16"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "addCropDetails",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_dealerName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phoneNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      }
    ],
    "name": "registerDealer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_cropId",
        "type": "uint16"
      }
    ],
    "name": "seeCropsAtFarmer",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint16",
            "name": "cropId",
            "type": "uint16"
          },
          {
            "internalType": "string",
            "name": "cropName",
            "type": "string"
          },
          {
            "internalType": "uint16",
            "name": "farmer_quantity",
            "type": "uint16"
          },
          {
            "internalType": "string",
            "name": "location",
            "type": "string"
          },
          {
            "internalType": "address payable",
            "name": "farmerAddrs",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "dealerAddrs",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "subDealerAddrs",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isAdded",
            "type": "bool"
          },
          {
            "internalType": "uint16",
            "name": "cropPrice",
            "type": "uint16"
          },
          {
            "internalType": "string",
            "name": "farmerName",
            "type": "string"
          }
        ],
        "internalType": "struct AgriBlock.Crop",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_cropId",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "_quantity",
        "type": "uint16"
      }
    ],
    "name": "buyFromFarmer",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_cropId",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "_newPrice",
        "type": "uint16"
      }
    ],
    "name": "dealerSetPriceOfCropExpl",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_subdealerName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phoneNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      }
    ],
    "name": "registerSubdealer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_cropId",
        "type": "uint16"
      }
    ],
    "name": "seeCropsAtDealer",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint16",
            "name": "cropId",
            "type": "uint16"
          },
          {
            "internalType": "string",
            "name": "cropName",
            "type": "string"
          },
          {
            "internalType": "uint16",
            "name": "farmer_quantity",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "dealer_quantity",
            "type": "uint16"
          },
          {
            "internalType": "string",
            "name": "location",
            "type": "string"
          },
          {
            "internalType": "address payable",
            "name": "farmerAddrs",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "dealerAddrs",
            "type": "address"
          },
          {
            "internalType": "uint16",
            "name": "cropPrice",
            "type": "uint16"
          },
          {
            "internalType": "string",
            "name": "dealerName",
            "type": "string"
          }
        ],
        "internalType": "struct AgriBlock.DCrop",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_cropId",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "_quantity",
        "type": "uint16"
      }
    ],
    "name": "buyFromDealer",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_cropId",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "_newPrice",
        "type": "uint16"
      }
    ],
    "name": "subdealerSetPriceOfCropExpl",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_cropId",
        "type": "uint16"
      }
    ],
    "name": "seeCropsAtSubdealer",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint16",
            "name": "cropId",
            "type": "uint16"
          },
          {
            "internalType": "string",
            "name": "cropName",
            "type": "string"
          },
          {
            "internalType": "uint16",
            "name": "farmer_quantity",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "dealer_quantity",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "subdealer_quantity",
            "type": "uint16"
          },
          {
            "internalType": "string",
            "name": "location",
            "type": "string"
          },
          {
            "internalType": "address payable",
            "name": "farmerAddrs",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "dealerAddrs",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "subdealerAddrs",
            "type": "address"
          },
          {
            "internalType": "uint16",
            "name": "cropPrice",
            "type": "uint16"
          },
          {
            "internalType": "string",
            "name": "subdealerName",
            "type": "string"
          }
        ],
        "internalType": "struct AgriBlock.SDCrop",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_cropId",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "_quantity",
        "type": "uint16"
      }
    ],
    "name": "buyCrop",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_cropId",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "_quantity",
        "type": "uint16"
      }
    ],
    "name": "getPriceForQuantityInWei",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "_quote",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];