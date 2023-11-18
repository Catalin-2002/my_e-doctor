import { createUser, getUser, updateUser } from '@utils/queries/user';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const useUser = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', session?.user.userId],
    queryFn: () => getUser(session?.user.userId!),
    enabled: !!session?.user.userId,
    refetchOnWindowFocus: false,
  });

  const {
    mutate,
    error,
    isLoading: isUpdateLoading,
  } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', user?.userId] });
      toast.success('Profile successfully updated!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    },
  });

  const { mutate: createUserMutate } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  useEffect(() => {
    if (session?.user && !isLoading) {
      createUserMutate({
        userId: session.user.userId,
        email: session.user.email,
        firstName: session.user.name?.split(' ')[0],
        lastName: session.user.name?.split(' ')[1],
      });
    }
  }, [session, isLoading]);

  return { user: { ...user, imageLocation: session?.user.image }, isLoading, updateUser: mutate, isUpdateLoading, error };
};

export default useUser;
