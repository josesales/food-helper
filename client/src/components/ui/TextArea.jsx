import React, { lazy, Suspense } from 'react';
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";

const TextArea = props => {

    const { id, placeholder, number, onDelete, ...otherProps } = props;

    let LabelUi = null;

    if (placeholder) {
        LabelUi = <label htmlFor={id} className="text-area-container__label">{placeholder}</label>;
    }

    return (
        <div className="text-area-container">

            <textarea {...otherProps} id={id} placeholder={placeholder}
                className="text-area-container__text" rows="4" cols="100"></textarea>
            {LabelUi}
            {
                onDelete ?
                    <span onClick={onDelete} >
                        <DeleteIcon className="text-area-container__remove" />
                    </span>
                    : ''
            }
            {
                number ? <span className="text-area-container__number" onClick={() => { }} >{number}.</span> : ''
            }
        </div>

        // <div className="text-area">

        //     <textarea className="text-area__text" id={id} rows="4" cols="100">{text}</textarea>
        //     <span className="">{HTML_ENTITIES.add}</span>
        // </div>
    );
}

export default TextArea;
