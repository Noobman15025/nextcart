"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!terms) return setError("Accept terms to continue");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) router.push("/login");
    else setError("Registration failed");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#00BADD]">
      {/* LEFT IMAGE PANEL */}
      <div
        className="hidden md:block relative bg-cover bg-center"
        style={{ backgroundImage: "url('/register.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-[#00BADD]/30" />

        {/* Content */}
        <div className="relative top-[-150px] z-10 h-full flex flex-col justify-center px-16 text-white">
          <h1 className="text-6xl font-extrabold leading-tight">
            Build faster.
            <br />
            Shop smarter.
          </h1>
          <p className="mt-6 text-lg text-gray-200 max-w-md">
            A modern e-commerce experience crafted for <br />
            performance, design, and usability.
          </p>
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="flex items-center justify-center bg-[#00BADD] px-6 relative z-40">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Get Started Now
          </h2>
          <p className="text-slate-600 mt-2 mb-8 text-center">
            Join the NextCart community and shop smarter
          </p>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          {/* SOCIAL BUTTONS */}
          <div className="flex flex-col gap-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 border border-slate-300 rounded-xl py-3 font-medium text-slate-800 hover:bg-slate-50 transition">
              {/* Google SVG */}
              Login with Google
            </button>

            <button className="w-full flex items-center justify-center gap-3 bg-[#1A77F2] text-white rounded-xl py-3 font-medium hover:opacity-90 transition">
              {/* Facebook SVG */}
              Login with Facebook
            </button>
          </div>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">OR</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* FORM */}
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00BADD]"
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00BADD]"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl pr-12 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00BADD]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* TERMS */}
            <label className="flex gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-1 accent-[#00BADD]"
              />
              <span>
                I agree to the{" "}
                <a className="underline font-medium hover:text-[#00BADD] cursor-pointer">
                  Terms
                </a>{" "}
                and{" "}
                <a className="underline font-medium hover:text-[#00BADD] cursor-pointer">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* CTA */}
            <button
              type="submit"
              className="w-full bg-[#00BADD] text-white py-3 rounded-xl font-semibold hover:brightness-110 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-slate-600 mt-6 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold hover:text-[#00BADD] underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
