import React from 'react';

function StartButton(props) {
    return (
        <button id="start_stop" onClick={props.handleClick}>
            {props.stop === true ? '▻' : '❚❚'}
        </button>
    )
}

export default StartButton;