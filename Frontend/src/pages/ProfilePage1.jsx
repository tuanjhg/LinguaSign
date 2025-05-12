import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';
import './ProfilePage.css';

export function ProfilePage() {
  const { currentUser, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    preferredLanguage: 'Vietnamese',
    notifications: true,
    profileImage: null
  });
  
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        bio: currentUser.bio || '',
        preferredLanguage: currentUser.preferredLanguage || 'Vietnamese',
        notifications: currentUser.notifications !== false,
        profileImage: currentUser.profileImage || null
      });
      
      if (currentUser.profileImage) {
        setPreviewImage(currentUser.profileImage);
      }
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({
          ...formData,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      updateUser(formData);
      
      setMessage({
        text: 'Profile updated successfully!',
        type: 'success'
      });
      
      setIsEditing(false);
      
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      setMessage({
        text: error.message || 'Failed to update profile',
        type: 'error'
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = {
    coursesCompleted: 12,
    lessonsCompleted: 47,
    streak: 15,
    points: 2340
  };

  const achievements = [
    { title: "First Steps", description: "Completed your first lesson", earned: true },
    { title: "Week Warrior", description: "Maintained a 7-day streak", earned: true },
    { title: "Vocabulary Master", description: "Learned 100 signs", earned: false },
    { title: "Conversation Ready", description: "Completed all basic courses", earned: false }
  ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <div className="profile-actions">
          {!isEditing ? (
            <button 
              className="btn-edit" 
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <button 
              className="btn-cancel" 
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          )}
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      
      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message.text}
        </div>
      )}
      
      <div className="profile-content">
        <div className="profile-main">
          <div className="profile-info-card">
            <div className="profile-info-header">
              <div className="profile-image-container">
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt="Profile" 
                    className="profile-image" 
                  />
                ) : (
                  <div className="profile-image-placeholder">
                    {formData.name.charAt(0).toUpperCase()}
                  </div>
                )}
                {isEditing && (
                  <label className="profile-image-upload">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      style={{ display: 'none' }}
                    />
                    <span className="upload-icon">📷</span>
                  </label>
                )}
              </div>
              <div className="profile-details">
                <h2>{formData.name}</h2>
                <p className="profile-email">{formData.email}</p>
              </div>
            </div>
            
            {isEditing ? (
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="bio">About Me</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="preferredLanguage">Preferred Language</label>
                  <select
                    id="preferredLanguage"
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                  >
                    <option value="Vietnamese">Vietnamese</option>
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                </div>
                
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="notifications"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleChange}
                  />
                  <label htmlFor="notifications">Enable notifications</label>
                </div>
                
                <button type="submit" className="btn-save">Save Changes</button>
              </form>
            ) : (
              <div className="profile-info">
                <div className="info-group">
                  <h3>About Me</h3>
                  <p>{formData.bio || "No bio yet"}</p>
                </div>
                <div className="info-group">
                  <h3>Preferred Language</h3>
                  <p>{formData.preferredLanguage}</p>
                </div>
                <div className="info-group">
                  <h3>Notifications</h3>
                  <p>{formData.notifications ? "Enabled" : "Disabled"}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="profile-stats-card">
            <h3>Learning Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{stats.coursesCompleted}</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.lessonsCompleted}</span>
                <span className="stat-label">Lessons</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.streak}</span>
                <span className="stat-label">Day Streak</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.points}</span>
                <span className="stat-label">XP Points</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-achievements">
          <h3>Achievements</h3>
          <div className="achievements-list">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`achievement-item ${achievement.earned ? 'earned' : 'locked'}`}
              >
                <div className="achievement-icon">
                  {achievement.earned ? '🏆' : '🔒'}
                </div>
                <div className="achievement-details">
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}