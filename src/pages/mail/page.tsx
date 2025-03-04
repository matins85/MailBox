import { Mail } from "./components/mail";
import { accounts, mails } from "./data";

export default function MailPage() {
  return (
    <>
      <div>
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={[20, 80, 80]}
          defaultCollapsed={false}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
