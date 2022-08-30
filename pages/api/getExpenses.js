import prisma from "../../lib/prisma";

export default async function handler(req, res) {



  if (req.method === "POST") {
    try {
      const { email } = req.body;

      let user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      let expenses = await prisma.expense.findMany({
        where: {
          userId: user.id,
        },
      });

      expenses = JSON.parse(JSON.stringify(expenses));
      res.status(200).json(expenses)
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
