import { z } from "zod";
import { axiosInstance } from "../../utils/axios";
import { signupSchema } from "./schemas";

export const createUser = (body: z.infer<typeof signupSchema>) => axiosInstance.post('user', body)