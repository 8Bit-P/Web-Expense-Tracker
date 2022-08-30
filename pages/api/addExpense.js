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
    
        res.status(200).json({ expense });
    }catch(err){
        res.status(400).json(err);
    }
  }
}
