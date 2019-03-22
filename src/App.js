import React, { Component } from 'react';
import Timer from './components/Timer';
import StartButton from './components/StartButton'
import ResetButton from './components/ResetButton'
import ChangeTimeButton from './components/ChangeTimeButton'
import TimeLabel from './components/TimeLabel'
import './App.css';

class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
            totalSeconds: 1500, // total seconds (25 minutes * 60 seconds)
            minutes: 25,
            seconds: 0,
            breakLength: 5,
            sessionLength: 25,
            stopCountDown: true
        }
      this.startOrStopCountDown = this.startOrStopCountDown.bind(this);
      this.resetCountDown = this.resetCountDown.bind(this);
      this.incrementBreakLength = this.incrementBreakLength.bind(this);
      this.incrementSessionLength = this.incrementSessionLength.bind(this);
      this.decrementBreakLength = this.decrementBreakLength.bind(this);
      this.decrementSessionLength = this.decrementSessionLength.bind(this);
    }

    incrementBreakLength = () => {
        if (this.state.breakLength < 60 && this.state.stopCountDown === true) this.setState((prevState) => ({ breakLength: prevState.breakLength + 1 }));
    }

    incrementSessionLength = () => {
        if (this.state.sessionLength < 60 && this.state.stopCountDown === true) this.setState((prevState) => ({ sessionLength: prevState.sessionLength + 1 }))
    }

    decrementBreakLength = () => {
        if (this.state.breakLength > 1 && this.state.stopCountDown === true) this.setState((prevState) => ({ breakLength: prevState.breakLength - 1 }))
    }

    decrementSessionLength = () => {
        if (this.state.sessionLength > 1 && this.state.stopCountDown === true) this.setState((prevState) => ({ sessionLength: prevState.sessionLength - 1 }))
    }

    updateCountDown = () => {

    }

    startOrStopCountDown = () => {
        if (this.state.stopCountDown) {
            // setInterval calls countdown function every second
            this.setState({ stopCountDown: false });
            this.timer = setInterval(
                () => this.startCountdown(),
                1000
            );
        } else {
            this.setState({ stopCountDown: true });
            this.stopCountDown();
        }
    }

    resetCountDown = () => {
        clearInterval(this.timer);
        this.setState({ 
            totalSeconds: 1500, // total seconds (25 minutes * 60 seconds)
            minutes: 25,
            seconds: 0,
            breakLength: 5,
            sessionLength: 25,
            stopCountDown: true
        })
    }

    stopCountDown = () => {
        clearInterval(this.timer);
        this.setState({ stopCountDown: true })
    }

    startCountdown = () => {
        // save state in local variables
        let tempMin = this.state.minutes,
            tempSec = this.state.seconds,
            totalSeconds = this.state.totalSeconds;

        // update variables
        tempMin = parseInt(totalSeconds/60);
        tempSec = parseInt(totalSeconds%60);
        totalSeconds--;

        // update state with new time variables
        this.setState({
            totalSeconds: totalSeconds,
            minutes: tempMin,
            seconds: tempSec
        });

        // stops countdown if seconds and minutes are down to zero, stops countdown and updates state in app
        if (this.state.minutes === 0 && this.state.seconds === 0) {
            this.resetCountDown();
        }

    }

    render() {
        return (
            <div id="pomodoro-app">
                <h1>Pomodoro Clock</h1>
                <div>
                    <Timer minutes={this.state.minutes} seconds={this.state.seconds} stop={this.state.stopCountDown} />
                    <StartButton handleClick={this.startOrStopCountDown} stop={this.state.stopCountDown} />
                    <ResetButton handleClick={this.resetCountDown} />
                </div>
                <div>
                    <TimeLabel name="break" length={this.state.breakLength}/>
                    <ChangeTimeButton handleClick={this.incrementBreakLength} idName="break-increment" symbol="↑"/>
                    <ChangeTimeButton handleClick={this.decrementBreakLength} idName="break-decrement" symbol="↓" />
                </div>
                <div>
                    <TimeLabel name="session" length={this.state.sessionLength} />
                    <ChangeTimeButton handleClick={this.incrementSessionLength} idName="session-increment" symbol="↑"/>
                    <ChangeTimeButton handleClick={this.decrementSessionLength} idName="session-decrement" symbol="↓" />
                </div>
            </div>
        )
    }
}

export default App;
