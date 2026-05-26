import Content from '../Content';
import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';

export default function LoginContent() {
  return <Content header={<LoginHeader />} main={<LoginForm />} />;
}
