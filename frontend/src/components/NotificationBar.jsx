import React, { useState, useEffect } from 'react';

const notifications = [
  "🎉 New: Semester 6 Digital Electronics notes uploaded!",
  "📢 Important: Internship applications for 2024 are now open!",
  "🚀 Update: Previous year question papers 2023 available!",
  "🔔 Reminder: Site maintenance scheduled for Sunday 10 PM",
  "📚 New: Computer Science project guides uploaded!",
  "🎯 Alert: Last date for scholarship applications - March 30th"
];

function NotificationBar() {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % notifications.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextNotification = () => {
    setCurrentNotification((prev) => (prev + 1) % notifications.length);
  };

  const prevNotification = () => {
    setCurrentNotification((prev) => (prev - 1 + notifications.length) % notifications.length);
  };

  return (
    <div className="notification-bar">
      <div className="container">
        <div className="notification-content">
          {/* Notification Icon */}
          <div className="notification-icon">
            <i className="bi bi-megaphone"></i>
          </div>
          
          {/* Notification Text with Animation */}
          <div 
            className="notification-text-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              className="notification-text"
              key={currentNotification}
            >
              {notifications[currentNotification]}
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="notification-controls">
            <button 
              className="notification-btn" 
              onClick={prevNotification}
              aria-label="Previous notification"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            
            <button 
              className="notification-btn" 
              onClick={nextNotification}
              aria-label="Next notification"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
            
            <button 
              className="notification-pause"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Play notifications" : "Pause notifications"}
            >
              <i className={`bi ${isPaused ? 'bi-play-fill' : 'bi-pause-fill'}`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationBar;