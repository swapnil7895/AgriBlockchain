
const ethEnabled = () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      //window.eth_requestAccounts();
      return true;
    }
    return console.log(false);
  }
  ethEnabled();
  


//const web3 = new Web3('http://127.0.0.1:7545');
const contract = new web3.eth.Contract(
    AgriBlockAbi,
    AgriBlockAddress
);

let defaultAccount;//temp
web3.eth.getAccounts()
    .then(
        accounts => defaultAccount = accounts[0]//temp
    );


function bal() {
    web3.eth.getBalance(web3.eth.currentProvider.selectedAddress)
        .then(result => alert(web3.utils.fromWei(result, 'ether') + " Ether"));
}


const calculateWeiButton = document.getElementById("cal-wei");
const handleWeiCal = () => {


    const c = document.getElementById("crop-id").value;
    const d = document.getElementById("qnt-id").value;

    if(d == ''){alert("Enter valid quantity");return;}
    if(c == ''){alert("Enter valid crop Id");return;}

    contract.methods.getPriceForQuantityInWei
        (c, d)
        .call({
            from: web3.eth.currentProvider.selectedAddress, 
            gasPrice: 10000, gas: 1000000
        }
        )
        .then((result,err) => {
            if(!err){
            document.getElementById("in-wei-id").innerHTML = result;
            document.getElementById("in-wei-id").value = result;
            }
            else{
                alert(err);
            }
        })
}

calculateWeiButton.addEventListener('click', handleWeiCal)




const buyFromFarmer = document.getElementById("dBuyCrop-id");
const handleBuyFromFarmer = () => {

    var dqnt = document.getElementById("dBuyQnt-id").value;
    var cid = document.getElementById("cid").value;
    var val = document.getElementById("amt-id").value;

    if(dqnt == ''){alert("Enter valid quantity");return;}
    if(cid == ''){alert("Enter valid crop Id");return;}
    if(val == ''){alert("Enter valid amount");return;}

    contract.methods.buyFromFarmer(cid, dqnt).send
        ({ from: web3.eth.currentProvider.selectedAddress,
             gasPrice: 10000, gas: 1000000, value: val })
        .on('transactionHash',h=>{alert("Transaction hash:  "+h)})
        .on('confirmation',c=>{console.log(c)})
        .on('error',e=>{alert(e.message)})
        .then(
            result => {alert("Block Hash "+result.blockHash);
                    console.log(result);
                    alert("Block Number "+result.blockNumber);}
        )
}

buyFromFarmer.addEventListener('click', handleBuyFromFarmer);
