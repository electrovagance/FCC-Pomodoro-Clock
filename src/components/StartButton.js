import React from 'react';

function StartButton(props) {
    return (
        <button id="start_stop" onClick={props.handleClick}>
            {props.stop === true ? <i class="fas fa-play"></i> : <i class="fas fa-pause"></i>}
        </button>
    )
}

export default StartButton;