import rateLimit from 'express-rate-limit';

import { rateLimitOptions } from '../../../middleware/rateLimitMiddleware';

export const dashboardLimiter = rateLimit(rateLimitOptions({ max: 100 }));
export const mutationLimiter = rateLimit(rateLimitOptions({ max: 30 }));
