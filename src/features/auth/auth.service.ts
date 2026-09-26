import db from '@/database/database';
import { user } from '@/database/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError } from '@/utils/response';

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput extends LoginInput {
  name: string;
}

export const registerService = async ({ name, email, password }: RegisterInput) => {
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await db.select().from(user).where(eq(user.email, normalizedEmail)).limit(1);

  if (existingUser.length > 0) {
    const error: HttpError = new Error('User already exists');
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const insertedUser = await db
    .insert(user)
    .values({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    })
    .returning();

  const newUser = insertedUser[0];

  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });

  return {
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  };
};

export const loginService = async ({ email, password }: LoginInput) => {
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await db.select().from(user).where(eq(user.email, normalizedEmail)).limit(1);

  if (existingUser.length === 0) {
    const error: HttpError = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const matchUser = existingUser[0];

  const isValid = await bcrypt.compare(password, matchUser.password);

  if (!isValid) {
    const error: HttpError = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ id: matchUser.id }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });

  return {
    token,
    user: {
      id: matchUser.id,
      name: matchUser.name,
      email: matchUser.email,
    },
  };
};
