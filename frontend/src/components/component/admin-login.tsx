"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SubmitHandler, useForm } from "react-hook-form"
import { signInType } from "@/types/auth"
import toast, { Toaster } from "react-hot-toast"
import { signIn, getUserData } from "@/actions/auth"
import { useRouter } from "next/navigation"
import { Shield, Lock, Mail } from "lucide-react"

export default function AdminLogin() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<signInType>()

    const onSubmitSignin: SubmitHandler<signInType> = async (data) => {
        setIsLoading(true)
        try {
            const res = await signIn({ email: data.email, password: data.password })
            console.log('Sign in result:', res)
            if (res !== 'Login successfully!') throw Error(res)
            toast.success(res)
            
            // Redirect to admin dashboard after successful login
            // Using a slight delay to ensure the token is properly set
            setTimeout(() => {
                console.log('Redirecting to dashboard')
                router.push('/dashboard')
            }, 500)
        } catch (error: any) {
            console.error('Sign in error:', error)
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
"use client";
import { useState } from "react";

export default function AdminLogin({ onLogin }: { onLogin: (email: string, password: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    onLogin(email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-white-100 to-slate-100 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400">Sign in to access the dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-white font-medium">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="admin@gmail.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-white font-medium">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Bond@007"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300">Sign in to Dashboard</button>
        </form>
      </div>
    </div>
  );
}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
