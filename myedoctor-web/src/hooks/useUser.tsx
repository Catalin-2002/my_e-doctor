import { getUser } from "@utils/queries/user";
import { useSession } from "next-auth/react";
import { useQuery } from '@tanstack/react-query';


const useUser = () => {
  const { data: session } = useSession();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', session?.user.userId],
    queryFn: () => getUser(session?.user.userId!),
    enabled: !!session?.user.userId,
  });

  return { user, isLoading };
}

export default useUser;