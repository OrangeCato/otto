import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../src/components/Login';
import '@testing-library/jest-dom';

// Mock the useAuth and useNavigate hooks
const mockLogin = jest.fn(); // Define a mock function for login
jest.mock('../src/context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin // Use the mock function here
  })
}));
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn()
}));

describe('Login Component', () => {
  beforeEach(() => {
    mockLogin.mockClear(); // Clear the mock function's usage data before each test
  });

  test('renders Login component', () => {
    render(<Login />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('allows entering email and password', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/Password/i), 'password');

    expect(screen.getByLabelText(/Email/i)).toHaveValue('test@example.com');
    expect(screen.getByLabelText(/Password/i)).toHaveValue('password');
  });

  test('calls login function on form submission', async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/Password/i), 'password');
    await userEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password');
    });
  });
});
