import React from 'react';

function ResetButton(props) {
return (
    <button id="reset" onClick={props.handleClick}><i class="fas fa-redo"></i></button>
    )
}

export default ResetButton;