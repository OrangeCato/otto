const API_BASE_URL = 'http://localhost:3000';

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const errorData = await response.json();
      throw new Error(`Login failed: ${errorData.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Registration failed: ${errorData.message || 'Unknown error'}`);
    }

    return response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};