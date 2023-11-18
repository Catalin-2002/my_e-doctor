import { useRouter } from 'next/router';
import Button from '../Button/Button';
import SymptomTextInput from '../SymptomTextInput/SymptomTextInput';
import useInvestigations from '@/src/hooks/useInvestigations';
import LoaderModal from '../LoaderModal/LoaderModal';

import InvestigationChat from '../InvestigationChat/InvestigationChat';
import { useAtom, useSetAtom } from 'jotai';
import { investigationResponseAtom, investigationStepAtom, investigationTextAtom } from '@/src/utils/atoms';
import { MakeInvestigationsResponse } from '@/src/utils/queries/investigations';

const Investigation = () => {
  const router = useRouter();
  const { makeInvestigation, isLoading } = useInvestigations();
  const [investigationStep, setInvestigationStep] = useAtom(investigationStepAtom);
  const setInvestigationResponse = useSetAtom(investigationResponseAtom);
  const setInvestigationText = useSetAtom(investigationTextAtom);

  const triggerInvestigation = (text: string) => {
    setInvestigationText(text);

    makeInvestigation(text, {
      onSuccess: (data: MakeInvestigationsResponse) => {
        setInvestigationStep('INVESTIGATION');
        setInvestigationResponse(data.content);
      },
    });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      {isLoading && <LoaderModal />}
      {investigationStep === 'INITIAL' ? (
        <div className="mx-auto flex w-full max-w-[400px] grow flex-col gap-4 text-center">
          <Button onClick={() => router.push('vision-test')} className="w-full" intent="secondary">
            Test your vision
          </Button>
          <span className="text-4 font-medium tracking-widest">OR</span>
          <SymptomTextInput onTrigger={triggerInvestigation} />
        </div>
      ) : (
        <InvestigationChat />
      )}
    </div>
  );
};

export default Investigation;
