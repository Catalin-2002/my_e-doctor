import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeInvestigation } from '@utils/queries/investigations';

const useInvestigations = () => {
  const queryClient = useQueryClient();

  const { mutate: makeInvestigationMutate, isLoading } = useMutation({
    mutationFn: makeInvestigation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investigations'] });
    },
  });

  return { makeInvestigation: makeInvestigationMutate, isLoading };
};

export default useInvestigations;
