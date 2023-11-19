import { useEffect } from 'react';
import { useState } from 'react';
import TextInput from '../TextInput/TextInput';
import axios from 'axios';
import useVisionTest from '@/src/hooks/useVisionTest';

const VisionTestSteps = () => {
  const [userInput, setUserInput] = useState('');
  const { testId } = useVisionTest();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-center">
        <TextInput name="userInput" type="text" value={userInput} onChange={handleInputChange} />
      </div>
    </div>
  );
};

export default VisionTestSteps;
