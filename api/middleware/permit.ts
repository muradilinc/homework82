import { NextFunction, Response } from 'express';
import { RequestWithUser } from './auth';

const permit = (...roles: string[]) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).send({ error: 'No authenticated!' });
    }

    if (roles.includes(req.user.role)) {
      return res.status(403).send({ error: 'No authorized!' });
    }

    return next();
  };
};

export default permit;
