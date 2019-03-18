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
            stopCountDown: false
        }
    }

    componentDidMount() {
        // setInterval calls countdown function every second
        this.timer = setInterval(
            () => this.countdown(),
            1000
        );
    }

    countdown = () => {
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
            clearInterval(this.timer);
            this.setState({ stopCountDown: true })
        }

    }

    render() {
        return (
            <div id="pomodoro-app">
                <h1>Pomodoro Clock</h1>
                <p id="timer-label">{this.state.stopCountDown === false ? 'Counting down...' : 'Stopped'}</p>
                <p id="time-left">{this.state.minutes < 10 ? "0" + this.state.minutes : this.state.minutes}:{this.state.seconds < 10 ? "0" + this.state.seconds : this.state.seconds}</p>
                <div>
                    <button id="start_stop">{this.state.stopCountDown === true ? '▻' : '❚❚'}</button>
                    <button id="reset">↺</button>
                </div>
                <div>
                    <h3 id="break-label">Break Length: <span id="break-length">{this.state.breakLength}</span></h3>
                    <button id="break-decrement">↑</button>
                    <button id="break-increment">↓</button>
                </div>
                <div>
                    <h3 id="session-label">Session Length: <span id="session-length">{this.state.sessionLength}</span></h3>
                    <button id="session-decrement">↑</button>
                    <button id="session-increment">↓</button>
                </div>
            </div>
        )
    }
}

export default App;
