import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

import TimerInput from './TimerInput.js'

export default class PomoTimer extends React.Component {
  render() {
    return (
      <View style={styles.elementsContainer}>
        <Text style={styles.display}>24:59</Text>
        <TimerInput name="Work Time" minutes="25" seconds="0"/>
        <TimerInput name="Break Time" minutes="5" seconds="0"/>
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
    alignItems: 'center',
  },
  display: { textAlign: 'center', fontSize: 48, fontFamily: "Verdana" },
  red: { color: 'red' },
  title: { textAlign: 'center', fontSize: 24, fontFamily: "Verdana"}
});
