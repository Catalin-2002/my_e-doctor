import { getUser, updateUser } from '@utils/queries/user';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useUser = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: userFetched, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(session?.user.userId!),
    enabled: !!session?.user,
    refetchOnWindowFocus: false,
  });

  const {
    mutate,
    error,
    isLoading: isUpdateLoading,
  } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
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

  return { user: { ...userFetched, imageLocation: session?.user.image }, isLoading, updateUser: mutate, isUpdateLoading, error };
};

export default useUser;
