import { LogoMark } from "../logo-mark/logo-mark";

interface IAuthCardProps {
  children: React.ReactNode;
}

export function AuthCard(props: Readonly<IAuthCardProps>) {
  const { children } = props;

  return (
    <div
      id="auth-card"
      className="max-w-[420px] w-full flex flex-col items-center justify-center gap-6"
    >
      <LogoMark />
      {children}
    </div>
  );
}
