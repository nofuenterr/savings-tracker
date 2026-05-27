import Content from '../Content';
import EmailHeader from './EmailHeader';
import EmailSentMain from './EmailSentMain';

export default function EmailContent() {
  return <Content header={<EmailHeader />} main={<EmailSentMain />} />;
}
