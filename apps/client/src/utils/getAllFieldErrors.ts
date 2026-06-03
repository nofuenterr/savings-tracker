import type { FieldError } from '../types/errorType';

export default function getAllFieldErrors(
  errors: FieldError[] | undefined,
  field: string,
) {
  const errorMessages: string[] = [];

  errors?.forEach((e) => {
    if (e.field === `body.${field}` && e.message) {
      errorMessages.push(e.message);
    }
  });

  return errorMessages.length > 0 ? errorMessages : null;
}
