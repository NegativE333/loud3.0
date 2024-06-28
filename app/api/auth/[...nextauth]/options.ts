import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import db from '@/db/drizzle';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any): Promise<any> {
        try {
          const getUser = await db.select().from(user).where(eq(user.email, credentials.email));

          if (getUser.length === 0) {
            throw new Error('No user found with this email');
          }

          if (!getUser[0].isVerified) {
            throw new Error('User not verified');
          }

          const isPasswordCorrect = await bcrypt.compare(credentials.password, getUser[0].password);

          if (isPasswordCorrect) {
            return getUser[0];
          } else {
            throw new Error('Incorrect password');
          }
        } catch (error: any) {
          throw new Error(error);
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.isVerified = token.isVerified;
        session.user.name = token.name;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isVerified = user.isVerified;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    }
  },
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};