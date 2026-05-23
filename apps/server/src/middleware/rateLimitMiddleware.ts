const rateLimitResponse = {
  success: false,
  message: 'Too many attempts, please try again later',
};

export const rateLimitOptions = ({
  max,
  minutes = 15,
}: {
  max: number;
  minutes?: number;
}) => {
  return {
    windowMs: 1000 * 60 * minutes,
    max,
    message: rateLimitResponse,
    standardHeaders: true,
    legacyHeaders: false,
  };
};
