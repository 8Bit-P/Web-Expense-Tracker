//import { prisma } from '../../lib/prisma';
import { PrismaClient } from ".prisma/client";

export default async function handler(req,res){
    
    const prisma = new PrismaClient();

    try{

        const expenses = await prisma.expense.findMany();

        return {
            props: {expenses},
            revalidate: 10, //en segundos
        }

    }catch(err){
        res.status(400).json({err});
    }
}