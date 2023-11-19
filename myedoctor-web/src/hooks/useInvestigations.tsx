import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeInvestigation } from '@utils/queries/investigations';
import { useAtom, useSetAtom } from 'jotai';
import { investigationResponseAtom, investigationResponseSourceAtom, investigationStepAtom } from '@/src/utils/atoms';

const useInvestigations = () => {
  const queryClient = useQueryClient();
  const [_, setInvestigationStep] = useAtom(investigationStepAtom);
  const setInvestigationResponse = useSetAtom(investigationResponseAtom);
  const setInvestigationResponseSource = useSetAtom(investigationResponseSourceAtom);

  const { mutate: makeInvestigationMutate, isLoading } = useMutation({
    mutationFn: makeInvestigation,
    onSuccess: (data) => {
      setInvestigationStep('INVESTIGATION');
      setInvestigationResponse(data.responseText);
      setInvestigationResponseSource(data.responseSource);
      queryClient.invalidateQueries({ queryKey: ['investigations'] });
    },
  });

  return { makeInvestigation: makeInvestigationMutate, isLoading };
};

export default useInvestigations;
