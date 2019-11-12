import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types'

import vibrate from './utils/vibrate.js';

const isEmpty = (val) => (val === undefined || val === null || val === "" )
const isValidMin = (min) => !(isNaN(min) || min<0)
const isValidSec = (sec) => !(isNaN(sec) || sec>59 || sec<0)

export default class PomoTimer extends React.Component {
  static propTypes = {
    workMin:  PropTypes.string, workSec:  PropTypes.string,
    breakMin: PropTypes.string, breakSec: PropTypes.string,
  }
  constructor(props) {
    super(props)
    this.state = {
      workMin: isEmpty(props.workMin) ? "25" : props.workMin,
      workSec: isEmpty(props.workSec) ? "0" : props.workSec,
      breakMin: isEmpty(props.breakMin) ? "5" : props.breakMin,
      breakSec: isEmpty(props.breakSec) ? "0" : props.breakSec,
      counter: 25 * 60,
      timerActive: false,
      timerForWork: true,
    }
  }

  componentDidMount (prevProps, prevState) {
    this.setState((prevState, props) => ({
      counter: 60 * prevState.workMin + 1 * prevState.workSec,
      timerActive: true,
      timerForWork: true,
    }))
    this.interval = setInterval(this.dec, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  dec = () => {
    if (this.state.counter <= 1) {
      this.setState(prevState => ({
        timerForWork: !prevState.timerForWork,
        counter: prevState.timerForWork ?
          60 * prevState.breakMin + 1 * prevState.breakSec :
          60 * prevState.workMin + 1 * prevState.workSec,
      }))
      vibrate()
    } else {
      this.setState(prevState => ({
        counter: prevState.counter - 1,
      })) 
    }
  }

  toggleTimer = () => {
     this.setState((prevState) => ({timerActive: !prevState.timerActive}))
     if (this.state.timerActive) {
      clearInterval(this.interval)
     } else {
       this.interval = setInterval(this.dec, 1000)
     }
  }

  updateWorkMin = (min) => {
    this.setState( state => ({ workMin: isValidMin(min) ? (1 * min + "") : state.workMin }) )
    if (this.state.timerForWork) this.resetTimer()
  }
  updateWorkSec = (sec) => {
    this.setState( state => ({ workSec: isValidSec(sec) ? (1 * sec + "") : state.workSec }) )
    if (this.state.timerForWork) this.resetTimer()
  }
  updateBreakMin = (min) => {
    this.setState( state => ({ breakMin: isValidMin(min) ? (1 * min + "") : state.breakMin }) )
    if (!this.state.timerForWork) this.resetTimer()
  }
  updateBreakSec = (sec) => {
    this.setState(state => ({ breakSec: isValidSec(sec) ? (1 * sec + "") : state.breakSec }) )
    if (!this.state.timerForWork) this.resetTimer()
  }

  resetTimer = () => {
    clearInterval(this.interval)
    this.setState( (prevState) => ({
      timerActive: false,
      counter: prevState.timerForWork ? 
               (60 * prevState.workMin + 1 * prevState.workSec) :
               (60 * prevState.breakMin + 1 * prevState.breakSec),
    }) )
   }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.displayName}>{this.state.timerForWork?"Work Timer":"Break Timer"}</Text>
        <Text style={styles.displayTime}>{Math.floor(this.state.counter / 60)}:
          {this.state.counter % 60 < 10 ? "0" : ""}{this.state.counter % 60}</Text>
        <View style={styles.row}>
          <Button style={styles.button} title={this.state.timerActive?"Pause":"Start"} onPress={this.toggleTimer}/>
          <Button style={styles.button} title="Reset" onPress={this.resetTimer} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.rowLabel}>Work Time</Text>
          <Text style={styles.timeLabel}>Mins: </Text>
          <TextInput
          style={styles.inputs}
          keyboardType='number-pad'
          onChangeText = { minutes => this.updateWorkMin(minutes) }
          value={this.state.workMin}
          />
          <Text style={styles.timeLabel}>Secs: </Text>
          <TextInput
          style={styles.inputs}
          keyboardType='number-pad'
          onChangeText = { seconds => this.updateWorkSec(seconds) }
          value={this.state.workSec}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.rowLabel}>Break Time</Text>
          <Text style={styles.timeLabel}>Mins: </Text>
          <TextInput
          style={styles.inputs}
          keyboardType='number-pad'
          onChangeText = { minutes => this.updateBreakMin(minutes) }
          value={this.state.breakMin}
          />
          <Text style={styles.timeLabel}>Secs: </Text>
          <TextInput
          style={styles.inputs}
          keyboardType='number-pad'
          onChangeText = { seconds => this.updateBreakSec(seconds) }
          value={this.state.breakSec}
          />
        </View>
      </View>
    );
  }
} // End of PomoTimer Class

const styles = StyleSheet.create({
  button: { flex: 1, padding: 10, },
  displayName: { textAlign: 'center', fontSize: 44, fontFamily: "Verdana", fontWeight: 'bold' },
  displayTime: { textAlign: 'center', fontSize: 64, fontFamily: "Verdana" },
  container: { alignItems: 'center', flex: 1, },
  flex1: { flex: 1 },
  inputContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 4,
  },
  inputs:    { flex: 1, padding: 4, fontSize: 18, fontFamily: "Courier", borderColor: 'gray', borderWidth: 1 },
  rowLabel:  { flex: 2, padding: 4, fontSize: 14, fontFamily: "Verdana", fontWeight: 'bold' },
  red: { color: 'red' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  timeLabel: { flex: 1, textAlign: 'center', fontSize: 12, fontFamily: "Verdana", },
  title: { textAlign: 'center', fontSize: 24, fontFamily: "Verdana"}
});
