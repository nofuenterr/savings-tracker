import Content from '../Content';
import ForgotPassword from './ForgotPasswordHeader';
import ForgotPasswordForm from './ForgotPasswordForm';

export default function ForgotPasswordContent() {
  return <Content header={<ForgotPassword />} main={<ForgotPasswordForm />} />;
}
