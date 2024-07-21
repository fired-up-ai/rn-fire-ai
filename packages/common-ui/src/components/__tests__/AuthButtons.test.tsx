import React from 'react';
import { render, fireEvent } from '@testing-library/react-native'
import AuthButtons from '../AuthButtons';

describe('AuthButtons', () => {
  it('calls onSignInPress when the Sign In button is pressed', () => {
    const onSignInPress = jest.fn();
    const onSignUpPress = jest.fn();
    const { getByText } = render(<AuthButtons onSignInPress={onSignInPress} onSignUpPress={onSignUpPress} />);

    fireEvent.press(getByText('Sign In'));
    expect(onSignInPress).toHaveBeenCalled();
  });

  it('calls onSignUpPress when the Sign Up button is pressed', () => {
    const onSignInPress = jest.fn();
    const onSignUpPress = jest.fn();
    const { getByText } = render(<AuthButtons onSignInPress={onSignInPress} onSignUpPress={onSignUpPress} />);

    fireEvent.press(getByText('Sign Up'));
    expect(onSignUpPress).toHaveBeenCalled();
  });

  // Optional: Snapshot test
  it('matches snapshot', () => {
    const onSignInPress = jest.fn();
    const onSignUpPress = jest.fn();
    const tree = render(<AuthButtons onSignInPress={onSignInPress} onSignUpPress={onSignUpPress} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});