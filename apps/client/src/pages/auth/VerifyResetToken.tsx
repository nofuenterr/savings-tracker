import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useVerifyResetToken } from '../../features/auth/api/authHooks';

export default function VerifyResetToken() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { mutate: verify } = useVerifyResetToken();

  useEffect(() => {
    if (!token) {
      navigate('/auth/forgot-password');
      return;
    }
    verify({ token });
  }, [token, navigate, verify]);

  return (
    <div>
      <span>Verifying...</span>
    </div>
  );
}
