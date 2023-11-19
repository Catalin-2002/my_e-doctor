import { useRouter } from 'next/router';
import Button from '../Button/Button';
import SymptomTextInput from '../SymptomTextInput/SymptomTextInput';
import useInvestigations from '@/src/hooks/useInvestigations';
import LoaderModal from '../LoaderModal/LoaderModal';
import { useAtomValue, useSetAtom } from 'jotai';
import useUser from '@/src/hooks/useUser';
import InvestigationChat from '../InvestigationChat/InvestigationChat';
import { investigationStepAtom, investigationTextAtom } from '@/src/utils/atoms';

const Investigation = () => {
  const router = useRouter();
  const { makeInvestigation, isLoading } = useInvestigations();
  const { user } = useUser();
  const setInvestigationText = useSetAtom(investigationTextAtom);
  const investigationStep = useAtomValue(investigationStepAtom);

  const triggerInvestigation = (text: string) => {
    setInvestigationText(text);
    makeInvestigation({ userId: user.userId!, question: text });
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
