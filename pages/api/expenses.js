import { prisma } from '../../lib/prisma';

export default async function handler(req,res){

    if(req.method === 'POST'){
        try{
            const {concept, type, amount, email} = req.body;

            //check if userId exists and amount is a number

            const user = await prisma.user.findUnique({where:{
                email:email
            }})
            
            if(!user){
                console.log("something went wrong")
            }
            
            console.log(user);
            
            /* const userId = user.id;


            const expense = await prisma.expense.create({
                data: {
                    concept,
                    type,
                    amount,
                    userId
                }
            }) */
            
            res.status(200).json({expense});
    
        }catch(err){
            res.status(400).json({err});
        }
    }

}