import nodemailer from 'nodemailer';
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length: number) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

console.log(generateString(5));

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
  
      const mailOptions = {
        from: 'eilenej12345@gmail.com',
        to: req.body,
        subject: "Cinema E-Booking: Change Your Password",
        text: "Here is the code to change your password: " + code + "\nDO NOT share this code with anyone.",
      };

      localStorage.setItem("pwCode", code)
  
      try {
        await transporter.sendMail(mailOptions);
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