const API_BASE_URL = 'http://localhost:3000'

const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const getCsrfToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/csrf-token`, {
      credentials: 'include',
    })
    if (response.ok) {
      const data = await response.json()
      return data.csrfToken
    }
    return null
  } catch (error) {
    console.error('Error fetching CSRF token:', error)
    return null
  }
}

const prepareHeaders = async () => {
  const csrfToken = await getCsrfToken()
  let headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
  }
  if (csrfToken) {
    headers['CSRF-Token'] = csrfToken
  }
  return headers
}

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: await prepareHeaders(),
      credentials: 'include',
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Registration failed: ${errorData.message}`)
    }
    return response.json()
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: await prepareHeaders(),
      credentials: 'include',
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Login failed: ${errorData.message || 'Unknown error'}`)
    }
    const user = await response.json()
    localStorage.setItem('token', user.token)
    return user
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

export const fetchUserProfile = async () => {
  try {
    const response = await fetch(`{API_BASE_URL}/api/user/profile`, {
      method: 'GET',
      headers: await prepareHeaders(),
      credentials: 'include',
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        `Failed to fetch user profile: ${errorData.message || 'Unknown error'}`,
      )
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching user profile: ', error)
    throw error
  }
}

export const addTask = async (newTaskData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: await prepareHeaders(),
      credentials: 'include',
      body: JSON.stringify(newTaskData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        `Task addition failed: ${errorData.message || 'Unknown error'}`,
      )
    }
    return response.json()
  } catch (error) {
    console.error('Task addition error:', error)
    throw error
  }
}

export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: await prepareHeaders(),
      credentials: 'include',
      body: JSON.stringify(updatedTask),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        `Task update failed: ${errorData.message || 'Unknown error'}`,
      )
    }
    return response.json()
  } catch (error) {
    console.error('Task update error:', error)
    throw error
  }
}

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: await prepareHeaders(),
      credentials: 'include',
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        `Task deletion failed: ${errorData.message || 'Unknown error'}`,
      )
    }
    return response.json()
  } catch (error) {
    console.error('Task deletion error:', error)
    throw error
  }
}

export const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks`, {
      method: 'GET',
      headers: await prepareHeaders(),
      credentials: 'include',
    });
    if (!response.ok) {
      console.error('Failed to fetch tasks, response status:', response.status, response.statusText);
      const errorData = await response.json();
      throw new Error(`Fetching tasks failed: ${errorData.message || 'Unknown error'}`);
    }
    const tasks = await response.json();
    console.log('Tasks response received:', tasks);
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};