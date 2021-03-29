//SPDX-License-Identifier: <SPDX-License>SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract AgriBlock
{
//state variables
    address owner;
    uint16 public cropCounter; //for key as crop mapping n counting crops
    uint16 public dCropCounter; //for key as dealer's crop mapping n counting crops
    uint16 public sdCropCounter;//
    uint16 farmerCounter;
    uint16 dealerCounter;
    uint16 subdealerCounter;
    
    //bool isCropsAvailableForCustomers=false;
     
    //crops
    uint16 jwari;
    uint16 bajari;
    uint16 wheat;
    uint16 groundnut;
    bool allPricesSet;
    uint16 arraySize = 4;
    uint16 [4]  cropTypes;
   
    uint16 dealerProfitPercent;
    uint16 subdealerProfitPercent;
    bool setProfitPercent;
   
//mappings
//1 dealer to his address
    mapping ( address => Dealer) dealers;
//2 subdealer to his address
    mapping ( address => SubDealer) subdealers;
//3 farmer to his address
    mapping ( address => Farmer) farmers;
//4 crop
    mapping ( uint16  => Crop )  crops;
//5 farmer to his Id

//7 for dealers cropAdde
    mapping (uint16 => DCrop) dcrops;
    mapping (uint16 => SDCrop) sdcrops;
   
//events
    // event farmerRegistered ( string, uint16, string );
    // event dealerRegistered ( string,uint16,string );
    // event subdealerRegistered ( string,uint16,string );
    // event cropAdded ( string );
    // event boughtFromFarmer( DCrop );
    // event boughtFromDealer( SDCrop);
    // event boughtFromSubdealer( uint16 );
    // event cropPricesSetDone(uint16,uint16,uint16,uint16);
    // event newPriceSetByDealer(uint16);
    // event thisManyCrops(uint16);

//constructor
constructor()
    {
        owner = msg.sender;
    }

//structs

    struct Farmer
    {
        uint16 farmerId;
        string farmerName;
        string contact;
        address addrs;
        string email;
        bool isRegistered;
    }

    struct Dealer
    {
        uint16 dealerId;
        string dealerName;
        string contact;
        address addrs;
        string email;
        bool isRegistered;
    }

    struct SubDealer
    {
        uint16 subDealerId;
        string subdealerName;
        string contact;
        string email;
        address  addrs;
        bool isRegistered;
    }

    struct Crop
    {
        uint16 cropId;
        string cropName;
        uint16 farmer_quantity;
        string location;
        address payable farmerAddrs;
        address payable dealerAddrs;
        address payable subDealerAddrs;
        bool isAdded;
        uint16 cropPrice;
        //uint16 cropType;
        string farmerName;
    }
    struct DCrop //struct for delaer's crop
    {
        uint16 cropId;
        string cropName;
        uint16 farmer_quantity;
        uint16 dealer_quantity;
        string location;
        address payable farmerAddrs;
        address payable dealerAddrs;
        //bool isAdded;
        uint16 cropPrice;
        //uint16 cropType;
        string dealerName;

    }
   
    struct SDCrop ////struct for delaer's crop
    {
        uint16 cropId;
        string cropName;
        uint16 farmer_quantity;
        uint16 dealer_quantity;
        uint16 subdealer_quantity;//imp
        string location;
        address payable farmerAddrs;
        address payable dealerAddrs;
        address payable subdealerAddrs;//imp
        //bool isAdded;
        uint16 cropPrice;
        //uint16 cropType;
        string subdealerName;

    }

//functions
//functions for GOV
    function setPrice
    (
        uint16 _jwari,
        uint16 _bajari,
        uint16 _wheat,
        uint16 _groundnut
    )
    public
    {
        
        require ( msg.sender == owner, " Only government can call");
        require ( _jwari >= 100 && _bajari >= 100 && _wheat >= 100 && _groundnut >= 100, "Put only values greater than 100");
        cropTypes[0]=_jwari;
        cropTypes[1]=_bajari;
        cropTypes[2]=_wheat;
        cropTypes[3]=_groundnut;
        allPricesSet = true;
       // emit cropPricesSetDone (_jwari,_bajari,_wheat,_groundnut);
    }
   
    function setProfitPercentage
    (
        uint16 _forDealer,
        uint16 _forSubdealer
    )
    public
    {
        require ( msg.sender == owner, " Only government can call");
        require (_forDealer> 0 && _forSubdealer>0 );
        dealerProfitPercent =_forDealer;
        subdealerProfitPercent = _forSubdealer;
        setProfitPercent = true;
       
    }

//functions for farmer

    function registerFarmer
    (
        string memory _farmerName,
        string memory _phoneNumber,
        string memory _email
    )
    public
    {
        require ( msg.sender!= owner ,"owner cant be farmer");
        require (farmers[msg.sender].isRegistered == false, "You are already registred");
        require (dealers[msg.sender].isRegistered == false, "You are already Dealer");
        require (subdealers[msg.sender].isRegistered == false, "You are already subdealer");
        farmerCounter++;
        Farmer memory farmer = Farmer ( farmerCounter, _farmerName, _phoneNumber, msg.sender, _email ,true);
        farmers [msg.sender] = farmer;
        //emit farmerRegistered(_farmerName,_phoneNumber, _email );

    }

    function addCropDetails   //only farmer can call
    (
        uint16 _cropType,
        uint16 _quantity,
        string memory _location
    )
    public
    {

        require ( _quantity >0 ,"quantity should be greater than 0");
        require (farmers[msg.sender].isRegistered == true, "You are not registered yet or you are not farmer");
        require ( allPricesSet==true , "gov isnt initialized prices yet" );
        require ( setProfitPercent == true , "gov isnt initialized profit rates yet" );
        //require ( _cropType < arraySize && _cropType >= 0 , "invalid crop type");
        uint16 cropPr = cropTypes[_cropType]; //fetched cropPrice by cropType (by gov)
        cropCounter++;
        Crop memory crop ;
       
        if( _cropType == 0)
        {
            crop.cropName = "jawar";
        }else if(_cropType == 1)
        {
            crop.cropName = "bajara";
        }else if(_cropType == 2)
        {
            crop.cropName = "wheat";
        }else{
            crop.cropName = "groundnut";
        }
       
        crop.cropId=cropCounter;
        //adding crop type to cropType
        //crop.cropType = _cropType;        
        crop.farmer_quantity=_quantity;
        crop.location=_location;
        crop.farmerAddrs = payable(msg.sender);
        crop.cropPrice = cropPr ;
        crop.isAdded=true;
        crop.farmerName=farmers[msg.sender].farmerName;
        crops[cropCounter] = crop;
        
        //emit cropAdded(crop.cropName);
    }
 
    //functions for dealer
    function registerDealer
    (
        string memory _dealerName,
        string memory _phoneNumber,
        string memory _email
    )
    public
    {
        require ( msg.sender!= owner ,"owner cant be dealer" );
        require ( dealers[msg.sender].isRegistered == false, "You are already registered");
        require (farmers[msg.sender].isRegistered == false, "You are already farmer");
        require (subdealers[msg.sender].isRegistered == false, "You are already subealer");
        dealerCounter++;
        Dealer memory dealer = Dealer (dealerCounter,_dealerName,_phoneNumber, msg.sender, _email, true );
        dealers[msg.sender]=dealer;
        //emit dealerRegistered( _dealerName,_phoneNumber,_email);
    }

    function seeCropsAtFarmer 
    (uint16 _cropId)
    public view 
    returns( Crop memory)
    {
        require (_cropId <= cropCounter && _cropId >0, "Invalid crop Id");
        return crops[_cropId];
    }


    function buyFromFarmer
    (
        uint16 _cropId,
        uint16 _quantity
    )
    public payable //for dealer
    {
        require (_cropId <= cropCounter && _cropId >0 && _quantity >0 && cropCounter>0, "enter valid numbers");
        require(msg.value == ((crops[_cropId].cropPrice)* 1 wei)* _quantity, "Please send exact amount" );
        require ( dealers[msg.sender].isRegistered == true , "You are not dealer or not registered" );
        require((crops[_cropId].farmer_quantity)>=_quantity,"crop in this quantity is not available");
        //creating dealers crop instance    
        DCrop memory dcrop;
        dCropCounter++;
        dcrop.cropId=dCropCounter;
        //dcrop.cropType = crops[_cropId].cropType;//adding crop type to cropType
        dcrop.farmer_quantity = (crops[_cropId].farmer_quantity)-(_quantity);//_fQuantity;
        dcrop.cropName = crops[_cropId].cropName;
        dcrop.dealer_quantity = _quantity;
        dcrop.location = crops[_cropId].location;//_loc;
        dcrop.farmerAddrs = crops[_cropId].farmerAddrs; //_fAddrs;
        dcrop.dealerAddrs = payable(msg.sender);
        dcrop.dealerName = dealers[msg.sender].dealerName;
        //dcrop.isAdded = true;
        dcrop.cropPrice = ((((crops[_cropId].cropPrice))/100)* dealerProfitPercent)+crops[_cropId].cropPrice;
        //modifying farmer's crop ( decreasing farmer's qnt)
        crops [_cropId].farmer_quantity = ( crops[_cropId].farmer_quantity ) - ( _quantity ); //newFarmerQuantity;//changing new farmer qnt
        crops[_cropId].farmerAddrs.transfer( ((crops[_cropId].cropPrice)* 1 wei)* _quantity );// transferrina money to farmer for his crops
        dcrops[dCropCounter] = dcrop;// adding dealer's crop to mapping
        //emit boughtFromFarmer( dcrops[dCropCounter]);
    }
   
    function dealerSetPriceOfCropExpl //for competetion between dealers
    (
        uint16 _cropId,
        uint16 _newPrice
    )
    public
    {
        require ( _cropId >0 && _newPrice >0 && _cropId <=dCropCounter && _newPrice>100,"Enter valid number");
        require ( dealers[msg.sender].isRegistered == true, "You are not registred");
        require ( _newPrice < ((((crops[_cropId].cropPrice)/100) * dealerProfitPercent ) + (crops[_cropId].cropPrice)), "Setting price higher than gov norms are not allowed" );
        dcrops[_cropId].cropPrice =_newPrice;
       // emit newPriceSetByDealer(_newPrice);
       
    }

//functions for subdealer
    function registerSubdealer
    (
        string memory _subdealerName,
        string memory _phoneNumber,
        string memory _email
    )
    public
    {
        require ( msg.sender!= owner ,"owner cant be subdealer" );
        require ( subdealers[msg.sender].isRegistered == false, "You are already registered");
        require (farmers[msg.sender].isRegistered == false, "You are already farmer");
        require (dealers[msg.sender].isRegistered == false, "You are already dealer");
        subdealerCounter++;
        SubDealer memory subdealer = SubDealer (subdealerCounter,_subdealerName,_phoneNumber, _email,msg.sender, true );
        subdealers [msg.sender]=subdealer;
        //emit subdealerRegistered( _subdealerName,_phoneNumber,_email );
    }

    function seeCropsAtDealer 
    (uint16 _cropId)
    public view returns(DCrop memory ) //for subdealer
    {
        require (_cropId >0 && _cropId <= dCropCounter,"Enter valid numbers");
        return dcrops[_cropId];
    }



    function buyFromDealer
    (
        uint16 _cropId,
        uint16 _quantity
    )
    public payable //for subdealer
    {
        require (_cropId <= dCropCounter && _cropId >0 && _quantity >0,"Enter valid numbers");
        require(msg.value == ((dcrops[_cropId].cropPrice)* 1 wei)* _quantity, "Please send exact amount" );
        require ( subdealers[msg.sender].isRegistered == true , "You are not registered" );
        require((dcrops[_cropId].dealer_quantity) >= _quantity,"crop in this quantity is not available");
        //creating subdealers crop instance    
        SDCrop memory sdcrop;
        sdCropCounter++;
        sdcrop.cropId = sdCropCounter;
        //adding crop type to cropType
        //sdcrop.cropType = dcrops [_cropId].cropType;
        sdcrop.farmer_quantity = dcrops[_cropId].farmer_quantity;
        sdcrop.dealer_quantity = (dcrops[_cropId].dealer_quantity) - ( _quantity);
        sdcrop.subdealer_quantity = _quantity;
        sdcrop.cropName = dcrops[_cropId].cropName;
        sdcrop.location = dcrops[_cropId].location;
        sdcrop.farmerAddrs = dcrops[_cropId].farmerAddrs;
        sdcrop.dealerAddrs = dcrops[_cropId].dealerAddrs;
        sdcrop.subdealerAddrs = payable(msg.sender);
        sdcrop.subdealerName = subdealers[msg.sender].subdealerName;
        //sdcrop.isAdded = true;
        sdcrop.cropPrice = (((dcrops[_cropId].cropPrice)/100)* subdealerProfitPercent)+dcrops[_cropId].cropPrice;
        //modifying dealer's crop ( decreasing farmer's qnt)
        dcrops [_cropId].dealer_quantity = ( dcrops[_cropId].dealer_quantity ) - ( _quantity );//changing new dealer qnt
        dcrops[_cropId].dealerAddrs.transfer( ((dcrops[_cropId].cropPrice) * 1 wei)* _quantity );// transferrina money to dealer for his crops
        sdcrops[sdCropCounter] = sdcrop;// adding subdealer's crop to mapping
        //isCropsAvailableForCustomers=true;
        //emit boughtFromDealer( sdcrops[sdCropCounter]);
    }
   
    function subdealerSetPriceOfCropExpl
    (
        uint16 _cropId,
        uint16 _newPrice
    )
    public
    {

        require (_cropId <= sdCropCounter && _cropId>0 && _newPrice>0 && _newPrice>100,"Enter valid numbers");
        require ( subdealers[msg.sender].isRegistered == true, "You are not registred");
        require ( _newPrice < ((((dcrops[_cropId].cropPrice) / 100) * subdealerProfitPercent) + (dcrops[_cropId].cropPrice)), "Setting price higher than gov norms are not allowed" );
        sdcrops[_cropId].cropPrice =_newPrice;
    }
   
//functions for customer
    function seeCropsAtSubdealer 
    (    uint16 _cropId ) 
    public view returns ( SDCrop memory )//SDCrop memory)
    {  
        require ( _cropId <= sdCropCounter && _cropId >0 && sdCropCounter>0,"Enter valid crop Id/No crops available yet");
        return sdcrops[_cropId];
    }



    function buyCrop
    (
        uint16 _cropId,
        uint16 _quantity
    )
    public payable//for customer
    {
        require( dealers[msg.sender].isRegistered == false, "Dealer can't buy crop from subdealer" );
        require( subdealers[msg.sender].isRegistered == false, "Subdealer can't buy crop from subdealer" );
        require ( _cropId <= sdCropCounter && _cropId >0 && sdCropCounter >0,"Enter valid crop Id/crops not available");
        require(msg.value == ((sdcrops[_cropId].cropPrice)* 1 wei)* _quantity, "Please send exact amount" );
        require ( subdealers[msg.sender].addrs != msg.sender , "You cant buy your own crops");//can remove this condition
        require( sdcrops[_cropId].subdealer_quantity >= _quantity ,"This much quantity not available at subdealer");
        uint16 newSubdealerQuantity = (sdcrops[_cropId].subdealer_quantity) - _quantity;
        sdcrops[_cropId].subdealer_quantity = newSubdealerQuantity;
        sdcrops[_cropId].subdealerAddrs.transfer(((sdcrops[_cropId].cropPrice) * 1 wei)*_quantity);
        //emit boughtFromSubdealer(_cropId);
    }


//   function getPriceForQuantityInWeiForCustomer
//   (uint16 _cropId, uint16 _quantity) 
//   public view returns(uint16 _quote) 
//   {
//         require (_cropId >0 && _cropId <= sdCropCounter && _quantity>0 && sdCropCounter>0,"Enter valid numbers/No crops yet");
//         return (((sdcrops[_cropId].cropPrice)* 1 wei)* _quantity);
//     }

//   function getPriceForQuantityInWeiForSubdealer
//   (uint16 _cropId, uint16 _quantity) 
//   public view returns(uint16 _quote) {
         
//         require ( _cropId>0 && _cropId <= sdCropCounter && _quantity >0,"Enter valid crop Id");
//         return (((dcrops[_cropId].cropPrice)* 1 wei)* _quantity);
//     }

   
//     function getPriceForQuantityInWeiForDealer
//     (uint16 _cropId, uint16 _quantity) 
//     public view returns(uint16 _quote) 
//     {
//         require (_cropId >0 && _quantity >0 && _cropId <= dCropCounter,"enter valid number");
//         return (((crops[_cropId].cropPrice)* 1 wei)* _quantity);
//     }
    
    function getPriceForQuantityInWei
    (uint16 _cropId, uint16 _quantity)
    public view returns(uint16 _quote)
    {
        require( _cropId>0 && _quantity>1,"Id or quantity cant be zero!");
        if(dealers[msg.sender].isRegistered == true)
        {
            return (((crops[_cropId].cropPrice)* 1 wei)* _quantity);
        }
        else if (subdealers[msg.sender].isRegistered == true)
        {
            return (((dcrops[_cropId].cropPrice)* 1 wei)* _quantity);
        }
        else{
                return (((sdcrops[_cropId].cropPrice)* 1 wei)* _quantity);
        }
        
    }


}

