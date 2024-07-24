import React from 'react';
import { render } from '@testing-library/react-native';
import withProviders from '../withProviders'; // Adjust the import path as necessary
import { store } from '@fired-up-ai/store';
import * as redux from 'react-redux';
import * as paper from 'react-native-paper';
import WelcomePage from '../../components/WelcomePage';

// Mock the external modules
jest.mock('@fired-up-ai/store', () => ({
  store: {
    getState: jest.fn(),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  },
}));
jest.mock('react-redux', () => ({
  Provider: jest.fn(({ children }) => children),
}));
jest.mock('react-native-paper', () => ({
  Provider: jest.fn(({ children }) => children),
}));

describe('withProviders HOC', () => {
  it('wraps a component with Redux and Paper providers', () => {
    // Correctly wrap WelcomePage component
    const WrappedComponent = withProviders(WelcomePage);

    // Define props for WelcomePage
    const welcomePageProps = {
      image: require('../../components/__tests__/assets/test-image.jpg'),
      title: 'Welcome to the App',
      description: 'This is a test description.',
      onSignInPress: jest.fn(),
      onSignUpPress: jest.fn(),
    };

    // Render the wrapped component with props
    const { getByText } = render(<WrappedComponent {...welcomePageProps} />);

    // Assertions
    expect(redux.Provider).toHaveBeenCalled();
    expect(paper.Provider).toHaveBeenCalled();
    expect(getByText(welcomePageProps.title)).toBeTruthy();
    expect(getByText(welcomePageProps.description)).toBeTruthy();
  });
});