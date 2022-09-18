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

      res.status(200).json(user)
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
