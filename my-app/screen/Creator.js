import React from 'react';
import Profile from '../assets/profile.png';
import {
  View,
  Text,
  Image,
} from 'react-native';
import styles from '../style';

export default function Creator() {

  return (
    <View style={styles.container}>
      <Image style={styles.imageProfile} source={Profile} />
      <Text style={styles.welcome}>Amir Faisal Zamzami</Text>
      <Text style={styles.hello}>
        Hola! thank you for playing my app. This is my first app made by
        react-native. I worked on this app in just 3 days. If you want to see my
        other portfolio, please visit my Github page. thank you.
      </Text>
      <Text style={[styles.welcome, {marginTop: 16}]}>https://github.com/amirfaisalz</Text>
    </View>
  );
}
