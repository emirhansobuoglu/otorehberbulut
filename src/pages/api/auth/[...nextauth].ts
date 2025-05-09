/* eslint-disable check-file/filename-naming-convention */
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { env } from "process";

import prisma from "@/lib/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        name: { label: "name" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.name || !credentials.password) {
          throw new Error("Geçersiz Giriş Denemesi");
        }
        const user = await prisma.user.findUnique({
          where: {
            name: credentials.name,
          },
        });
        if (!user || !user.hashedPassword) {
          throw new Error("Geçersiz Giriş Denemesi");
        }

        const comparePassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!comparePassword) {
          throw new Error("Yanlış Parola");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  debug: env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
