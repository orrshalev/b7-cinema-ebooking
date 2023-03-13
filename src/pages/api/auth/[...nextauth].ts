// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import NextAuth from "next-auth";
// // import { authOptions } from "~/server/auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from 'bcryptjs';
// import { PrismaClient } from "@prisma/client";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";

// const prisma = new PrismaClient();
// const User = {
//     email: "jenny@gmail.com",
//     password: "abc123"
// }

// export default NextAuth({
//     adapter: PrismaAdapter(prisma),
//     providers:[
//         CredentialsProvider({
//             id: "credentials",
//             name:"credentials",
//             credentials: {
//                 email: {
//                     label: "Email",
//                     type: "text",
//                 },
//                 password: {
//                     label: "Password",
//                     type: "password",
//                 }
//             },
//             async authorize(credentials){
//                 const user = await prisma.user.findFirst({where: {email:credentials?.email}});
//                 console.log(credentials?.email);
//                 console.log(credentials?.password);
//                 if(!user) {
//                     console.log("No user found with this email. Please sign up!")
//                 }
                
//                 const checkPassword = await compare(credentials!.password, user.password);

//                 if (!checkPassword || user?.password !== credentials?.email) {
//                     console.log("Email or Password does not match");
//                 }   
//                 // const user = User;
//                 // console.log(credentials);
//                 // const checkPassword = await compare(credentials!.password, user.password);
//                 // if (!checkPassword) console.log("error");

//              return user;
        
//             }
//         })
//     ]
// })

import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";

export default NextAuth(authOptions);