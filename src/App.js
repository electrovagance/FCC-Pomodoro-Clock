import React, { Component } from 'react';
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
                <p id="timer-label">{this.state.stopCountDown === false ? 'Counting down...' : 'Session inactive'}</p>
                <p id="time-left">{this.state.minutes < 10 ? "0" + this.state.minutes : this.state.minutes}:{this.state.seconds < 10 ? "0" + this.state.seconds : this.state.seconds}</p>
                <div>
                    <button id="start_stop" onClick={this.startOrStopCountDown}>
                        {this.state.stopCountDown === true ? '▻' : '❚❚'}
                    </button>
                    <button id="reset" onClick={this.resetCountDown}>↺</button>
                </div>
                <div>
                    <h3 id="break-label">Break Length: <span id="break-length">{this.state.breakLength}</span> min.</h3>
                    <button id="break-increment" onClick={this.incrementBreakLength}>↑</button>
                    <button id="break-decrement" onClick={this.decrementBreakLength}>↓</button>
                </div>
                <div>
                    <h3 id="session-label">Session Length: <span id="session-length">{this.state.sessionLength}</span> min.</h3>
                    <button id="session-increment" onClick={this.incrementSessionLength}>↑</button>
                    <button id="session-decrement" onClick={this.decrementSessionLength}>↓</button>
                </div>
            </div>
        )
    }
}

export default App;
