const { userInformation,usersInformation } = require("../services/user/user")

const partnerInformationController = async (req,res)=>{
    const {partnerId} = req.params;
    let result;

    try {
        result =  await userInformation(partnerId);
        
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


partnersInformationController = async (req, res)=>{
    const {partners} = req.body;
    let result;
    try {
        result = await usersInformation(partners);

        const ordered = result.reduce(
            (acumulator,current)=>{
                acumulator[current._id] = current;
                return acumulator;
            },
            {}
        )
        res.json({
            status:'succes',
            data:ordered
        });        
    } catch (error) {
        console.log(error);
        res.json({
            status:'error',
            data:error
        });
    }
}

module.exports = {
    partnerInformationController,
    partnersInformationController
}