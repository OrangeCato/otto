import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import menuIcon from '../assets/icons/menu.png';

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <header style={styles.header}>
      <div style={styles.dropdownMenu}>
        <button style={styles.menuButton} onClick={toggleMenu}>
          <img src={menuIcon} alt="Menu" style={styles.menuIcon} />
        </button>
        {isMenuVisible && (
          <div style={styles.menuOptions}>
            <div style={styles.menuItem} onClick={() => navigate('/profile')}>Profile</div>
            <div style={styles.menuItem} onClick={() => navigate('/insights')}>Insights</div>
            <div style={styles.menuItem} onClick={() => navigate('/preferences')}>Preferences</div>
            <div style={styles.menuItem} onClick={() => navigate('/settings')}>Settings</div>
            <div style={styles.menuItem} onClick={() => navigate('/help')}>Help</div>
            <div style={styles.menuItem} onClick={() => navigate('/more')}>More</div>
            <div style={styles.menuItem} onClick={handleLogout}>Logout</div>
          </div>
        )}
      </div>
    </header>
  );
};
const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '10px 20px',
    color: 'white',
  },
  dropdownMenu: {
    position: 'relative',
  },
  menuButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  menuIcon: {
    height: '20px', // Adjust size as needed
    width: '20px',
    filter: 'invert(100%)' // This will invert the colors
  },
  menuOptions: {
    position: 'absolute',
    right: 0,
    top: '40px', // Adjust based on your header's size
    backgroundColor: 'white',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
    padding: '10px 0',
  },
  menuItem: {
    padding: '10px 20px',
    color: 'black',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
  }
};

export default Header;