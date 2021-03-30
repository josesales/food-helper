import React from 'react';
import { useSelector } from 'react-redux';
import { toSingular } from '../../util/string';

const DropDown = ({ collectionName, placeholder }) => {

    //TODO refector dropdown to be an input like the SearchComponent
    let LabelUi = null;

    if (placeholder) {
        LabelUi = <label htmlFor={'dropdown-container__' + collectionName} className="dropdown-container__label">{placeholder}</label>;
    }

    //convert to singular to match the document name
    const documentName = toSingular(collectionName);

    const items = useSelector(state => state[documentName][collectionName]);

    const ItemsUi = items ? items.map(item => <option className="dropdown-container__option" value={item._id}>{item.name}</option>) : '';

    return (
        <React.Fragment>
            {
                items ?
                    <div className="dropdown-container">
                        <select select id={'dropdown-container__' + collectionName} className="dropdown-container__select" >
                            <option className="dropdown-container__default-option" value={0}>{collectionName}</option>
                            {ItemsUi}
                        </select >
                        {LabelUi}
                    </div > : ''
            }

        </React.Fragment>
    );
}


export default DropDown;
