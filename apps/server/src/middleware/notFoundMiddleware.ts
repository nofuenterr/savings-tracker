import { Request, Response } from 'express';

const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};

export default notFoundMiddleware;
