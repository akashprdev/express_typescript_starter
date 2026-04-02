import { z } from 'zod';

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),

  email: z.email({ error: 'Invalid email address' }).min(1, 'Email is required'),
  password: z
    .string()
    .trim()
    .min(5, 'Password must be at least 5 characters')
    .max(16, 'Password must be less than 16 characters'),
});

export const loginUserSchema = z.object({
  email: z.email({ error: 'Invalid email address' }).min(1, 'Email is required'),
  password: z
    .string()
    .trim()
    .min(5, 'Password must be at least 5 characters')
    .max(16, 'Password must be less than 16 characters'),
});
