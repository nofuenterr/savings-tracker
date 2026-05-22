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

const dashboardRouter = Router();

dashboardRouter.get('/', getDashboard);

dashboardRouter.get('/goals', validate(getUserGoalsSchema), getUserGoals);
dashboardRouter.get('/goals/:id', validate(getGoalSchema), getGoal);
dashboardRouter.post('/goals', validate(createGoalSchema), createGoal);
dashboardRouter.patch('/goals/:id', validate(updateGoalSchema), updateGoal);
dashboardRouter.delete('/goals/:id', validate(deleteGoalSchema), deleteGoal);

dashboardRouter.get(
  '/goals/:id/transactions',
  validate(getGoalTransactionsSchema),
  getGoalTransactions,
);
dashboardRouter.post(
  '/goals/:id/transactions',
  validate(createTransactionSchema),
  createTransaction,
);

dashboardRouter.get(
  '/transactions',
  validate(getUserTransactionsSchema),
  getUserTransactions,
);

export default dashboardRouter;
