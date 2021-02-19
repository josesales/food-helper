import React from 'react';

const ToggleSwitch = ({ name }) => {

    return (
        <div className="switch-container">

            <div className="toggle-switch">
                <input
                    type="checkbox"
                    className="toggle-switch-checkbox"
                    name={name}
                    id={name}
                />
                <label className="toggle-switch-label" htmlFor={name}>
                    <span className="toggle-switch-inner" />
                    <span className="toggle-switch-switch" />
                </label>
            </div>

            <label className="switch-label">{name}</label>
        </div>
    );
}

export default ToggleSwitch;