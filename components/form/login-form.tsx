'use client';

import React, { useState, useEffect, FormEvent } from 'react';
// import { useRouter } from 'next/navigation';
import { GoogleIcon, AppleIcon, MessageIcon, CheckCircleIcon } from './icons';



// declare const confetti: any;



type AuthState = 'login' | 'success';

const SuccessPage: React.FC = () => (
  <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center animate-fade-in">
    <div className="flex justify-center items-center mb-4">
      <CheckCircleIcon className="w-16 h-16 text-green-500" />
    </div>
    <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
    <p className="text-gray-600 mt-2">You&apos;re in! Redirecting you to your dashboard...</p>
  </div>
);

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [authState, setAuthState] = useState<AuthState>('login');
//   const router = useRouter();

  const [displayedTitle, setDisplayedTitle] = useState('');
  const fullTitle = 'Weelcome to Standard Homes Gambia';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullTitle.length) {
        setDisplayedTitle((prev) => prev + fullTitle[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

//   useEffect(() => {
//     const confettiScript = document.createElement('script');
//     confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js";
//     confettiScript.async = true;
//     document.body.appendChild(confettiScript);

//     if (authState === 'success') {
//       const timer = setTimeout(() => router.push('/dashboard'), 2000);
//       return () => clearTimeout(timer);
//     }

//     return () => {
//       if (document.body.contains(confettiScript)) {
//         document.body.removeChild(confettiScript);
//       }
//     };
//   }, [authState, router]);


  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 820);
      return;
    }

    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    //   if (typeof confetti === 'function') {
    //     confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    //   }
    //   setAuthState('success');
    // }, 1000);
  };

  if (authState === 'success') return <SuccessPage />;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <div className={`w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl transition-all ${isShaking ? 'animate-shake' : ''}`}>
        <div className="text-center">
         <h1 className="text-2xl sm:text-3xl font-bold text-indigo-950">
  {displayedTitle || ''}
  {displayedTitle.length < fullTitle.length && <span className="animate-pulse">|</span>}
</h1>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500 hover:underline">Forgot password?</a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-950 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 disabled:bg-indigo-300"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* OR divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-xs text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
            <GoogleIcon className="w-5 h-5 mr-2" />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
            <AppleIcon className="w-5 h-5 mr-2" />
            Continue with Apple
          </button>
        </div>

        <p className="text-xs text-center text-gray-500">
          By continuing, you agree to Standard Homes’ <a href="#" className="font-medium text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" className="font-medium text-indigo-600 hover:underline">Privacy Policy</a>.
        </p>

        <hr className="border-gray-200" />

        <p className="text-sm text-center text-gray-600">
         Don&apos;t have an account?{' '}
       <a href="#" className="font-medium text-indigo-600 hover:underline">Sign up</a>
      </p>
      </div>

      <button className="fixed bottom-6 right-6 bg-indigo-900 text-white p-4 rounded-full shadow-lg hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform duration-300 hover:scale-110">
        <MessageIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default LoginForm;