import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '~/server/db';
import { api } from '~/utils/api';
import bcrypt from 'bcrypt'

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers:[
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: "email", type: "email", placeholder: "me@email.com"},
        password: { label: "Password", type: "password"}
      },
      async authorize(credentials, req){
        const {email, password} = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findFirst({where: {email: email}})

        if (user == null) {
          throw new Error('Incorrect credentials')
        }
        if (await bcrypt.compare(password, user.password) === true) {
          return {
            email: email, 
            name: user.firstName + " " + user.lastName,
            isAdmin: true
          }
        }
        else {
          throw new Error('Incorrect credentials')
        }
      }
    })
  ],
  pages: {
    signIn: '../../login'
  },
  callbacks: {
    jwt(params) {
      if (params.user?.isAdmin) {
        params.token.isAdmin = params.user.isAdmin;
      }
      return params.token
    }
  }
}

export default NextAuth(authOptions);