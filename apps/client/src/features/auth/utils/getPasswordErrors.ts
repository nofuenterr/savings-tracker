export default function getPasswordErrors(password: string): string[] {
  if (!password) return [];
  const messages: string[] = [];

  if (password.length < 8)
    messages.push('Password must be at least 8 characters long');
  if (!/[a-z]/.test(password))
    messages.push('Password must contain at least one lowercase letter');
  if (!/[A-Z]/.test(password))
    messages.push('Password must contain at least one uppercase letter');
  if (!/[0-9]/.test(password))
    messages.push('Password must contain at least one number');
  if (!/[^a-zA-Z0-9]/.test(password))
    messages.push('Password must contain at least one special character');

  return messages;
}
