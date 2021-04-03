import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { toggleIsActive } from '../redux/filter/filter-actions';
import { selectIsActive } from '../redux/filter/filter-selector';

const ToggleSwitch = ({ name, isActive, onClickHandler }) => {

    const history = useHistory();

    // //redirect to filter page in case it's active or to home page is it's not active
    useEffect(() => {
        if (isActive) {
            history.push('/filter');
        } else {
            history.push('/');
        }
    }, [isActive]);

    return (
        <div className="switch-container">

            <div className="toggle-switch">
                <input
                    type="checkbox"
                    className="toggle-switch-checkbox"
                    name={name}
                    id={name}
                    checked={isActive}
                />
                <label className="toggle-switch-label" htmlFor={name} onClick={onClickHandler}>
                    <span className="toggle-switch-inner" />
                    <span className="toggle-switch-switch" />
                </label>
            </div>

            <label className="switch-label">{name}</label>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    isActive: selectIsActive
});

const mapDispatchToProps = dispatch => ({
    toggleIsActive: () => dispatch(toggleIsActive()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleSwitch);