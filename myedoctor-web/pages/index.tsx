import Button from '@/src/components/Button/Button';

import { GetServerSidePropsContext } from 'next/types';
import useSession from '@/src/hooks/useSession';
import Loader from '@/src/components/Loader/Loader';
import { redirectAuthenticated } from '@/src/helpers/session';
import { getLayout } from '@/src/components/Layout/Layout';
import Image from 'next/image';

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
    <>
      <div className="flex min-h-screen w-full flex-col bg-prussian-blue  md:flex-row">
        <div className="flex w-2/5 flex-col items-end justify-center pl-24">
          <Image src="/icon3.png" alt="Icon" height={400} width={400} className="cover m-auto shrink-0" />
        </div>
        <div className="flex w-2/5 flex-col justify-center pr-24">
          <h1 className="text-move mb-8 text-5xl font-bold text-neon-blue">Healthcare Simplified, Life Amplified</h1>
          <p className="mb-8 text-2xl font-medium tracking-wide text-white">
            My E-Doctor, where your health journey transitions from guesswork to precision with just a few clicks. As a signed-in
            user, simply tell us what&#39;s on your mind or pick a test and let our intelligent system suggest the right
            assessments for your symptoms. Dive into a comprehensive array of tests, from eye exams to specialist referrals, all
            tailored to your needs and location.
          </p>
          <Button onClick={signIn} className="hover-hov-green h-16 w-[200px] bg-mint-green p-4 text-2xl">
            Get started
          </Button>
        </div>
      </div>
    </>
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
