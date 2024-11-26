import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { JWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";


declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    expiresAt?: number;
  }

  interface User {
    accessToken: string;
    expiresAt: number;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        nip: { label: "Nip", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("data",credentials);
        
        // Make a request to your Express.js backend to verify credentials
        const res = await fetch("https://project-be-production-81c4.up.railway.app/v1/auth/login", {
          // const res = await fetch("http://127.0.0.1:1234/v1/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const data = await res.json();

        if (res.ok && data.accessToken) {
          return {
            id: data.iat.toString(), // Using iat as a unique identifier
            accessToken: data.accessToken,
            expiresAt: data.exp
          };
        } else {
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken as string; // Pastikan sebagai string
        token.expiresAt = user.expiresAt as number; // Pastikan sebagai number
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string; // Pastikan sebagai string
      session.expiresAt = token.expiresAt as number; // Pastikan sebagai number
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/adminhome/sso")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };