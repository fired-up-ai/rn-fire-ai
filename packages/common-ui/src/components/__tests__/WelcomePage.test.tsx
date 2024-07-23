import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomePage from '../WelcomePage';

const testImagePath = require('./assets/test-image.jpg');
describe('WelcomePage', () => {
  const defaultProps = {
    image: testImagePath,
    title: 'Welcome to the App',
    description: 'This is a test description.',
    onSignInPress: jest.fn(),
    onSignUpPress: jest.fn(),
  };

  it('renders correctly with given props', () => {
    const { getByText } = render(<WelcomePage {...defaultProps} />);
    // Verify title and description are rendered and visible
    expect(getByText(defaultProps.title)).toBeTruthy();
    expect(getByText(defaultProps.description)).toBeTruthy();
  });

  // Snapshot test
  it('matches snapshot', () => {
    const tree = render(<WelcomePage {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders background image when image prop is provided', () => {
    const { getByTestId } = render(<WelcomePage {...defaultProps} image={testImagePath} />);
    // Verify background image is rendered
    expect(getByTestId('background-image')).toBeTruthy();
  });
});