// if (typeof window.web3 !== undefined ){
//     let web3js = new Web3(window.web3.getProvider());
// }
  

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

const changePriceButton=document.getElementById("cp-id");

const handlePriceChange=()=>{
    const cid=document.getElementById("c-id").value;
    const newp=document.getElementById("newp-id").value;
    const newpp=document.getElementById("new-p-d")
    
    if(newp== ''){alert("Enter valid input");return;}
    if(cid== ''){alert("Enter valid crop Id");return;}


    contract.methods.dealerSetPriceOfCropExpl(cid,newp)
    .send(
        {

            from: web3.eth.currentProvider.selectedAddress,
            gasPrice:10000,
            gas:1000000
        }
    )
    .on('transactionHash',h=>{alert("New price set done!!            Trabsaction hash: "+h)})
    .on('confirmation',c=>{console.log(c)})
    .on('error',e=>{alert(e.message)})
    .then(
        result=>{
            // alert(console.log);
            alert("Block hash: "+result.blockHash);
            alert("Block number: "+result.blockNumber);
            newpp.innerHTML=newp;
        })
}

changePriceButton.addEventListener("click",handlePriceChange)