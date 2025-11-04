import LoginForm from "@/components/form/login-form";

export default function WelcomePage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <LoginForm />
    </div>
  );
}