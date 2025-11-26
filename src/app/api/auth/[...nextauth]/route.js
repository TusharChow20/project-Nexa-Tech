import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordCheck = await bcrypt.compare(password, user.password);
          if (!passwordCheck) {
            return null;
          }
          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          await connectDB();
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create new user with Google profile image
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image, // Save Google profile image
              password: await bcrypt.hash(Math.random().toString(36), 10),
            });
          } else {
            // Update existing user's image if they log in with Google
            await User.findOneAndUpdate(
              { email: user.email },
              { image: user.image }
            );
          }
          return true;
        } catch (error) {
          console.log("Error with Google sign-in:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Fetch the latest user data from database to get image
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email });
        session.user.image = dbUser?.image || null;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export default authOptions;
