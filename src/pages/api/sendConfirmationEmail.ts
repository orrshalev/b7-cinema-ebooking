import nodemailer from 'nodemailer';
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import { string } from 'zod';
import { prisma } from '~/server/db';

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length: number) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

async function sendConfirmationEmail(req: NextApiRequest, res: NextApiResponse) {
    const code = generateString(6)

    if (req.method === 'POST') {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailConfigurations = {
        from: process.env.EMAIL_USER,
        to: req.body as string,
        subject: "Cinema E-Booking: Change Your Password",
        text: "Here is the code to change your password: " + code + "\nDO NOT share this code with anyone.",
      };
      const user = await prisma.user.findFirst({ where: {email: req.body as string}})
  
      try {
        if (user == null) {
          res.status(404).json({ error: 'User does not exist' });
          return
        }
        await prisma.user.update({
          where: { id: user.id },
          data: { changePwCode: code}
        })
        await transporter.sendMail(mailConfigurations);
        console.error(res.status);
        res.status(200).json({ success: true });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email' });
      }
  
      res.status(200).json({ success: true });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }

  export default sendConfirmationEmail;