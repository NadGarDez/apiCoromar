const { userInformation } = require("../services/user/user")

const sellerInformationController = async (req,res)=>{
    const {sellerId} = req.params;
    console.log(sellerId,req.params)
    let result;

    try {
        result =  await userInformation(sellerId);
        
        res.json(
            {
                status:'succes',
                data:result.length > 0 ? result : 'User does not exist'
            }
        )
    }
    catch(error){
        res.json(
            {
                status:'error',
                data:error
            }
        )
    }
  

}

module.exports = {
    sellerInformationController
}