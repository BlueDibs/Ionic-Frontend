import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signupSchema = loginSchema.extend({
  username: z.string(),
  firebaseId: z.string(),
  email: z.string().email(),
  shares_dilute: z.bigint(),
});
