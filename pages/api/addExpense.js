import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { concept, expenseType: type, amount, date, email } = req.body;

      /* TODO: ADD JSON WEB TOKEN */
      /* TODO: validate inputs */
      /* console.log(concept, type, amount, date, email) */

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
