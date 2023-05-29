import { z } from "zod";
import { axiosInstance } from "../../utils/axios";
import { signupSchema } from "./schemas";

export const createUser = (body: z.infer<typeof signupSchema>) => axiosInstance.post('user', body)
export const checkUsernameAPI = (username: string) => axiosInstance.get(`/username/${username}`).then((res) => res.data)