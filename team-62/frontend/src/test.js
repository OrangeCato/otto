import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

describe('Login Component', () => {
  it('renders without crashing', () => {
    render(<Login />);
  });

//   it('handles login button click', async () => {
//     const { getByLabelText, getByText } = render(<Login />);
//     // Your test logic here...
//     // For example, you can assert that certain elements are present or simulate user actions.
//   });
});
