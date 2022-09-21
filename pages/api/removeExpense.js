import prisma from '../../lib/prisma'
import {getSession} from 'next-auth/react'


export default async function handler(req, res) {
  const session = await getSession({req})

  if(!session) res.status(401).json({error: "Not authenticated"})
  else{
 if(req.method === "POST"){
    try{
      const {id} = req.body;

      /* TODO: check email to see if expenseid belongs to user */

      const deletedExpense = await prisma.expense.delete({
        where:{
          id:id
        }
      })

      res.status(200).json({deletedExpense})

    }catch(err){
      res.status(400).json(err);
    }
  }
}
}
