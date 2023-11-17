import { User } from "@/src/types/user";
import { request } from "./queryClient";

const getUser = async (userId: string) => {
  return (await request({
    url: `/api/service/user/${userId}`,
  })) as User;
}

export { getUser };