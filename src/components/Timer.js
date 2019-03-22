import React from 'react';

function Timer(props) {
    return(
        <div>
            <p id="timer-label">{props.stop === false ? 'Counting down...' : 'Session inactive'}</p>
            <p id="time-left">{props.minutes < 10 ? "0" + props.minutes : props.minutes}:{props.seconds < 10 ? "0" + props.seconds : props.seconds}</p>
        </div>
    )
}

export default Timer;