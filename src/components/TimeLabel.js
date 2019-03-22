import React from 'react';

function TimeLabel(props) {
    return (
        <h3 id={`${props.name}-label`}>{props.name} length: <span id={`${props.name}-length`}>{props.length}</span> min.</h3>
    )
}

export default TimeLabel;

