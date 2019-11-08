import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Constants from 'expo-constants';

import TimerInput from './TimerInput.js'
import vibrate from './utils/vibrate.js';

const isEmpty = (val) => (val === undefined | val === null)

export default class PomoTimer extends React.Component {
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
     console.log("toggleTimer")
     this.setState({timerActive: !this.state.timerActive})
     if (this.state.timerActive) {
      clearInterval(this.interval)
     } else {
       this.interval = setInterval(this.dec, 1000)
     }
  }

  handleNewValue = () => {
    console.log("handleNewValue")
    this.resetTimer()
  }

  resetTimer = () => {
    console.log("resetTimer")
    clearInterval(this.interval)
    this.setState({
      timerActive: false,
      timerForWork: true,
      counter: (this.state.workMin * 60) + (this.state.workSec * 1),
    })
   }

  render() {
    return (
      <View style={styles.elementsContainer}>
        <Text style={styles.displayName}>{this.state.timerForWork?"Work Timer":"Break Timer"}</Text>
        <Text style={styles.displayTime}>{Math.floor(this.state.counter / 60)}:
          {this.state.counter % 60 < 10 ? "0" : ""}{this.state.counter % 60}</Text>
        <View style={styles.row}>
          <Button style={styles.flex1} title={this.state.timerActive?"PAUSE":"START"} onPress={this.toggleTimer}/>
          <Button style={styles.flex1} title="RESET" onPress={this.resetTimer} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.timerLabel}>Work Time</Text>
          <Text style={styles.timeLabel}>Mins:</Text>
          <TextInput
          style={styles.inputs}
          keyboardType='numeric'
          onChangeText={minutes => { this.setState({ workMin: minutes }); this.handleNewValue(); }}
          value={this.state.workMin}
          />
          <Text style={styles.timeLabel}>Secs:</Text>
          <TextInput
          style={styles.inputs}
          keyboardType='number-pad'
          onChangeText={seconds => { this.setState({ workSec: seconds }); this.handleNewValue(); }}
          value={this.state.workSec}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.timerLabel}>Break Time</Text>
          <Text style={styles.timeLabel}>Mins:</Text>
          <TextInput
          style={styles.inputs}
          keyboardType='numeric'
          onChangeText={minutes => { this.setState({ breakMin: minutes }); this.handleNewValue(); }}
          value={this.state.breakMin}
          />
          <Text style={styles.timeLabel}>Secs:</Text>
          <TextInput
          style={styles.inputs}
          keyboardType='number-pad'
          onChangeText={seconds => { this.setState({ breakSec: seconds }); this.handleNewValue(); }}
          value={this.state.breakSec}
          />
        </View>
        {/* <TimerInput name="Work Time" minutes={this.state.workMin} seconds={this.state.workSec}/>
        <TimerInput name="Break Time" minutes={this.state.breakMin} seconds={this.state.breakSec}/> */}
        <View>
            <View style={styles.row}>
              <Text>counter: {this.state.counter}</Text>
              <Text>active: {this.state.timerActive?"Active":"Paused"}</Text>
            </View>
            <View style={styles.row, styles.padding10}>
              <Text style={styles.flex1 , styles.red}>workMin: {this.state.workMin}</Text>
              <Text style={styles.flex1}>workSec: {this.state.workSec}</Text>
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { marginTop: Constants.statusBarHeight, flex: 1, },
  displayName: { textAlign: 'center', fontSize: 48, fontFamily: "Verdana", fontWeight: 'bold' },
  displayTime: { textAlign: 'center', fontSize: 48, fontFamily: "Verdana" },
  elementsContainer: { alignItems: 'center', },
  flex1: { flex: 1 },
  inputContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  inputs:    { flex: 3, fontSize: 18, fontFamily: "Courier", borderColor: 'gray', borderWidth: 1 },
  padding10: { paddingHorizontal: 10 },
  rowLabel:  { flex: 3, fontSize: 14, fontFamily: "Verdana", fontWeight: 'bold' },
  red: { color: 'red' },
  row: { flexDirection: 'row' },
  timeLabel: { flex: 1, fontSize: 12, fontFamily: "Verdana", },
  title: { textAlign: 'center', fontSize: 24, fontFamily: "Verdana"}
});
