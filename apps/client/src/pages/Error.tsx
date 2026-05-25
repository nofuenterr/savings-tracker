import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : 'Something went wrong';

  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{message}</p>
      <button onClick={() => navigate(-1)}>Go back</button>
      <button onClick={() => navigate('/dashboard')}>Go to dashboard</button>
    </div>
  );
}
