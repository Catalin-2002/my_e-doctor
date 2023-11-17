import Button from '@/src/components/Button/Button';
import { GetSessionParams, getSession } from 'next-auth/react';

import { GetServerSidePropsContext } from 'next/types';
import useSession from '@/src/hooks/useSession';
import Loader from '@/src/components/Loader/Loader';

const Home = () => {
  const { isLoading, signIn } = useSession();

  if (!isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader color="blue" className="m-auto" size={86} />;
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="mb-6 text-3xl font-semibold">Welcome to MyEDoctor</h1>
        <p className="mb-6 text-gray-600">Your trusted healthcare companion.</p>
        <div className="flex flex-col gap-4">
          <Button onClick={signIn}>Sign In</Button>
          <Button variant="secondary" onClick={signIn}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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

  return {
    props: {
      title: 'MyeDoctor',
    },
  };
};

export default Home;
