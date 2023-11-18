import { request } from './queryClient';

const getOccupations = async () => {
  return (await request({
    url: `/api/service/occupations`,
  })) as string[];
};

export { getOccupations };
