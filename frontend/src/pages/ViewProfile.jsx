import React, { useEffect, useState } from 'react';
import styles from './ViewProfile.module.css';
import { useAuthStore } from '../store/authStore';

const ViewProfile = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    bio: '',
    country: '',
    favoriteMode: '',
  });

  useEffect(() => {
    // Fetch user profile
    fetch(`http://localhost:5000/api/auth/profile?email=${user.email}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setFormData({
          name: data.name,
          email: data.email,
          username: data.username || '',
          bio: data.bio || '',
          country: data.country || '',
          favoriteMode: data.favoriteMode || '',
        });
      })
      .catch(err => console.error("Profile fetch error:", err));
  }, [user.email]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:5000/api/auth/update-profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || "Profile updated successfully");
      })
      .catch(err => {
        console.error("Update error:", err);
        alert("Failed to update profile.");
      });
  };

  return (
    <div className={styles.container}>
      <h2>Your Profile</h2>
      <form className={styles.profileForm} onSubmit={handleSubmit}>
        {['name', 'email', 'username', 'bio', 'country', 'favoriteMode'].map(field => (
          <div className={styles.field} key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              disabled={field === 'email'}
              placeholder={`Enter your ${field}`}
            />
          </div>
        ))}
        <button type="submit" className={styles.updateBtn}>Update Profile</button>
      </form>
    </div>
  );
};

export default ViewProfile;
