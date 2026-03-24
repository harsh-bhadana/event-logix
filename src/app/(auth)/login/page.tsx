import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h3 className="text-xl font-black text-on-surface tracking-tight font-headline">Welcome Back</h3>
        <p className="text-on-surface-variant text-[13px] font-medium mt-1">
          Continue your journey with Event Logix.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
