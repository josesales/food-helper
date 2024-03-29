import React from 'react';

const InputField = props => {

    let InputUi = null;
    let LabelUi = null;
    const { type, id, placeholder } = props.children.props;

    if (type === 'text' || type === 'number' || type === 'email' || type === 'password') {

        InputUi = <input {...props.children.props} className={ props.children.props.className ? "field__text " + props.children.props.className  : "field__text"} />;
        if (placeholder) {
            LabelUi = <label htmlFor={id} className="field__label">{placeholder}</label>;
        }
    }

    return (
        <div className='field'>
            {InputUi ? InputUi : props.children}
            {LabelUi}
        </div>
    );

}

export default InputField;