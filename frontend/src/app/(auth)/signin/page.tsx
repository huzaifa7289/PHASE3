import SignInForm from '@/components/auth/SignInForm';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md">
        <SignInForm />

        <div className="mt-4 text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-white underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
