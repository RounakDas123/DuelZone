import React, { useEffect } from 'react';
import {jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { fetchClient } from '../api/fetchClient';
import { toast } from 'react-toastify';

const GoogleAuthButton = ({ action }) => {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const elementId = `google-${action}-btn`;

  useEffect(() => {
  const initGoogle = () => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById(elementId),
        { theme: 'outline', size: 'large', width: '100%' }
      );
    } else {
      setTimeout(initGoogle, 100); // retry in 100ms
    }
  };

  initGoogle();
}, []);


  const handleCredentialResponse = async (response) => {
    const decoded = jwtDecode(response.credential);
    try {
      const data = await fetchClient('/api/auth/google-auth', 'POST', {
        name: decoded.name,
        email: decoded.email,
      });
      login(data.user, data.token);
      toast.success("Login successful");
      navigate('/dashboard');
    } catch (err) {
      toast.error("Google login failed: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <div id={elementId}></div>
      <div style={{ color: '#fff', marginTop: '0.5rem', fontSize: '0.95rem' }}>
        {action === 'login' ? 'Login with Google' : 'Signup with Google'}
      </div>
    </div>
  );
};

export default GoogleAuthButton;
