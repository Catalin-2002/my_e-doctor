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
    <>
      <div className="flex min-h-screen w-full flex-col bg-prussian-blue  md:flex-row">
        <div className="flex w-2/5 flex-col items-start justify-center pl-24">
          <img src="/icon3.png" alt="Icon" className="h-50 w-50 m-auto" />
        </div>
        <div className="flex w-full max-w-[1000px] flex-col justify-center pr-24">
          <h1 className="text-move mb-8 text-5xl font-bold text-neon-blue">Healthcare Simplified, Life Amplified</h1>
          <p className="mb-8 text-3xl font-semibold tracking-wide text-white">
            My E-Doctor, where your health journey transitions from guesswork to precision with just a few clicks. As a signed-in
            user, simply tell us what's on your mind or pick a test and let our intelligent system suggest the right assessments
            for your symptoms. Dive into a comprehensive array of tests, from eye exams to specialist referrals, all tailored to
            your needs and location.
          </p>
          <Button onClick={signIn} className="hover-hov-green h-16 w-[200px] bg-mint-green p-4 text-2xl">
            Get started
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        {/* Secțiunea 1 */}
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="flex w-3/4">
            <img src="/path-to-your-image1.jpg" alt="Descriere imagine" className="w-1/2 object-cover" />
            <div className="w-1/2 p-8">
              <h2 className="mb-4 text-4xl font-bold">Titlu secțiune 1</h2>
              <p className="text-lg">Descrierea pentru secțiunea 1...</p>
            </div>
          </div>
        </div>

        {/* Secțiunea 2 */}
        <div className="flex min-h-screen items-center justify-center bg-gray-200">
          <div className="flex w-3/4">
            <div className="w-1/2 p-8">
              <h2 className="mb-4 text-4xl font-bold">Titlu secțiune 2</h2>
              <p className="text-lg">Descrierea pentru secțiunea 2...</p>
            </div>
            <img src="/path-to-your-image2.jpg" alt="Descriere imagine" className="w-1/2 object-cover" />
          </div>
        </div>

        {/* Adaugă mai multe secțiuni după acest model */}
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
      title: 'MyeDoctor',
    },
  };
};

export default HomePage;
