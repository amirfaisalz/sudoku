import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import styles from '../style';

export default function Home({ navigation: { navigate }, route }) {
  const [savedName, setSavedName] = useState('');

  useEffect(() => {
    setSavedName(route.params.name);oute
  })

  const toEasyGame = () => {
    navigate('Game', {
      difficulty: 'easy',
    });
  };
  const toMediumGame = () => {
    navigate('Game', {
      difficulty: 'medium',
    });
  };
  const toHardGame = () => {
    navigate('Game', {
      difficulty: 'hard',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Howdy {savedName}!</Text>
      <Text style={styles.hello}>Let's play, choose your level:</Text>
      <TouchableOpacity onPress={toEasyGame} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Easy Peasy</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toMediumGame} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Medium</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toHardGame} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Hard</Text>
      </TouchableOpacity>
    </View>
  );
}
