
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
import SignInComponent from './SignInComponent';

const AuthButtons = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'login' | 'signup'>('login');
  
  const showModal = (mode: 'login' | 'signup') => {
    console.log('showModal', mode);
    setAuthMode(mode);
    setIsModalVisible(true);
  }

  const hideModal = () => {
    setIsModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => showModal('login')}>
        Login
      </Button>
      <Button mode="outlined" onPress={() => showModal("signup")}>
        Sign Up
      </Button>
      <Portal>
        <Modal visible={isModalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <SignInComponent mode={authMode} onClose={hideModal} navigation={navigation} />
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
});

export default AuthButtons;