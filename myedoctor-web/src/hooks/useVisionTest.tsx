import { useMemo } from 'react';
import useUser from './useUser';
import { initiateTest } from '../utils/queries/vision';

const useVisionTest = () => {
  const { user } = useUser();

  const testId = useMemo(async () => {
    if (!user.userId) return null;

    const { testId } = await initiateTest(user.userId!);
  }, [user]);

  return { testId };
};

export default useVisionTest;
