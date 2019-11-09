import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types'

import vibrate from './utils/vibrate.js';

const isEmpty = (val) => (val === undefined | val === null)

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
    //console.log("work="+this.state.workMin+":"+(this.state.workSec<10?'0':'')+this.state.workSec)
    //console.log("break="+this.state.breakMin+":"+(this.state.breakSec<10?'0':'')+this.state.breakSec)

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
    //console.log("decrementing...",this.state.counter)
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
     //console.log("toggleTimer")
     this.setState((prevState) => ({timerActive: !prevState.timerActive}))
     if (this.state.timerActive) {
      clearInterval(this.interval)
     } else {
       this.interval = setInterval(this.dec, 1000)
     }
  }

  updateWorkMin = (min) => {
    this.setState( { workMin: min } )
    if (this.state.timerForWork) this.resetTimer();
  }
  updateWorkSec = (sec) => {
    this.setState( { workSec: sec } )
    if (this.state.timerForWork) this.resetTimer();
  }
  updateBreakMin = (min) => {
    this.setState( { breakMin: min } )
    if (!this.state.timerForWork) this.resetTimer();
  }
  updateBreakSec = (sec) => {
    this.setState( { breakSec: sec } )
    if (!this.state.timerForWork) this.resetTimer();
  }

  resetTimer = () => {
    //console.log("resetTimer")
    clearInterval(this.interval)
    this.setState((prevState) => ({
      timerActive: false,
      //timerForWork: true, // removed so it doesn't reset always back to work timer
      // counter: (this.state.workMin * 60) + (this.state.workSec * 1), // WRONG WAY
      counter: (prevState.workMin * 60) + (prevState.workSec * 1),
    }))

    const min = Math.floor(this.state.counter / 60)
    const sec = "" + (this.state.counter % 60 < 10 ? "0" : "") + (this.state.counter % 60)
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
          keyboardType='numeric'
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
          keyboardType='numeric'
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
}

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
