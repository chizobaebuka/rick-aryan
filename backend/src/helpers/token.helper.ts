import jwt, { SignOptions } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;
const EXPIRES = (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'];

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  fullName: string;
}

export const signToken = (payload: JwtPayload): string =>
  jwt.sign(payload, SECRET, { expiresIn: EXPIRES } as SignOptions);

export const verifyToken = (token: string): JwtPayload =>
  jwt.verify(token, SECRET) as JwtPayload;
