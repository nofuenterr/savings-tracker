import { createBrowserRouter } from 'react-router-dom';
import { lazy, createElement } from 'react';

const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const ProtectedLayout = lazy(() => import('../layouts/ProtectedLayout'));
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));

const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const EmailSent = lazy(() => import('../pages/auth/EmailSent'));
const VerifyResetToken = lazy(() => import('../pages/auth/VerifyResetToken'));
const NewPassword = lazy(() => import('../pages/auth/NewPassword'));
const PasswordResetSuccess = lazy(
  () => import('../pages/auth/PasswordResetSuccess'),
);

const Home = lazy(() => import('../pages/dashboard/Home'));
const GoalDetails = lazy(() => import('../pages/dashboard/GoalDetails'));

const RootPage = lazy(() => import('../pages/Root'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));
const ErrorPage = lazy(() => import('../pages/Error'));

const router = createBrowserRouter([
  {
    errorElement: createElement(ErrorPage),
    children: [
      {
        path: '/',
        element: createElement(RootPage),
      },

      {
        path: 'auth',
        element: createElement(AuthLayout),
        errorElement: createElement(ErrorPage),
        children: [
          { path: 'login', element: createElement(Login) },
          { path: 'register', element: createElement(Register) },
          { path: 'forgot-password', element: createElement(ForgotPassword) },
          { path: 'email-sent', element: createElement(EmailSent) },
          {
            path: 'verify-reset-token',
            element: createElement(VerifyResetToken),
          },
          { path: 'reset-password', element: createElement(NewPassword) },
          {
            path: 'reset-password-success',
            element: createElement(PasswordResetSuccess),
          },
        ],
      },

      {
        element: createElement(ProtectedLayout),
        errorElement: createElement(ErrorPage),
        children: [
          {
            path: 'dashboard',
            element: createElement(DashboardLayout),
            errorElement: createElement(ErrorPage),
            children: [
              { index: true, element: createElement(Home) },
              { path: 'goals/:id', element: createElement(GoalDetails) },
            ],
          },
        ],
      },

      { path: '*', element: createElement(NotFoundPage) },
    ],
  },
]);

export default router;
