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
            stopCountDown: true,
            startBreakSession: false
        }
        this.startOrStopCountDown = this.startOrStopCountDown.bind(this);
        this.resetCountDown = this.resetCountDown.bind(this);
        this.incrementBreakLength = this.incrementBreakLength.bind(this);
        this.incrementSessionLength = this.incrementSessionLength.bind(this);
        this.decrementBreakLength = this.decrementBreakLength.bind(this);
        this.decrementSessionLength = this.decrementSessionLength.bind(this);
    }

    incrementBreakLength = () => {
        if (this.state.breakLength < 60 && this.state.stopCountDown === true)
            this.setState((prevState) => ({
                breakLength: prevState.breakLength + 1
            }))
    }


    incrementSessionLength = () => {
        if (this.state.sessionLength < 60 && this.state.stopCountDown === true)
            this.setState((prevState) => ({
                sessionLength: prevState.sessionLength + 1,
                minutes: prevState.minutes + 1,
                totalSeconds: prevState.totalSeconds + 60
            }))
    }

    decrementBreakLength = () => {
        if (this.state.breakLength > 1 && this.state.stopCountDown === true)
            this.setState((prevState) => ({
                breakLength: prevState.breakLength - 1
            }))
    }

    decrementSessionLength = () => {
        if (this.state.sessionLength > 1 && this.state.stopCountDown === true)
            this.setState((prevState) => ({
                sessionLength: prevState.sessionLength - 1,
                minutes: prevState.minutes - 1,
                totalSeconds: prevState.totalSeconds - 60
            }))
    }

    startOrStopCountDown = () => {
        if (this.state.stopCountDown) {
            this.setState({ stopCountDown: false });
            // setInterval calls countdown function every second
            this.timer = setInterval(
                () => this.updateTimer(),
                1000
            );
        }
        else {
            this.setState({ stopCountDown: true });
            this.stopCountDown();
        }
    }

    switchToBreakSession = () => {
        this.setState({
            totalSeconds: this.state.breakLength * 60 - 1,
            minutes: this.state.breakLength,
            seconds: 0,
            stopCountDown: true,
            startBreakSession: true
        })
    }

    switchToRegularSession = () => {
        this.setState({
            totalSeconds: this.state.sessionLength * 60,
            minutes: this.state.sessionLength,
            seconds: 0,
            stopCountDown: true,
            startBreakSession: false
        })
    }

    updateTimer = () => {
        // save state in local variables
        let tempMin = this.state.minutes,
            tempSec = this.state.seconds,
            totalSecs = this.state.totalSeconds;

        // update variables
        if (this.state.startBreakSession || !this.state.stopCountDown) totalSecs--;
        tempMin = parseInt(totalSecs / 60);
        tempSec = parseInt(totalSecs % 60);

        // update state with new time variables
        this.setState({
            totalSeconds: totalSecs,
            minutes: tempMin,
            seconds: tempSec
        });

        // stops countdown if seconds and minutes are down to zero
        if (this.state.minutes === 0 && this.state.seconds === 0 && !this.state.startBreakSession) {
            clearInterval(this.timer);
            setTimeout(() => {
                this.playAudio();
                this.switchToBreakSession();
                this.startOrStopCountDown();
            }, 990);
        }
        else if (this.state.minutes === 0 && this.state.seconds === 0 && !this.state.stopCountDown) {
            clearInterval(this.timer);
            setTimeout(() => {
                this.playAudio();
                this.switchToRegularSession();
                this.startOrStopCountDown();
            }, 990);
        }
    }

    resetCountDown = () => {
        //stop timer
        clearInterval(this.timer);
        this.resetAudio();
        this.setState({
            totalSeconds: 1500,
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

    playAudio = () => {
        const alarmSound = document.getElementById('beep');
        alarmSound.play();
    }

    resetAudio = () => {
        const alarmSound = document.getElementById('beep');
        alarmSound.load();
    }

    render() {
        return (
            <div id="pomodoro-app">
                <h1>Pomodoro Clock</h1>
                <audio
                    id="beep"
                    src="https://freesound.org/data/previews/198/198841_285997-lq.mp3"
                    type="audio/mpeg">
                </audio>
                <div>
                    <Timer minutes={this.state.minutes} seconds={this.state.seconds} stop={this.state.stopCountDown} break={this.state.startBreakSession} />
                    <StartButton handleClick={this.startOrStopCountDown} stop={this.state.stopCountDown} />
                    <ResetButton handleClick={this.resetCountDown} />
                </div>
                <div>
                    <TimeLabel name="break" length={this.state.breakLength} />
                    <ChangeTimeButton handleClick={this.incrementBreakLength} idName="break-increment" symbol="fas fa-arrow-up" />
                    <ChangeTimeButton handleClick={this.decrementBreakLength} idName="break-decrement" symbol="fas fa-arrow-down" />
                </div>
                <div>
                    <TimeLabel name="session" length={this.state.sessionLength} />
                    <ChangeTimeButton handleClick={this.incrementSessionLength} idName="session-increment" symbol="fas fa-arrow-up" />
                    <ChangeTimeButton handleClick={this.decrementSessionLength} idName="session-decrement" symbol="fas fa-arrow-down" />
                </div>
            </div>
        )
    }
}
export default App;
