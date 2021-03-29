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
  

   // const web3 = new Web3('http://127.0.0.1:7545');
    const contract = new web3.eth.Contract(
      AgriBlockAbi,
      AgriBlockAddress
    );
  
   let defaultAccount;//temp
   web3.eth.getAccounts()
      .then(
          accounts => defaultAccount =accounts[0]//temp
          );

const seeAllCropsButton=document.getElementById("dSeeCrops-id");
const handleSeeAllCrpos=()=>{
    var counter=1;
    
    //here we can make another functions for getting dealer crop count (in contract)
contract.methods.sdCropCounter().call
({  from: web3.eth.currentProvider.selectedAddress,
    gasPrice:10000,gas:1000000
})
.then(result =>
    {
        let top=result;
        for(i=1;i<= top; i++)
        {
            contract.methods.seeCropsAtSubdealer(i)
            .call().then(
                result=>{
                    if(result.subdealer_quantity!=0){
                    console.log(counter);
                document.getElementById("c-"+counter).innerHTML=result.cropName;
                document.getElementById("cid-"+counter).innerHTML=result.cropId;
                document.getElementById("cp-"+counter).innerHTML=result.cropPrice;
                document.getElementById("cq-"+counter).innerHTML=result.subdealer_quantity;
                document.getElementById("cl-"+counter).innerHTML=result.location;
                document.getElementById("bb-"+counter).value=result.cropId;
                counter=counter+1;
                    }
                })
        }
    })
}
seeAllCropsButton.addEventListener('click',handleSeeAllCrpos);


window.onload = handleSeeAllCrpos();



  
