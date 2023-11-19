import TextInput from '../TextInput/TextInput';
import useVisionTest from '@/src/hooks/useVisionTest';
import TestBox from './TestBox';
import Button from '../Button/Button';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { testIdAtom } from '@/src/utils/atoms';

const VisionTest = () => {
  const { getNextLevel, testCharacters, testCharactersSize, sendResults, testResults } = useVisionTest();
  const [inputValue, setInputValue] = useState<string>('');

  const testId = useAtomValue(testIdAtom);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="mx-auto flex w-full max-w-[700px] flex-col items-center gap-5">
        {testResults && (
          <div className="flex flex-col text-center">
            <span className="text-lg">Your test results are:</span>
            <span className="text-2xl font-semibold text-neon-green">{testResults}</span>
          </div>
        )}
        {!testResults && (
          <TestBox testCharacters={testCharacters} size={testCharactersSize} triggerInitialLoad={() => getNextLevel(testId!)} />
        )}
        {!testResults && testCharacters && testId && (
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
              Verify
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisionTest;
