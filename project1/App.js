// Pomodoro Timer
// Writted by Henry Liu
// on 10/20/2020
//
// CS50 Mobile App Development with React Native

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Vibration, TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1500,
      stop: true,
      working: true,
      interval: 0,
    };

  };

  // Decreases the amount of time left on the timer
  dec = () => {
    this.setState(prevState => {
      if (prevState.count != 0) {
        return {count: prevState.count - 1};
      } else {
        // Vibrate and start appropriate timer
        Vibration.vibrate(1000);
        if (this.state.working) {
          alert('Time is up');
          return {count: 300, working: false};
        } else {
          alert('Break is done');
          return {count: 1500, working: true};
        }

      }
    });

  }

  // Starts or stops the timer depending on the state
  startstop = () => {
    this.setState(prevState => {
      if (prevState.stop) {
        // console.log('Starting Timer');
        return {stop: false, interval: setInterval(this.dec, 1000)};
      } else {
        // console.log('Stopping Timer');
        clearInterval(this.state.interval);
        return {stop: true};
      }
    })
  }

  // Resets the timer
  reset = () => {
    this.setState(() => {
      clearInterval(this.state.interval);
      return {count: 1500, stop: true, working: true};
    });
  }

  // Converts an int into minutes and seconds
  time_convert(num) { 
  let minutes = Math.floor(num / 60);  
  let seconds = num % 60;
  if (seconds < 10) { seconds = '0' + seconds; }
  if (minutes < 10) { minutes = '0' + minutes; } 
  return `${minutes}:${seconds}`;         
  }

  // Renders DOM
  render() {
    let status;
    let time = this.time_convert(this.state.count);
    if (this.state.working) {
      status = <Text>Time to Work! Lets get Going!</Text>;
    } else {
      status = <Text>Nice work! Take a break!</Text>
    }
    return (
      <View style={styles.container}>
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
          style={styles.button}
          onPress = {this.startstop}
          >
            <Text style={styles.buttonText}>Start/Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.button}
          onPress = {this.reset} 
          >
            <Text style={styles.buttonText}>Reset Timer</Text>
          </TouchableOpacity>
        </View> 
        {/* Status Message */}
        <View style={styles.statusMsg}>
          {status}
        </View>
        {/* Count */}
        <View>
          <Text style={styles.timer}>{ time } </Text>
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 300,
  },
  button: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'lightblue',
    borderColor: 'skyblue',
    height: 35,
    width: 100,
    borderRadius: 10,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  buttonText: {
    fontWeight: 500,
  },
  statusMsg: {
    position: 'absolute',
    top: 400,
  },
  timer: {
    fontSize: 25,
    fontWeight: 'bold',
  }
});
