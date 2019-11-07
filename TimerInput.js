import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  timeLabel: { flex: 1, fontSize: 12,fontFamily: "Verdana", },
  timerLabel: { flex: 3, fontSize: 14,fontFamily: "Verdana", fontWeight: 'bold'},
  timerCounter: {
    flex: 3,
    fontSize: 18,
    fontFamily: "Courier",
    borderColor: 'gray',
     borderWidth: 1
  }
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
      <View style={styles.container}>
        <Text style={styles.timerLabel}>{this.state.name}</Text>
        <Text style={styles.timeLabel}>Mins:</Text>
        <TextInput
         style={styles.timerCounter}
         keyboardType='number-pad'
         onChangeText={text => this.setState({ minutes: text })}
         value={this.state.minutes}
        />
        <Text style={styles.timeLabel}>Secs:</Text>
        <TextInput
         style={styles.timerCounter}
         keyboardType='number-pad'
         onChangeText={text => this.setState({ seconds: text })}
         value={this.state.seconds}
        />
      </View>

    )
  }
}