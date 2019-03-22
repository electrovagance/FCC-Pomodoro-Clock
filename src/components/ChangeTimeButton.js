import React from 'react';

function ChangeTimeButton(props) {
    return (
        <button id={props.idName} onClick={props.handleClick}>{props.symbol}</button>
    )
}

export default ChangeTimeButton;

