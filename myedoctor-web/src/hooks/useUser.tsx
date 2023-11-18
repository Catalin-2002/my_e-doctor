import { getUser, updateUser } from '@utils/queries/user';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useUser = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', session?.user.userId],
    queryFn: () => getUser(session?.user.userId!),
    enabled: !!session?.user.userId,
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
  return { user, isLoading, updateUser: mutate, isUpdateLoading, error };
};

export default useUser;
