import Investigation from '@/src/components/Investigation/Investigation';
import { getLayout } from '@/src/components/Layout/Layout';
import { redirectUnauthenticated } from '@/src/helpers/session';
import { GetServerSidePropsContext } from 'next/types';

const InvestigationPage = () => {
  return (
    <div className="m-auto flex h-full min-h-[100vh] grow items-center justify-center">
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
      title: 'MyeDoctor - investigate',
    },
  };
};

export default InvestigationPage;
