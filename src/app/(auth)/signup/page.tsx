import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h3 className="text-xl font-black text-on-surface tracking-tight font-headline">Create Account</h3>
        <p className="text-on-surface-variant text-[13px] font-medium mt-1">
          Join the ecosystem and attend premier events.
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
