import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <button onClick={() => navigate('/dashboard')}>Go to dashboard</button>
    </div>
  );
}
