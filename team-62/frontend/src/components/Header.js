import React, { useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import menuIcon from '../assets/icons/menu.png';

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const isNotDashboard = location.pathname !== '/home';

  const goBack = () => {
    navigate(-1);
  }

  return (
    <header style={styles.header}>
      {isNotDashboard && (
        <button onClick={goBack} style={styles.backButton}>
          Back
        </button>
      )}
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
    alignItems: 'center', // Keeps items vertically centered
    justifyContent: 'flex-end', // Aligns items to the right
    padding: '10px 20px', // Provides padding around the header
    color: 'white',
  },
  backButton: {
    background: 'none',
    color: 'white',
    cursor: 'pointer',
    marginRight: 'auto',
    padding: '5px 10px', // Consistent padding with menuButton (adjust as needed)
    border: 'none',
  },
  dropdownMenu: {
    position: 'relative',
  },
  menuButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px 10px', // Ensures consistent vertical size with backButton (adjust as needed)
  },
  menuIcon: {
    height: '25px',
    width: '25px',
    filter: 'invert(100%)',
  },
  menuOptions: {
    position: 'absolute',
    right: 0,
    top: '40px', // Adjust as needed
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