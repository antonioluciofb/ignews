import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { Fauna } from "../../../services/fauna";
import { query as q } from "faunadb";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ name, email }: any) {
      try {
        // await Fauna.query(q.Create(q.Collection("users"), { data: { name, email } }));
        await Fauna.query(
          q.If(
            q.Not(q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))),
            q.Create(q.Collection("users"), { data: { name, email } }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
          )
        );
      } catch (error) {
        console.log("error ============>", error);
        return false;
      }

      return true;
    },
  },
});
