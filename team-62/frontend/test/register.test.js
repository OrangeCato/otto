import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrationForm from '../src/components/RegistrationForm';
import '@testing-library/jest-dom';

// Mock the useAuth and useNavigate hooks
jest.mock('../src/context/AuthContext', () => ({
  useAuth: () => ({
    register: jest.fn().mockResolvedValue(null) // Assuming null is the success response
  })
}));
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  Link: () => <a href="/login">Login</a> // Mock Link to avoid rendering Router context
}));

describe('RegistrationForm Component', () => {
    beforeEach(() => {
      // Reset all mocks before each test
      jest.clearAllMocks();
    });
  
    test('renders RegistrationForm component', () => {
      render(<RegistrationForm />);
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    });
  
    test('allows entering name, email, and password', async () => {
      render(<RegistrationForm />);
      await userEvent.type(screen.getByLabelText(/Name/i), 'John Doe');
      await userEvent.type(screen.getByLabelText(/Email/i), 'john@example.com');
      await userEvent.type(screen.getByLabelText(/Password/i), 'password123');
  
      expect(screen.getByLabelText(/Name/i)).toHaveValue('John Doe');
      expect(screen.getByLabelText(/Email/i)).toHaveValue('john@example.com');
      expect(screen.getByLabelText(/Password/i)).toHaveValue('password123');
    });
  
    test('calls register function on form submission with valid input', async () => {
      const registerMock = jest.fn();
      jest.spyOn(require('../src/context/AuthContext'), 'useAuth').mockReturnValue({ register: registerMock });
  
      render(<RegistrationForm />);
      await userEvent.type(screen.getByLabelText(/Name/i), 'John Doe');
      await userEvent.type(screen.getByLabelText(/Email/i), 'john@example.com');
      await userEvent.type(screen.getByLabelText(/Password/i), 'password123');
      await userEvent.click(screen.getByRole('button', { name: /Register/i }));
  
      await waitFor(() => {
        expect(registerMock).toHaveBeenCalledWith({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
      });
    });
  });
  