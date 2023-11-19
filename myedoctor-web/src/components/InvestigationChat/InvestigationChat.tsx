import { useAtomValue, useSetAtom } from 'jotai';
import UserPicture from '../UserPicture/UserPicture';
import {
  investigationResponseAtom,
  investigationResponseSourceAtom,
  investigationStepAtom,
  investigationTextAtom,
} from '@/src/utils/atoms';
import Button from '../Button/Button';
import Image from 'next/image';

const InvestigationChat = () => {
  const investigationText = useAtomValue(investigationTextAtom);
  const investigationResponse = useAtomValue(investigationResponseAtom);
  const investigationResponseSource = useAtomValue(investigationResponseSourceAtom);
  const setInvestigationStep = useSetAtom(investigationStepAtom);

  return (
    <div className="lex-col mx-auto flex h-full w-full items-center justify-center px-20 py-10">
      <div className="mx-auto flex max-w-[600px] flex-col items-center gap-8">
        <div className="flex w-full gap-2 rounded-sm border-b-[1px] border-b-gray-600 px-4 pb-2">
          <UserPicture className="h-12 w-12 shrink-0" iconClassName="text-[20px]" />
          <div className="min-h-[46px] rounded-lg p-2">{investigationText}</div>
        </div>
        <div className="flex flex-col gap-2">
          <Image alt="icon" src="/icon.png" width={48} height={48} />
          <div className="min-h-[46px] w-full  rounded-lg bg-gray-200 p-2">{investigationResponse}</div>
          <div className="flex items-center gap-4 self-end font-normal italic">
            <span>Feel like reading more about it?</span>
            <Button
              onClick={() => window.open(investigationResponseSource, '_blank')}
              intent="secondary"
              className="w-[150px] self-end"
            >
              Go to Source
            </Button>
          </div>
          <Button intent="text" className="text-md mt-5 w-full text-gray-600" onClick={() => setInvestigationStep('INITIAL')}>
            Ask again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvestigationChat;
