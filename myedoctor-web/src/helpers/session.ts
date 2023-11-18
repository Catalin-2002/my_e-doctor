import { GetSessionParams, getSession, signOut } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next/types';

export const logout = async () => {
  await signOut();
  window.location.href = `${process.env.NEXT_PUBLIC_COGNITO_URL}/logout?client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}&logout_uri=${process.env.NEXT_PUBLIC_LOGOUT_URL}&redirect_uri=${process.env.NEXT_PUBLIC_LOGOUT_URL}`;
};

export const redirectUnauthenticated = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context as GetSessionParams);

  if (!session?.user.userId) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
        revalidate: 60 * 60,
      },
    };
  }

  return null;
};

export const redirectAuthenticated = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context as GetSessionParams);

  if (session?.user.userId) {
    return {
      redirect: {
        permanent: false,
        destination: '/investigate',
        revalidate: 60 * 60,
      },
    };
  }

  return null;
};
