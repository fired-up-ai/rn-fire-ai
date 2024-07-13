// @fired-up-ai/common-ui/src/components/WelcomePage.tsx
import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import AuthButtons from '../auth/AuthButtons';

interface WelcomePageProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onSignIn, onSignUp }) => {
  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Fire App</Text>
        <Text style={styles.description}>
          Welcome to Fire App. Sign in or create an account to get started.
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default WelcomePage;