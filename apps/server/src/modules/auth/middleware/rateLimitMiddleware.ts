import rateLimit from 'express-rate-limit';

import { rateLimitOptions } from '../../../middleware/rateLimitMiddleware';

export const forgotPasswordLimiter = rateLimit(rateLimitOptions({ max: 5 }));
export const resetPasswordLimiter = rateLimit(rateLimitOptions({ max: 5 }));
export const loginLimiter = rateLimit(rateLimitOptions({ max: 10 }));
export const verifyResetTokenLimiter = rateLimit(rateLimitOptions({ max: 10 }));
export const registerLimiter = rateLimit(rateLimitOptions({ max: 10 }));
