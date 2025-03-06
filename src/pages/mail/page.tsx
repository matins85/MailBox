import { Mail } from "./components/mail";

export default function MailPage() {
  return (
    <div>
      <Mail
        defaultLayout={[20, 30, 50]}
        defaultCollapsed={false}
        navCollapsedSize={4}
      />
    </div>
  );
}
