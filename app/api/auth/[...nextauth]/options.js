import { connectDB } from "@/app/lib/connectDb";
import User from "@/app/Models/User";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        let userRole = "user";
        return {
          ...profile,
          role: userRole,
          id: profile.id,
          image: profile.avatar_url,
        };
      },

      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      profile(profile) {
        let userRole = "user";
        return {
          ...profile,
          role: userRole,
          id: profile.sub,
          image: profile.picture,
        };
      },

      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    FacebookProvider({
      profile(profile) {
        let userRole = "user";
        return {
          ...profile,
          role: userRole,
          id: profile.id, 
          image: profile.picture.data.url,
        };
      },
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      try {
        await connectDB();
        const user = await User.findOne({ userId: token.id });
        if (user) {
          session.user.role = user.role; // Ensure session role is the latest from DB
          session.user.id = token.id;
          session.user.image = token.picture;
        }
      } catch (err) {
        console.error("Error fetching user role from database:", err);
      }

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectDB();
        if (profile?.email) {
          const userExists = await User.findOne({ email: profile.email });
          if (!userExists) {
            await User.create({
              username: profile.name.toLowerCase(),
              email: profile.email,
              userId: profile.id || profile.sub,
              role: "user",
            });
          }
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
