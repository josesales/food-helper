import React from 'react';

const Switch = props => {

    return (
        <div className="filter-container">
            <span>{props.label}</span>

            <Switch value={props.isActive} onValueChange={props.onChange} />
        </div>
    );
}

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15,
    },
});

export default Switch;