import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  inputs:    { flex: 3, fontSize: 18, fontFamily: "Courier", 
               borderColor: 'gray', borderWidth: 1 },
  rowLabel:  { flex: 3, fontSize: 14, fontFamily: "Verdana", 
               fontWeight: 'bold'},
  timeLabel: { flex: 1, fontSize: 12, fontFamily: "Verdana", },
})

export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.minutes, props.seconds)
    this.state = {
      minutes: (props.minutes === undefined | props.minutes === null) ? "10" : props.minutes,
      seconds: (props.seconds === undefined | props.minutes === null) ?  "0" : props.seconds,
      name: (props.name === undefined | props.name === null) ?  "My Timer" : props.name,
    }
  }
  
  render() {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.timerLabel}>{this.state.name}</Text>
        <Text style={styles.timeLabel}>Mins:</Text>
        <TextInput
         style={styles.inputs}
         keyboardType='numeric'
         onChangeText={minutes => this.setState({ minutes })}
         value={this.state.minutes}
        />
        <Text style={styles.timeLabel}>Secs:</Text>
        <TextInput
         style={styles.inputs}
         keyboardType='number-pad'
         onChangeText={text => this.setState({ seconds: text })}
         value={this.state.seconds}
        />
      </View>

    )
  }
}