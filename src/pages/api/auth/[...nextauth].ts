import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "me@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        const { email, password } = credentials;
        const user = await prisma.user.findFirst({ where: { email: email } });

        if (user == null) {
          throw new Error("Incorrect credentials");
        }
        // Added because encryption not happening on client side yet
        if (user.password == password) {
          return { email: email, name: user.firstName + " " + user.lastName };
        }
        if ((await bcrypt.compare(password, user.password)) === true) {
          return { email: email, name: user.firstName + " " + user.lastName };
        } else {
          throw new Error("Incorrect credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "../../login",
  },
};

export default NextAuth(authOptions);
