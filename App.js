import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

import PomoTimer from './PomoTimer'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}><Text style={styles.red}>Pomodoro</Text> Timer</Text>
        <View style={styles.elementsContainer}>
          <PomoTimer workMin="24" workSec="2" breakMin="3" breakSec="2"/>
          <PomoTimer />
          <PomoTimer />
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
    backgroundColor: '#ecf5fd',
    margin: 20,
    paddingTop: 20,
  },
  display: { textAlign: 'center', fontSize: 48, fontFamily: "Verdana" },
  red: { color: 'red' },
  title: { textAlign: 'center', fontSize: 24, fontFamily: "Verdana"}
});
