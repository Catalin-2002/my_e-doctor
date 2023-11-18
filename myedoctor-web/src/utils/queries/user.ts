import { Location, User } from '@/src/types/user';
import { post, put, request } from './queryClient';

export type UserUpdatePayload = {
  userId: string;
  firstName?: string;
  lastName?: string;
  location?: Location;
  dateOfBirth?: number;
  occupationField?: string;
};

const getUser = async (userId: string) => {
  return (await request({
    url: `/api/service/users/${userId}`,
  })) as User;
};

const updateUser = async (payload: UserUpdatePayload) => {
  return await put({
    url: `/api/service/users/${payload.userId}`,
    body: payload,
  });
};

const createUser = async (user: Partial<User>) => {
  return await post({
    url: `/api/service/users`,
    body: user,
  });
};

export { getUser, updateUser, createUser };
