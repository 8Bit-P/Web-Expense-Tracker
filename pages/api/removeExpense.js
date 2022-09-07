import prisma from '../../lib/prisma'

export default async function handler(req, res) {
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
