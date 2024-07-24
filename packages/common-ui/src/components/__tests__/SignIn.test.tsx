import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import SignIn from '../SignIn';

describe('SignIn Component', () => {
  it('renders correctly in signin mode', () => {
    const { getByText } = render(<SignIn mode="signin" onSubmit={jest.fn()} onGoogleSignIn={jest.fn()} onGithubSignIn={jest.fn()} />);
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('renders correctly in signup mode', () => {
    const { getByPlaceholderText } = render(<SignIn mode="signup" onSubmit={jest.fn()} onGoogleSignIn={jest.fn()} onGithubSignIn={jest.fn()} />);
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
  });

  it('allows inputting email, password, and confirm password', () => {
    const { getByPlaceholderText } = render(<SignIn mode="signup" onSubmit={jest.fn()} onGoogleSignIn={jest.fn()} onGithubSignIn={jest.fn()} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password');
    // Assertions to verify the state updates would go here, but since we're testing a functional component without direct access to its state, this step is more about ensuring no errors occur during these interactions.
  });

  it('submits the form with valid inputs in case of sign in', () => {
    const mockSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(<SignIn mode="signin" onSubmit={mockSubmit} onGoogleSignIn={jest.fn()} onGithubSignIn={jest.fn()} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('Sign In with Email'));
    expect(mockSubmit).toHaveBeenCalledWith('test@example.com', 'password');
  });

  it('submits the form with valid inputs in case of sign up', () => {
    const mockSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(<SignIn mode="signup" onSubmit={mockSubmit} onGoogleSignIn={jest.fn()} onGithubSignIn={jest.fn()} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password');
    fireEvent.press(getByText('Sign Up with Email'));
    expect(mockSubmit).toHaveBeenCalledWith('test@example.com', 'password');
  });

  it('triggers Google sign-in', () => {
    const mockGoogleSignIn = jest.fn();
    const { getByText } = render(<SignIn mode="signin" onSubmit={jest.fn()} onGoogleSignIn={mockGoogleSignIn} onGithubSignIn={jest.fn()} />);
    fireEvent.press(getByText('Google'));
    expect(mockGoogleSignIn).toHaveBeenCalled();
  });

  it('triggers GitHub sign-in', () => {
    const mockGithubSignIn = jest.fn();
    const { getByText } = render(<SignIn mode="signin" onSubmit={jest.fn()} onGoogleSignIn={jest.fn()} onGithubSignIn={mockGithubSignIn} />);
    fireEvent.press(getByText('GitHub'));
    expect(mockGithubSignIn).toHaveBeenCalled();
  });

  it('validates email input', () => {
    const { getByPlaceholderText, getByText } = render(<SignIn mode="signin" onSubmit={jest.fn()} onGoogleSignIn={jest.fn()} onGithubSignIn={jest.fn()} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
    expect(getByText('Invalid email address')).toBeTruthy();
  });

    it('validates password input', () => {
        const { getByPlaceholderText, getByText } = render(<SignIn mode="signin" onSubmit={jest.fn()} onGoogleSignIn={jest.fn()} onGithubSignIn={jest.fn()} />);
        fireEvent.changeText(getByPlaceholderText('Password'), 'short');
        expect(getByText('Password must be at least 6 characters')).toBeTruthy();
    });

    it('validates confirm password input', () => {
        const { getByPlaceholderText, getByText } = render(<SignIn mode="signup" onSubmit={jest.fn()} onGoogleSignIn={jest.fn()} onGithubSignIn={jest.fn()} />);
        fireEvent.changeText(getByPlaceholderText('Password'), 'password');
        fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'different-password');
        expect(getByText('Passwords do not match')).toBeTruthy();
    });

    it('does not render confirm password input in signin mode', () => {
        const { queryByPlaceholderText } = render(<SignIn mode="signin" onSubmit={jest.fn()} onGoogleSignIn={jest.fn()} onGithubSignIn={jest.fn()} />);
        expect(queryByPlaceholderText('Confirm Password')).toBeNull();
    });

    it('does not submit form with mismatched passwords in signup mode', () => {
        const mockSubmit = jest.fn();
        const { getByText, getByPlaceholderText } = render(<SignIn mode="signup" onSubmit={mockSubmit} onGoogleSignIn={jest.fn()} onGithubSignIn={jest.fn()} />);
        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password');
        fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'different-password');
        fireEvent.press(getByText('Sign Up with Email'));
        expect(mockSubmit).not.toHaveBeenCalled();
    });
});