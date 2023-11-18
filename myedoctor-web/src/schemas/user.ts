import { z } from 'zod';

export const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.number(),
  occupation: z.string().optional(),
});
