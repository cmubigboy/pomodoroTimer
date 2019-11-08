import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

import TimerInput from './TimerInput.js'

const isEmpty = (val) => (val === undefined | val === null)


export default class PomoTimer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      workMin: isEmpty(props.workMin) ? "25" : props.workMin,
      workSec: isEmpty(props.workSec) ? "0" : props.workSec,
      breakMin: isEmpty(props.breakMin) ? "25" : props.breakMin,
      breakSec: isEmpty(props.breakSec) ? "0" : props.breakSec,
      counter: 25 * 60,
      timerActive: false,
      timerForWork: true,
    }
  }

  componentDidMount (prevProps, prevState) {
    console.log("work="+this.state.workMin+":"+(this.state.workSec<10?'0':'')+this.state.workSec)
    console.log("break="+this.state.breakMin+":"+(this.state.breakSec<10?'0':'')+this.state.breakSec)

    this.setState({
      counter: 60 * this.state.workMin + 1 * this.state.workSec,
      timerActive: true,
      timerForWork: true,
    })
    this.interval = setInterval(this.dec, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  dec = () => {
    console.log("decrementing...",this.state.counter)
    if (this.state.counter <= 0) {
      this.setState(prevState => ({
        timerForWork: !prevState.timerForWork,
        counter: prevState.timerForWork ?
          60 * prevState.breakMin + 1 * prevState.breakSec :
          60 * prevState.workMin + 1 * prevState.workSec,
      }))
    }
    this.setState(prevState => ({
      counter: prevState.counter - 1,
    }))
  }
  toggleTimer = () => {
     console.log("toggleTimer")
     this.setState({timerActive: !this.state.timerActive})
  }

  resetTimer = () => {
    console.log("resetTimer")
    this.setState({
      timerActive: false,
      timerForWork: true,
      counter: (this.state.workMin * 60) + (this.state.workSec * 1),
    })
   }

  render() {
    return (
      <View style={styles.elementsContainer}>
        <Text style={styles.display}>{Math.floor(this.state.counter / 60)}:
          {this.state.counter % 60 < 10 ? "0" : ""}{this.state.counter % 60}</Text>
        <View style={styles.buttonRow}>
          <Button style={styles.flex1} title="PAUSE" onPress={this.toggleTimer}/>
          <Button style={styles.flex1} title="RESET" onPress={this.resetTimer} />
          <View>
            <View style={styles.buttonRow}>
              <Text>counter: {this.state.counter}</Text>
              <Text>workMin: {this.state.counter}</Text>
            </View>
            <View style={styles.buttonRow}>
              <Text>workMin: {this.state.workMin}</Text>
              <Text>workSec: {this.state.workSec}</Text>
            </View>
          </View>          
        </View>
        <TimerInput name="Work Time" minutes={this.state.workMin} seconds={this.state.workSec}/>
        <TimerInput name="Break Time" minutes={this.state.breakMin} seconds={this.state.breakSec}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
  },
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  display: { textAlign: 'center', fontSize: 48, fontFamily: "Verdana" },
  elementsContainer: {
    alignItems: 'center',
  },
  flex1: { flex: 1 },
  red: { color: 'red' },
  title: { textAlign: 'center', fontSize: 24, fontFamily: "Verdana"}
});
