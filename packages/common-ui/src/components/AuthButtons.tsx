// @fired-up-ai/common-ui/src/components/AuthButtons.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface AuthButtonsProps {
  onSignInPress: () => void;
  onSignUpPress: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ onSignInPress, onSignUpPress }) => {
  return (
    <View style={styles.container}>
      <Button title="Sign In" onPress={onSignInPress} />
      <Button title="Sign Up" onPress={onSignUpPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default AuthButtons;