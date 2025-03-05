import { Mail } from "./components/mail";

export default function MailPage() {
  return (
    <>
      <div>
        <Mail
          mails={[]}
          defaultLayout={[20, 80, 80]}
          defaultCollapsed={false}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
