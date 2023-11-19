import { useCallback, useEffect, useState } from 'react';
import useUser from './useUser';
import {
  GetNextLevelResponse,
  SendCurrentLevelResultsResponse,
  getNextLevelCharacters,
  initiateTest,
  sendCurrentLevelResults,
} from '../utils/queries/vision';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { characterSizeAtom, testIdAtom } from '../utils/atoms';

const useVisionTest = () => {
  const { user } = useUser();
  const [testId, setTestId] = useAtom(testIdAtom);
  const [testCharacters, setTestCharacters] = useState<string>('');
  const [testCharactersSize, setTestCharactersSize] = useAtom(characterSizeAtom);
  const [testResults, setTestResults] = useState<string | null>(null);

  const createTest = useCallback(
    async (userId: string) => {
      const { testId: createdTestId } = await initiateTest(userId);

      setTestId(createdTestId);
    },
    [setTestId]
  );

  useEffect(() => {
    if (user.userId) {
      createTest(user.userId);
    }
  }, [user.userId, createTest]);

  const { mutate: getNextLevel } = useMutation({
    mutationFn: getNextLevelCharacters,
    onSuccess: (data: GetNextLevelResponse) => {
      setTestCharacters(data.characters);
      setTestCharactersSize(data.testSize);
    },
  });

  const { mutate: sendResults } = useMutation({
    mutationFn: sendCurrentLevelResults,
    onSuccess: (data: SendCurrentLevelResultsResponse) => {
      if (data.testResults) {
        setTestResults(data.testResults);
      } else {
        getNextLevel(testId!);
      }
    },
  });

  return { testId, getNextLevel, sendResults, testCharacters, testCharactersSize, testResults };
};

export default useVisionTest;
