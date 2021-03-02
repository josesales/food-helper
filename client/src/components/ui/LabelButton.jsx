import React from 'react';

const LabelButton = props => (

    <label {...props} className={props.className ? 'label-button ' + props.className : 'label-button'} >
        { props.children}
    </label >
)

export default LabelButton;