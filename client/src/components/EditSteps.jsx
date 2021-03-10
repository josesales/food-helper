import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentRecipe } from '../redux/recipe/recipe-selector';
import TextArea from './ui/TextArea';
import InputField from './ui/InputField';

const EditSteps = ({ steps, onChange, onDelete }) => {

    let StepsUi = null;
    let NoStepsUi = null;

    if (steps.length == 0) {
        NoStepsUi = <li className="no-steps" key={0}><h3>Currently there are no steps added</h3></li>;
    }
    else {
        StepsUi = steps.map((step, index) => <li key={index}>
            <TextArea number={index + 1} value={step} id={index} onChange={onChange} onDelete={onDelete} />
        </li>);
    }

    return (
        <div className="edit-steps">

            <ul className="edit-steps__list">
                {StepsUi ? StepsUi : NoStepsUi}
            </ul>

        </div>
    );
}

export default EditSteps;
