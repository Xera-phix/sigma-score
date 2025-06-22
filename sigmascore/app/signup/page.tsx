"use client";
// ...existing code from template/pages/SignUp.tsx...
import React, { useState } from "react";
import NavBar from "../../components/ui/NavBar";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile with display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });

      // Create user document in Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        displayName: `${firstName} ${lastName}`,
        sigmaScore: 0,
        ranking: 0,
        totalScans: 0,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isActive: true,
        profileCompleted: false
      });

      // Save user info to localStorage for now (for dashboard display)
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', user.email || '');
      localStorage.setItem('userName', `${firstName} ${lastName}`);
      localStorage.setItem('userPhoto', user.photoURL || '');
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || 'Sign up failed.');
    }
  };

  return (
    <div className="min-h-screen bg-vr-gradient relative overflow-hidden">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
          <h2 className="font-orbitron text-3xl font-bold text-center text-white mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-white text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-vr-pink"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-white text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-vr-pink"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-vr-pink"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-vr-pink"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-400 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-vr-pink to-vr-red text-white font-bold py-2.5 rounded mt-2 hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
