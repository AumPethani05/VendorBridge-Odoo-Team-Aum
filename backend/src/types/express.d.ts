import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        created_at: Date | null;
      };
    }
  }
}

export {};