import Header from '../Header';

// Add password check on backend
export default function NewPasswordHeader() {
  return (
    <Header
      title="Create new password"
      description="Your new password must be different from your previous password."
    />
  );
}
