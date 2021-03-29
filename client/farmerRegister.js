// if (typeof window.web3 !== undefined ){
//   let web3js = new Web3(window.web3.getProvider());
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
          accounts => defaultAccount=accounts[0]//temp
          );
    // contract.defaultAccount=defaultAccount;
  
  const fRegisterButton=document.getElementById("freg-b");
  const handleFarmerRegister = ()=>{
    var fn=document.getElementById("fname-id").value;
    var fno=document.getElementById("fno-id").value;
    var fe=document.getElementById("femail-id").value;
  
    contract.methods.registerFarmer(fn,fno,fe)
    .send
   ({
     from: web3.eth.currentProvider.selectedAddress,//temp
     gasPrice: 10000,
     gas:1000000 
   })
   .on('transactionHash',h=>{alert(h.message)})
   .on('confirmation',c=>{alert(c.message)})
   .on('error',e=>{alert("Try using your account / Enter valid credentials" + e.message)})
   .then(r=>console.log);
   
  }
  fRegisterButton.addEventListener("click",handleFarmerRegister);
  
  
