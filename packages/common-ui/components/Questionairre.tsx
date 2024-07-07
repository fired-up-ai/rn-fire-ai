import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthButtons from './AuthButtons'

const Questionairre: React.FC = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Here we will implement questionairres</Text>
      <View style={styles.authButtonsContainer}>
        <AuthButtons navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default Questionairre;