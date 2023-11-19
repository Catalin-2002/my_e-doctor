import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';
import jwt_decode from 'jwt-decode';
import { post } from '@/src/utils/queries/queryClient';

export default NextAuth({
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER,
      idToken: true,
      checks: 'nonce',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day in seconds
  },
  callbacks: {
    async jwt({ token, account }) {
      // Initial sign in
      if (account?.id_token) {
        const decoded: any = jwt_decode(account?.id_token);

        token.accessToken = account.id_token;
        token.sub = decoded.sub;
        token.accessTokenExpires = account.expires_at ? new Date(account.expires_at * 1000).getTime() : Date.now();
      }

      // Return previous token if the access token has not expired yet
      if (token.accessTokenExpires && Date.now() < Number(token.accessTokenExpires)) {
        return token;
      } else {
        return {
          ...token,
          error: 'ExpiredAccessTokenError',
        };
      }
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.userId = token.sub!;
        session.accessToken = token.accessToken as string;
        session.accessTokenExpires = token.accessTokenExpires as Date;
        session.error = token.error as string | undefined;
      }

      return session;
    },
    async signIn({ user, profile }) {
      post({ url: `${process.env.API_SERVER_URL}/api/v1/user/create`, body: { userId: profile?.sub, email: user.email } }).catch(
        (err) => console.error(err)
      );

      return true;
    },
  },
  secret: process.env.SECRET,
});
