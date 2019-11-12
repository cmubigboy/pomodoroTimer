import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import {vibrate} from './utils';

import PomoTimer from './PomoTimer'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}><Text style={styles.red}>Pomodoro</Text> Timer</Text>
        <View style={styles.elementsContainer}>
          <PomoTimer />
          {/* <PomoTimer workMin="0" workSec="5" breakMin="0" breakSec="5"/>
          <PomoTimer /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  elementsContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    paddingTop: 0,
  },
  display: { textAlign: 'center', fontSize: 48, fontFamily: "Verdana" },
  red: { color: 'red' },
  title: { textAlign: 'center', fontSize: 24, fontFamily: "Verdana"}
});
