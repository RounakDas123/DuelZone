import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchClient } from '../api/fetchClient';
import { useAuthStore } from '../store/authStore';
import GoogleAuthButton from './GoogleAuthButton';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) return alert("Invalid email format");
    if (password.length < 6) return alert("Password must be at least 6 characters");
    try {
      const data = await fetchClient('/api/auth/login', 'POST', { email, password });
      login(data.user, data.token);
      if (!data.user) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      navigate('/lobby');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <h2>Welcome Back</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      <GoogleAuthButton action="login" />
    </form>
  );
};

export default LoginForm;
