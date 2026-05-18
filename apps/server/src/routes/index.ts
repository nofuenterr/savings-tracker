import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.use('/', async (req: Request, res: Response, next: NextFunction) => {
  console.log('App loaded');
  next();
});
router.use('/auth', () => console.log('/auth route'));

export default router;
