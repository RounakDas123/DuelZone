import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import { fetchClient } from '../api/fetchClient';
import GoogleAuthButton from './GoogleAuthButton';
import { toast } from 'react-toastify';

const SignupForm = ({ onSwitchToLogin }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Name is required");
    if (!/\S+@\S+\.\S+/.test(form.email)) return toast.error("Invalid email");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    try {
      const response = await fetchClient('/api/auth/signup', 'POST', form);
      if (!response.user) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      onSwitchToLogin();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSignup}>
      <h2>Create Account</h2>
      <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <button type="submit">Sign Up</button>
      <GoogleAuthButton action="signup" />
    </form>
  );
};

export default SignupForm;
