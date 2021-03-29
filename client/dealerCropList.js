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
  


//    const web3 = new Web3('http://127.0.0.1:7545');
    const contract = new web3.eth.Contract(
      AgriBlockAbi,
      AgriBlockAddress
    );
  
   let dealerAddress;//temp
   web3.eth.getAccounts()
      .then(
          accounts => defaultAccount = accounts[0]//temp
          );
    // contract.defaultAccount=defaultAccount;
//    let result_;
//    contract.methods.howManyCrops().call().then(result=> result_=result);
   
//    //web3.utils.(result_).toString();
//    console.log(result_);
//    contract.events.thisManyCrops().on("data",e=>console.log(e));
  



// const seeAllCropsButton=document.getElementById("dSeeCrops-id");
const handleSeeAllCrpos=()=>{
    var counter=1;
    

contract.methods.cropCounter().call
    ({
        from: web3.eth.currentProvider.selectedAddress,
        gasPrice:10000,
        gas:1000000})
    .then(result =>
        {
            if(result ==0){ alert("No crops added yet by farmer!")}
            let top=result;
            for(i=1;i<= top; i++)
            {
                contract.methods.seeCropsAtFarmer(i)
                .call().then(
                    //console.log(i),
                    result=>{
                        if(result.farmer_quantity!=0){
                        console.log(counter);
                    document.getElementById("c-"+counter).innerHTML=result.cropName;
                    document.getElementById("cid-"+counter).innerHTML=result.cropId;
                    document.getElementById("co-"+counter).innerHTML=result.farmerName;
                    document.getElementById("cp-"+counter).innerHTML=result.cropPrice;
                    document.getElementById("cq-"+counter).innerHTML=result.farmer_quantity;
                    document.getElementById("cl-"+counter).innerHTML=result.location;
                    document.getElementById("bb-"+counter).value=result.cropId;
                    counter=counter+1;
                        }
                    })
            }
        })
    }
    //seeAllCropsButton.addEventListener('click',handleSeeAllCrpos);
    
    window.onload = handleSeeAllCrpos();
    








//   const fAddCropDetailsButton=document.getElementById("fadd-b");
//   const handleAddCropDetails = ()=>{
//     var t=document.getElementById("ctype-id").value;
//     var q=document.getElementById("cqnt-id").value;
//     var p=document.getElementById("cplace-id").value;
  
//     contract.methods.addCropDetails(t,q,p).send
//    ({
//      from: farmerAddress,//temp
//      gasPrice: 10000,
//      gas:1000000 
//    })
//    console.log("crop adding done")
//    alert("crop adding done");
//   }
//   fAddCropDetailsButton.addEventListener("click",handleAddCropDetails);
  


  
