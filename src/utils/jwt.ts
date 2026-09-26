import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  role?: 'expert' | 'admin' | 'analyst';
}

export const jwtEncode = ({ id, role }: JwtPayload): string => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};

export const jwtDecode = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
  return decoded;
};
