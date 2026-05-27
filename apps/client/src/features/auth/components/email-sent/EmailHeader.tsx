import { useLocation } from 'react-router-dom';

import Header from '../Header';

interface LocationState {
  email?: string;
}

export default function EmailHeader() {
  const location = useLocation();

  const state = location.state as LocationState;
  const email = state?.email;

  return (
    <Header
      title="Check your inbox"
      description={
        email
          ? `We've sent a reset link to ${email}`
          : "We've sent a reset link to your email address"
      }
    />
  );
}
