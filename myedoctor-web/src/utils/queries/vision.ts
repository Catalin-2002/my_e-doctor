import { post, request } from './queryClient';

export type GetNextLevelResponse = {
  characters: string;
  testSize: number;
};

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

export const getTestResults = async (testId: string): Promise<GetNextLevelResponse> => {
  return await request({
    url: `/api/investigations/snellen-test/test-results/${testId}`,
  });
};

export type UpdateCameraFramePayload = {
  testId: string;
  cameraFrame: string;
};

export const updateCameraFrame = async (payload: UpdateCameraFramePayload) => {
  return await post({
    url: '/api/investigations/snellen-test/camera-frame',
    body: payload,
  });
};

export type SendCurrentLevelResultsPayload = {
  testId: string;
  currentLevelResults: string;
};

export type SendCurrentLevelResultsResponse = {
  testResults: string | null;
};

export const sendCurrentLevelResults = async (
  payload: SendCurrentLevelResultsPayload
): Promise<SendCurrentLevelResultsResponse> => {
  return await post({
    url: '/api/investigations/snellen-test/current-level-results',
    body: payload,
  });
};
