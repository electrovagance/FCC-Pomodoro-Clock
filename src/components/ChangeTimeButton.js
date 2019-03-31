import React from 'react';

function ChangeTimeButton(props) {
    return (
        <button id={props.idName} onClick={props.handleClick}>
            <i class={props.symbol}></i>
        </button>
    )
}

export default ChangeTimeButton;

