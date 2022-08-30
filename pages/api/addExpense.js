import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === "POST") {
    try{

        const { concept, expenseType: type, amount, date, email } = req.body;
    
        /* TODO: validate inputs */
        
        const user = await prisma.user.findFirst({where:{
            email:email
        }});
    
        if (!user) {
          /* console.log("something went wrong"); */
          req.status(400).json({err: "User could not be found"})
        }
    
        const userId = user.id;

        //create first the expense
        const expense = await prisma.expense.create({
            data:{
                date: new Date(date),
                concept,
                type,
                amount: parseFloat(amount),
                userId,
            }
        })
        
        //201 created resource
        res.status(201).json({ expense });
    }catch(err){
        res.status(400).json(err);
    }
  }else if(req.method === "DELETE"){
    try{
      const {expenseId} = req.body;

      console.log("id is: " + id)

      const deletedExpense = await prisma.expense.delete({
        where:{
          id:expenseId
        }
      })

      res.status(200).json({deletedExpense})

    }catch(err){
      res.status(400).json(err);
    }
  }
}
