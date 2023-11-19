import { post } from './queryClient';

export type MakeInvestigationsResponse = {
  responseText: string;
  responseSource: string;
};

export type MakeInvestigationsPayload = {
  question: string;
  userId: string;
  createdAt?: number;
};

const makeInvestigation = async (payload: MakeInvestigationsPayload): Promise<MakeInvestigationsResponse> => {
  payload.createdAt = Date.now();

  return await post({
    url: '/api/investigations/investigations',
    body: payload,
  });
};

export { makeInvestigation };
