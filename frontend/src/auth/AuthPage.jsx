import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.slider} ${!isLogin ? styles.shiftLeft : ''}`}>
        <div className={styles.slide}>
          <LoginForm />
        </div>
        <div className={styles.slide}>
          <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
        </div>
      </div>
      <div className={styles.toggle}>
        <button onClick={() => setIsLogin(true)} disabled={isLogin}>Login</button>
        <button onClick={() => setIsLogin(false)} disabled={!isLogin}>Signup</button>
      </div>
    </div>
  );
};

export default AuthPage;
