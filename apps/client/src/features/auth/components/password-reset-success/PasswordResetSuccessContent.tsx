import Content from '../Content';
import PasswordResetSuccess from './PasswordResetSuccessHeader';
import PasswordResetSuccessMain from './PasswordResetSuccessMain';

export default function PasswordResetSuccessContent() {
  return (
    <Content
      header={<PasswordResetSuccess />}
      main={<PasswordResetSuccessMain />}
    />
  );
}
