import prisma from "../../lib/prisma";
import {getSession} from 'next-auth/react'


export default async function handler(req, res) {
  const session = await getSession({req})

  if(!session) res.status(401).json({error: "Not authenticated"})
  else{
  if (req.method === "POST") {
    try {
      const { concept, amount, date, email,id } = req.body;


      /* TODO: validate inputs */



      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!user) {
        /* console.log("something went wrong"); */
        req.status(400).json({ err: "User could not be found" });
      }

      //create first the expense

      const expense = await prisma.expense.update({
        where:{
            id
        },
        data: {
          date: new Date(date),
          concept,
          amount: parseFloat(amount),
        },
      });

      //201 created resource
      res.status(201).json({ expense });
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
}
