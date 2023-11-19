import { getLayout } from '@/src/components/Layout/Layout';
import UserProfile from '@/src/components/UserProfile/UserProfile';
import { redirectUnauthenticated } from '@/src/helpers/session';
import { GetServerSidePropsContext } from 'next/types';

const ProfilePage = () => {
  return <UserProfile />;
};

ProfilePage.getLayout = getLayout;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const redirect = await redirectUnauthenticated(context);

  if (redirect) return redirect;

  return {
    props: {
      title: 'My E-Doctor - Profile',
    },
  };
};
export default ProfilePage;
