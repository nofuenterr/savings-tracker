import { useNavigate } from 'react-router-dom';

import ButtonPrimary from '../../../../components/ButtonPrimary';

export default function PasswordResetSuccessMain() {
  const navigate = useNavigate();

  return (
    <ButtonPrimary
      type="button"
      text="Sign in to your account"
      onClick={() => navigate('/auth/login')}
    />
  );
}
