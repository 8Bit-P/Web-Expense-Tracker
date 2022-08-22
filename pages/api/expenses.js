import { prisma } from '../../lib/prisma';

export default async function handler(req,res){

    if(req.method === 'POST'){
        try{
    
            const {concept, type, amount, userId} = req.body;

            const expense = await prisma.expense.create({
                data: {
                    concept,
                    type,
                    amount,
                    userId
                }
            })
            
            res.status(200).json({expense});
    
        }catch(err){
            res.status(400).json({err});
        }
    }

}