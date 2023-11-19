import { post, request } from './queryClient';

export const initiateTest = async (userId: string) => {
  return await post({
    url: '/api/investigations/snellen-test/start-test',
    body: { userId },
  });
};

export const getNextLevelCharacters = async (testId: string) => {
  return await request({
    url: `/api/investigations/snellen-test/next-level-characters/${testId}`,
  });
};

export const getTestResults = async (testId: string) => {
  return await request({
    url: `/api/investigations/snellen-test/test-results/${testId}`,
  });
};

export type SendCurrentLevelResultsPayload = {
  testId: string;
  currentLevelResults: string;
};

export const sendCurrentLevelResults = async (payload: SendCurrentLevelResultsPayload) => {
  return await post({
    url: '/api/investigations/snellen-test/current-level-results',
    body: payload,
  });
};
