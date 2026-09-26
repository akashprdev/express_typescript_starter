/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface User {
      id: string;
      token?: string;
      name?: string;
      email?: string;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
