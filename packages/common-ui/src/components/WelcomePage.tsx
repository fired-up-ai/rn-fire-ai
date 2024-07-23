// @fired-up-ai/common-ui/src/components/WelcomePage.tsx
import React from 'react';
import { View, Text, ImageBackground, StyleSheet, ImageSourcePropType } from 'react-native';
import AuthButtons from './AuthButtons';

interface WelcomePageProps {
  image: ImageSourcePropType | null;
  title: string;
  description: string;
  onSignInPress: () => void;
  onSignUpPress: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = (
  { 
    image, 
    title, 
    description, 
    onSignInPress, 
    onSignUpPress 
  }
) => {
  const content = (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <AuthButtons onSignInPress={onSignInPress} onSignUpPress={onSignUpPress} />
    </View>
  );

  return image ? (
    <ImageBackground testID="background-image" source={image} style={styles.background}>
      {content}
    </ImageBackground>
  ) : (
    content
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