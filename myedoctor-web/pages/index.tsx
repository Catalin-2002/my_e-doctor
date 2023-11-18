import Button from '@/src/components/Button/Button';

import { GetServerSidePropsContext } from 'next/types';
import useSession from '@/src/hooks/useSession';
import Loader from '@/src/components/Loader/Loader';
import { redirectAuthenticated } from '@/src/helpers/session';
import { getLayout } from '@/src/components/Layout/Layout';

const HomePage = () => {
  const { isLoading, signIn } = useSession();

  if (!isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader color="blue" className="m-auto" size={86} />;
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="mb-6 text-3xl font-semibold">Welcome to MyEDoctor</h1>
        <p className="mb-6 text-gray-600">Your trusted healthcare companion.</p>
        <div className="flex flex-col gap-4">
          <Button onClick={signIn}>Sign In</Button>
          <Button intent="secondary" onClick={signIn}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

HomePage.getLayout = getLayout;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const redirect = await redirectAuthenticated(context);

  if (redirect) return redirect;

  return {
    props: {
      title: 'My E-Doctor',
    },
  };
};

export default HomePage;
