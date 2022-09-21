import prisma from "../../lib/prisma";
import {getSession} from 'next-auth/react'


export default async function handler(req, res) {
  const session = await getSession({req})

  if(!session) res.status(401).json({error: "Not authenticated"})
  else{
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
}
