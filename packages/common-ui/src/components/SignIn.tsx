// @fired-up-ai/common-ui/src/components/SignInProps.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ValidatedText from './ValidatedText';

interface SignInProps {
  mode: 'signin' | 'signup';
  onSubmit: (email: string, password: string) => void;
  onGoogleSignIn: () => void;
  onGithubSignIn: () => void;
}

const SignIn: React.FC<SignInProps> = ({
  mode,
  onSubmit,
  onGoogleSignIn,
  onGithubSignIn
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : 'Invalid email address';
  };

  const validatePassword = (password: string) => {
    return password.length >= 6 ? null : 'Password must be at least 6 characters';
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    return confirmPassword === password ? null : 'Passwords do not match';
  };

  const handleSubmit = () => {
    if (mode === 'signup' && password !== confirmPassword) {
      return;
    }
    onSubmit(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</Text>
      <ValidatedText
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        validator={validateEmail}
      />
      <ValidatedText
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        validator={validatePassword}
      />
      {mode === 'signup' && (
        <ValidatedText
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
          validator={validateConfirmPassword}
        />
      )}
      <Button 
        title={`${mode === 'signin' ? 'Sign In' : 'Sign Up'} with Email`} 
        onPress={handleSubmit} 
        />
      <Text style={styles.additionalText}>Or sign in with:</Text>
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={onGoogleSignIn}>
          <Ionicons name="logo-google" size={24} color="red" />
          <Text 
            style={styles.socialButtonText}>
              Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={onGithubSignIn}>
          <Ionicons name="logo-github" size={24} color="black" />
          <Text 
            style={styles.socialButtonText}>
              GitHub
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  socialButtonText: {
    marginLeft: 10,
  },
  additionalText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SignIn;