import nodemailer from 'nodemailer';
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import { string } from 'zod';


async function sendConfirmationEmailRegister(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'eilenej12345',
          pass: 'vcgalleqzmphzogt', 
        },
      });
  
      const mailConfigurations = {
        from: 'eilenej12345@gmail.com',
        to: req.body.email as string,
        subject: "Cinema E-Booking: Register Confirmation",
        text: "Here is the code to register your account: " + req.body.code + "\nDO NOT share this code with anyone.",
      };

      // TO DO: store verification code

    //   if (typeof(Storage) !== "undefined") 
    //   localStorage.setItem("pwCode", code)
    //   console.log(localStorage.getItem("pwCode"))
  
      try {
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

  export default sendConfirmationEmailRegister;