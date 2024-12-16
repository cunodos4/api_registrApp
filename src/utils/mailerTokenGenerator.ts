import { sign } from 'jsonwebtoken';
import {JWT_SECRET} from '../barrel';

export const generateResetToken = (userId: string | undefined ): string | undefined => {
  const token = sign({ userId }, JWT_SECRET!, {
    expiresIn: 30 * 60 * 1000 ,
  });
  return token;
};

