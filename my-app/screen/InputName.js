import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../style';

export default function InputName({ navigation: { navigate } }) {
  const [notif, setNotif] = useState(false);
  const [nameInput, setNameInput] = useState('');

  const nameBtn = () => {
    if (!nameInput) {
      setNotif(true);
      setTimeout(() => {
        setNotif(false);
      }, 2000);
    } else {
      AsyncStorage.setItem('name', nameInput).then(() => {
        setNameInput('');
        navigate('Home', {
          name: nameInput,
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome Sudoku App</Text>
      <Text style={styles.hello}>Before you play, please input your name</Text>
      {notif ? <Text style={styles.notif}>Name is required</Text> : null}
      <TextInput
        style={styles.inputName}
        onChangeText={(text) => setNameInput(text)}
        value={nameInput}
        placeholder="Input your name"
        placeholderTextColor={'#4856fe'}
      />
      <TouchableOpacity onPress={nameBtn} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Submit Name</Text>
      </TouchableOpacity>
    </View>
  );
}
