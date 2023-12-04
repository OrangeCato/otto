import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <button onClick={() => navigate(-1)} style={styles.iconButton}>⬅️</button>
      <div style={styles.icons}>
        <button style={styles.iconButton}>⚙️</button> {/* Configuration Icon */}
        <button style={styles.iconButton}>🔔</button> {/* Notifications Icon */}
        {/* Add an onClick handler to navigate to the profile */}
        <button onClick={() => navigate('/profile')} style={styles.iconButton}>👤</button> {/* Profile Icon */}
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    margin: '0 10px', // Added margin for spacing between buttons
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  icons: {
    display: 'flex',
  },
};

export default Header;
