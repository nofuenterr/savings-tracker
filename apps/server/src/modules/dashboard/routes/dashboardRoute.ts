import { Router } from 'express';

import { validate } from '../../../middleware/validateMiddleware';
import {
  createGoal,
  createTransaction,
  deleteGoal,
  getDashboard,
  getGoal,
  getGoalTransactions,
  getUserGoals,
  getUserTransactions,
  updateGoal,
} from '../controllers/dashboardController';
import {
  createGoalSchema,
  createTransactionSchema,
  deleteGoalSchema,
  getGoalSchema,
  getGoalTransactionsSchema,
  getUserGoalsSchema,
  getUserTransactionsSchema,
  updateGoalSchema,
} from '../schemas/dashboardSchema';
import {
  dashboardLimiter,
  mutationLimiter,
} from '../middleware/rateLimitMiddleware';

const dashboardRouter = Router();

dashboardRouter.get(
  '/transactions',
  dashboardLimiter,
  validate(getUserTransactionsSchema),
  getUserTransactions,
);
dashboardRouter.get(
  '/goals',
  dashboardLimiter,
  validate(getUserGoalsSchema),
  getUserGoals,
);
dashboardRouter.post(
  '/goals',
  mutationLimiter,
  validate(createGoalSchema),
  createGoal,
);
dashboardRouter.get(
  '/goals/:id/transactions',
  dashboardLimiter,
  validate(getGoalTransactionsSchema),
  getGoalTransactions,
);
dashboardRouter.post(
  '/goals/:id/transactions',
  mutationLimiter,
  validate(createTransactionSchema),
  createTransaction,
);
dashboardRouter.get(
  '/goals/:id',
  dashboardLimiter,
  validate(getGoalSchema),
  getGoal,
);
dashboardRouter.patch(
  '/goals/:id',
  mutationLimiter,
  validate(updateGoalSchema),
  updateGoal,
);
dashboardRouter.delete(
  '/goals/:id',
  mutationLimiter,
  validate(deleteGoalSchema),
  deleteGoal,
);
dashboardRouter.get('/', dashboardLimiter, getDashboard);

export default dashboardRouter;
