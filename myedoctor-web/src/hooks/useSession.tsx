import { logout } from '../helpers/session';
import useUser from './useUser';
import { signIn as signInBase } from 'next-auth/react';

const useSession = () => {
  const { isLoading } = useUser();

  const signIn = () => {
    signInBase('cognito', { callbackUrl: '/investigate' });
  };

  const signOut = () => {
    logout();
  };

  return { signIn, signOut, isLoading };
};

export default useSession;
