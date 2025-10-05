"use client";
// ...existing code from template/pages/Login.tsx...
import React, { useState } from "react";
import NavBar from "../../components/ui/NavBar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update lastLoginAt in Firestore
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        lastLoginAt: new Date()
      });

      // Save user info to localStorage for now (for dashboard display)
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', user.email || '');
      localStorage.setItem('userName', user.displayName || '');
      localStorage.setItem('userPhoto', user.photoURL || '');
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-card text-card-foreground rounded-2xl shadow-2xl p-8 w-full max-w-md border">
          <h2 className="font-orbitron text-3xl font-bold text-center mb-6">Log In</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded bg-input text-foreground border focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded bg-input text-foreground border focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-400 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-bold py-2.5 rounded mt-2 hover:opacity-90 transition"
            >
              Log In
            </button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-muted-foreground">Don't have an account? </span>
            <button
              type="button"
              className="text-primary font-bold hover:underline ml-1"
              onClick={() => window.location.href = '/signup'}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
