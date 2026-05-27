import Content from '../Content';
import RegisterHeader from './RegisterHeader';
import RegisterForm from './RegisterForm';

export default function RegisterContent() {
  return <Content header={<RegisterHeader />} main={<RegisterForm />} />;
}
