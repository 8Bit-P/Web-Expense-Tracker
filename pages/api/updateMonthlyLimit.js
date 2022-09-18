import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { limit, email } = req.body;

      
      if (limit > 1000000) {
          req.status(400).json({ err: "Unrealistic amount of money" });
        }
        
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        
        if (!user) {
            
            req.status(400).json({ err: "User could not be found" });
        }
        
        const updateUser = await prisma.user.update({
            where: {
                id:user.id,
            },
            data: {
                balance:parseFloat(limit)
            },
        })
    
        console.log("aqui")

      //201 created resource
      res.status(201).send(updateUser);
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
