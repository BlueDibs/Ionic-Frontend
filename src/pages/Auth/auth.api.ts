import { z } from 'zod';
import { axiosInstance } from '../../utils/axios';
import { signupSchema } from './schemas';

export const createUser = (body: z.infer<typeof signupSchema>) =>
  axiosInstance.post('user', body);
export const signupValidationAPI = (body: any) =>
  axiosInstance.post(`/signup_validation`, body).then((res) => res.data);
export const setupAPI = (body: { shares_dilute: number }) =>
  axiosInstance.post('/user/setup', body).then((res) => res.data);
