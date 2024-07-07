// app/components/SignInComponent.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

interface SignInComponentProps {
  mode: 'login' | 'signup';
  onClose: () => void;
  navigation: any;
}

const SignInComponent: React.FC<SignInComponentProps> = ({ mode, onClose, navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = () => {
    // Handle login or signup logic here
    console.log(`${mode} submitted with:`, { email, password });
    onClose();
    navigation.navigate('Home');
  };

  const handleGoogleSignIn = () => {
    console.log(
      "Google Sign In")
  };

  const handleGitHubSignIn = () => {
    console.log('Sign in with GitHub');
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'signup' && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      {mode === 'signup' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
        </>
      )}

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </Button>

      <View style={styles.socialButtonsContainer}>
        <Button
          mode="outlined"
          onPress={handleGoogleSignIn}
          style={styles.socialButton}
          icon={() => <AntDesign name="google" size={24} color="#DB4437" />}
        >
          {mode} with Google
        </Button>
        <Button
          mode="outlined"
          onPress={handleGitHubSignIn}
          style={styles.socialButton}
          icon={() => <AntDesign name="github" size={24} color="#333" />}
        >
          {mode} with GitHub
        </Button>
      </View>    
      <Button onPress={onClose} style={styles.button}>Cancel</Button>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  socialButtonsContainer: {
    marginTop: 20,
  },
  socialButton: {
    marginBottom: 10,
  },
});

export default SignInComponent;
