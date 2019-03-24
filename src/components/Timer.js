import React from 'react';

function Timer(props) {
    return(
        <div>
            <p id="timer-label">
            {props.stop
                ? 'countdown not started/paused'
                : props.break
                        ? 'break timer'
                        : 'counting down...'
            }
            </p>
            <p id="time-left">{props.minutes < 10 ? "0" + props.minutes : props.minutes}:{props.seconds < 10 ? "0" + props.seconds : props.seconds}</p>
        </div>
    )
}

export default Timer;