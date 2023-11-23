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

export const addTask = async (newTaskData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTaskData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Task addition failed: ${errorData.message || 'Unknown error'}`);
    }

    return response.json();
  } catch (error) {
    console.error('Task addition error:', error);
    throw error;
  }
};

export const updateTask = async (taskId, updatedTaskName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/update/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskName: updatedTaskName }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Task update failed: ${errorData.message || 'Unknown error'}`);
    }

    return response.json();
  } catch (error) {
    console.error('Task update error:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/delete/${taskId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Task deletion failed: ${errorData.message || 'Unknown error'}`);
    }

    return response.json();
  } catch (error) {
    console.error('Task deletion error:', error);
    throw error;
  }
};
