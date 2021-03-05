import React from 'react';

const InputField = props => {

    let InputUI = null;
    let LabelUI = null;
    const { type, id, placeholder } = props.children.props;

    if (type === 'text') {
        InputUI = <input {...props.children.props} className="field__text" />;
        LabelUI = <label for={id} className="field__label">{placeholder}</label>;
    }

    return (

        <div className="field">
            {InputUI ? InputUI : props.children}
            {LabelUI}
        </div>

    );

}

export default InputField;