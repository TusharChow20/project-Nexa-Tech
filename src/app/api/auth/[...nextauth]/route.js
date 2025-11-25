import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
const authOptions = {
  providers: [
    Credentials({
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export default authOptions;
