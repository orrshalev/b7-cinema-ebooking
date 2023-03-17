import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '~/server/db';
import { api } from '~/utils/api';

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

        // throw new Error(user?.email)
        if (user == null) {
          throw new Error('Invalid email or password')
        }
        if (user.email == email) {
          throw new Error('Login Successful!')
        }
      }
    })
  ],
  pages: {
    signIn: '../../login'
  }
}

export default NextAuth(authOptions);