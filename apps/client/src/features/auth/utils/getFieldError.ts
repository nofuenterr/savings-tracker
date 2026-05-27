import type { FieldError } from '../types/authType';

export default function getFieldError(
  errors: FieldError[] | undefined,
  field: string,
) {
  return errors?.find((e) => e.field === `body.${field}`)?.message ?? null;
}
