import Content from '../Content';
import NewPassword from './NewPasswordHeader';
import NewPasswordForm from './NewPasswordForm';

export default function NewPasswordContent() {
  return <Content header={<NewPassword />} main={<NewPasswordForm />} />;
}
