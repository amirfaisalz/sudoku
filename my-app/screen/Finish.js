import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../style';
export default function Finish({ navigation: { navigate } }) {
  const [savedName, setSavedName] = useState('');
  const [loading, setLoading] = useState(false);

  function newGame() {
    navigate('Home');
  }

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('name')
      .then((name) => {
        setSavedName(name);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [AsyncStorage]);

  if (loading)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Congratulation {savedName}!! </Text>
      <Text style={styles.welcome}>Want more challenge?</Text>
      <TouchableOpacity onPress={newGame} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Start New Game</Text>
      </TouchableOpacity>
    </View>
  );
}
