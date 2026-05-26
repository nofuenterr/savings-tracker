import Header from '../Header';

// Get email from /auth/reset-password
export default function EmailHeader() {
  return (
    <Header
      title="Check your inbox"
      description="We've sent a reset link to someone@gmail.com"
    />
  );
}
