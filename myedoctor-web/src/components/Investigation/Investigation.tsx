import { useRouter } from 'next/router';
import Button from '../Button/Button';
import SymptomTextInput from '../SymptomTextInput/SymptomTextInput';

const Investigation = () => {
  const router = useRouter();

  const triggerInvestigation = (text: string) => {
    console.log(text);
  };

  return (
    <div className="m-auto flex w-[400px] flex-col items-center  gap-2">
      <Button onClick={() => router.push('vision-test')} className="w-full" intent="secondary">
        Test your vision
      </Button>
      <span className="text-4 font-medium">or</span>
      <SymptomTextInput onTrigger={triggerInvestigation} />
    </div>
  );
};

export default Investigation;
