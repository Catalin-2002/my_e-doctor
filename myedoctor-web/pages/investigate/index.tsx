import Investigation from '@/src/components/Investigation/Investigation';
import Suggestions from '@/src/components/Investigation/Suggestions';
import { getLayout } from '@/src/components/Layout/Layout';
import { redirectUnauthenticated } from '@/src/helpers/session';
import { GetServerSidePropsContext } from 'next/types';

const InvestigationPage = () => {
  return (
    <div className="m-auto flex h-full min-h-[100vh] grow flex-col items-center justify-center">
      <Investigation />
    </div>
  );
};

InvestigationPage.getLayout = getLayout;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const redirect = await redirectUnauthenticated(context);

  if (redirect) return redirect;

  return {
    props: {
      title: 'My E-Doctor - Investigate',
    },
  };
};

export default InvestigationPage;
