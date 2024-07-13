// auth-flow/src/routes/index.tsx
import React, { useState } from 'react';
import { useAuth } from '../ctx/AuthContext';
import { ImageSourcePropType } from 'react-native';
import { WelcomePage, SignIn } from '@fired-up-ai/common-ui';
import { useRouter } from 'expo-router';

const Home: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const { signInEmail, signUpEmail, signInGoogle, signInGitHub } = useAuth();
  const router = useRouter();

  const handleSignIn = () => {
    setMode('signin');
  };

  const handleSignUp = () => {
    setMode('signup');
  };

  const handleSubmit = async (email: string, password: string) => {
    try {
      if (mode === 'signin') {
        await signInEmail(email, password);
      } else {
        await signUpEmail(email, password);
      }
      router.replace('/(app)');
    } catch (error) {
      console.error('Error:', error);
      // Handle error (show error message to user)
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInGoogle();
    } catch (error) {
      console.error('Error signing in with Google:', error);
      // Handle error
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInGitHub();
    } catch (error) {
      console.error('Error signing in with GitHub:', error);
      // Handle error
    }
  };

  const image: ImageSourcePropType = require('../assets/background.jpg');
  const title = "Fire App";
  const description = "Welcome to Fire App. Sign in or create an account to get started.";

  return (
    <>
      <WelcomePage
        image={image}
        title={title}
        description={description}
        onSignInPress={handleSignIn}
        onSignUpPress={handleSignUp}
      />
      <SignIn
        mode={mode} 
        onSubmit={handleSubmit}
        onGoogleSignIn={handleGoogleSignIn}
        onGithubSignIn={handleGithubSignIn}
      />
    </>
  );
};

export default Home;