"use client";
import React, { useState } from "react";
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }
      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!name || !email || !password) {
      setError("Please fill up all the fields");
      return;
    }

    // fetching routes
    try {
      const resUserExits = await fetch("/api/userExits", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExits.json();
      if (user) {
        setError("User Already Exits");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("registration failed");
      }
    } catch {
      console.log("failed");
    }
    // console.log("Register submitted:", name, email, password);
    // Add your registration logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl">N</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            NexaTech
          </h1>
          <p className="text-base-content/60 mt-2">
            {isLogin
              ? "Welcome back! Please login to your account"
              : "Create your account to get started"}
          </p>
        </div>
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">
            <div className="tabs tabs-boxed bg-base-200 mb-6">
              <a
                className={`tab flex-1 ${isLogin ? "tab-active" : ""}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </a>
              <a
                className={`tab flex-1 ${!isLogin ? "tab-active" : ""}`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </a>
            </div>

            {/* --------------------------------------LOGIN FORM */}
            {isLogin && (
              <div>
                <form onSubmit={handleLogin}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-medium">Email</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="john@nexatech.com"
                        className="input input-bordered w-full pl-12"
                        required
                      />
                      <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    </div>
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-medium">Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        className="input input-bordered w-full pl-12 pr-12"
                        required
                      />
                      <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm"
                      />
                      <span className="label-text">Remember me</span>
                    </label>
                    <a href="#" className="label-text-alt link link-primary">
                      Forgot password?
                    </a>
                  </div>
                  <button type="submit" className="btn btn-primary w-full mb-4">
                    Login
                  </button>
                </form>
                <div className="divider">OR</div>

                <div>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm w-full"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>
                </div>
              </div>
            )}

            {/* --------------------------REGISTER FORM */}
            {!isLogin && (
              <div>
                <form onSubmit={handleRegister}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-medium">Full Name</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        className="input input-bordered w-full pl-12"
                        required
                      />
                      <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    </div>
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-medium">Email</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="john@nexatech.com"
                        className="input input-bordered w-full pl-12"
                        required
                      />
                      <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    </div>
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-medium">Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        className="input input-bordered w-full pl-12 pr-12"
                        required
                      />
                      <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-medium">
                        Confirm Password
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="••••••••"
                        className="input input-bordered w-full pl-12"
                        required
                      />
                      <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    </div>
                  </div>

                  <div className="form-control mb-6">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm"
                        required
                      />
                      <span className="label-text">
                        I agree to the{" "}
                        <a href="#" className="link link-primary">
                          Terms & Conditions
                        </a>
                      </span>
                    </label>
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                  <button type="submit" className="btn btn-primary w-full mb-4">
                    Create Account
                  </button>
                </form>

                <div className="divider">OR</div>

                <div>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm w-full"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-base-content/60 text-sm mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="link link-primary font-medium"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}
