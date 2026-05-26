import PasswordResetSuccessContent from '../../features/auth/components/password-reset-success/PasswordResetSuccessContent';
import PasswordResetSuccessQuote from '../../features/auth/components/password-reset-success/PasswordResetSuccessQuote';

export default function PasswordResetSuccess() {
  return (
    <>
      <PasswordResetSuccessQuote />
      <PasswordResetSuccessContent />
    </>
  );
}
