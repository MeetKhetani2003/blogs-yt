import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import dbConnect from '@/lib/db';
import { User } from '@/models/User';

// Helper to generate unique username
const generateUniqueUsername = async (name: string) => {
    let baseSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!baseSlug) baseSlug = 'user';
    
    let isUnique = false;
    let username = baseSlug;
    let counter = 1;

    while (!isUnique) {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            isUnique = true;
        } else {
            username = `${baseSlug}_${counter < 10 ? '0' : ''}${counter}`;
            counter++;
        }
    }

    return username;
};

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
  ...authConfig,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          await dbConnect();
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const username = await generateUniqueUsername(user.name || 'user');
            
            await User.create({
              name: user.name || 'User',
              email: user.email || '',
              username: username,
              image: user.image || '',
              provider: 'google',
              providerId: account.providerAccountId,
              role: 'ADMIN', // Enforced for workspace testing
            });
          } else if (existingUser.role !== 'ADMIN') {
            // Automatically upgrade existing user to ADMIN for testing
            existingUser.role = 'ADMIN';
            await existingUser.save();
          }
          return true;
        } catch (error) {
          console.error("Error during Google signIn:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
        // If it's a sign in, user will be available
        if (user) {
            await dbConnect();
            const dbUser = await User.findOne({ email: user.email });
            if (dbUser) {
                token.id = dbUser._id.toString();
                token.username = dbUser.username;
                token.role = 'ADMIN'; // Enforce admin to bypass cached session
            }
        } else {
             token.role = 'ADMIN'; // Force admin for testing even if already logged in previously
        }
        
        // Handle profile updates
        if (trigger === "update" && session) {
            token.username = session.username ?? token.username;
            token.picture = session.image ?? token.picture;
            token.name = session.name ?? token.name;
        }

        return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
