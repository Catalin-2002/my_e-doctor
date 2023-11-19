import TextInput from '../TextInput/TextInput';
import useVisionTest from '@/src/hooks/useVisionTest';
import TestBox from './TestBox';
import Button from '../Button/Button';
import { useState } from 'react';

const VisionTest = () => {
  const { testId, getNextLevel, testCharacters, testCharactersSize, sendResults } = useVisionTest();
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="mx-auto flex w-full max-w-[700px] flex-col items-center gap-5">
        <TestBox
          testCharacters={testCharacters.join()}
          size={testCharactersSize}
          triggerInitialLoad={() => getNextLevel(testId!)}
        />
        {testCharacters && testId && (
          <div className="flex gap-2 self-start">
            <TextInput
              name="inputText"
              label="Enter visible text"
              onChange={(event) => setInputValue(event.target.value)}
              value={inputValue}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  sendResults({
                    testId,
                    currentLevelResults: inputValue,
                  });
                }
              }}
            />
            <Button
              onClick={() =>
                sendResults({
                  testId,
                  currentLevelResults: inputValue,
                })
              }
            >
              Check
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisionTest;
