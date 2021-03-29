
const ethEnabled = () => {
  if (window.ethereum) {
    
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();    
    return true;
  }
  return console.log(false);
}


ethEnabled();

//web3.eth.getAccounts(a=>alert(a))

//const web3 = new Web3('http://127.0.0.1:7545');


const contract = new web3.eth.Contract(
  AgriBlockAbi,
  AgriBlockAddress
);

let defaultAccount;
web3.eth.getAccounts()
  .then(
    accounts => defaultAccount = accounts[0]
  );
contract.defaultAccount = defaultAccount;


const setPriceButton = document.getElementById("set-b");
const handleSetPrice = () => {

  var j = document.getElementById("j-id").value;
  var b = document.getElementById("b-id").value;
  var w = document.getElementById("w-id").value;
  var g = document.getElementById("g-id").value;

  if( j=='' || b=='' || w=='' || g=='' ){ alert("Enter valid values"); return;}
  if( j<1 || b<1 || w<1 || g<1 ){ alert("Enter valid values"); return;} 
  if( j<100 || b<100 || w<100 || g<100 ){ alert("Enter values greater than 100"); return;}

  contract.methods.setPrice(j, b, w, g)
    .send
    ({
      from: web3.eth.currentProvider.selectedAddress,
      gasPrice: 10000,
      gas: 1000000
    })
    .on('confirmation', c => { console.log(c) })
    .on('transactionHash', h => { alert("Transaction hash :  " + h + " Price set done") })
    .on('error', err => { alert("Error : "+err.message)})
    .then(result => {alert("Block Hash "+result.blockHash);
                    console.log(result);
                    alert("Block Number "+result.blockNumber); 
  })

}

setPriceButton.addEventListener('click', handleSetPrice);
