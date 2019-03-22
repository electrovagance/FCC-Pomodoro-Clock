import React from 'react';

function ResetButton(props) {
return (
        <button id="reset" onClick={props.handleClick}>↺</button>
    )
}

export default ResetButton;