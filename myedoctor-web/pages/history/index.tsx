import { getLayout } from '@/src/components/Layout/Layout';
import LoaderModal from '@/src/components/LoaderModal/LoaderModal';
import { redirectUnauthenticated } from '@/src/helpers/session';
import useUser from '@/src/hooks/useUser';
import { useQueries, useQuery } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';

const HistoryPage = () => {
  const { user } = useUser();
  const { data: investigations, isLoading } = useQuery({
    queryKey: ['investigations', user.userId],
    queryFn: () => [],
    enabled: !!user.userId,
    refetchOnWindowFocus: false,
  });

  return <div>{isLoading && <LoaderModal text="Retrieving past enquiries..." />}</div>;
};

HistoryPage.getLayout = getLayout;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const redirect = await redirectUnauthenticated(context);

  if (redirect) return redirect;

  return {
    props: {
      title: 'My E-Doctor - History',
    },
  };
};

export default HistoryPage;
