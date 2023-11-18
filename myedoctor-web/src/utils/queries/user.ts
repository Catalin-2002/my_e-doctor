import { Location, OccupationField, User } from '@/src/types/user';
import { put, request } from './queryClient';

export type UserUpdatePayload = {
  userId: string;
  firstName?: string;
  lastName?: string;
  location?: Location;
  dateOfBirth?: number;
  occupation?: OccupationField;
};

const getUser = async (userId: string) => {
  return (await request({
    url: `/api/service/user/${userId}`,
  })) as User;
};

const updateUser = async (payload: UserUpdatePayload) => {
  return await put({
    url: `/api/service/user/${payload.userId}`,
    body: payload,
  });
};

export { getUser, updateUser };
