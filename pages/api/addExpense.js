import prisma from "../../lib/prisma";
import {getSession} from 'next-auth/react'


export default async function handler(req, res) {

  const session = await getSession({req})

  if(!session) res.status(401).json({error: "Not authenticated"})
  else{
    if (req.method === "POST") {
      try {
        const { concept, expenseType: type, amount, date, email } = req.body;


        if (!concept || !type || !amount || !date) {
          req
            .status(400)
            .json({ err: "Missing data needed in order to create the expense" });
        }

        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });

        if (!user) {
          /* console.log("something went wrong"); */
          req.status(400).json({ err: "User could not be found" });
        }

        const userId = user.id;

        //create first the expense
        const expense = await prisma.expense.create({
          data: {
            date: new Date(date),
            concept,
            type,
            amount: parseFloat(amount),
            userId,
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
