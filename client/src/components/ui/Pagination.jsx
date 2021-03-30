import React, { useEffect, useState } from 'react';
import HTML_ENTITIES from '../../util/htmlEntities';
import LabelButton from './LabelButton';

const Pagination = ({ paginationObj, fetchItems }) => {

    const [selectedPage, setSelectedPage] = useState(paginationObj.currentPage);
    const ItemsUi = [];

    //Size of collection in the db / Number of items that should be shown per page
    const pagesNumber = Math.ceil(paginationObj.total / paginationObj.limit);

    const onItemUiClick = e => {
        const page = +e.target.innerText - 1;
        setSelectedPage(page);
        fetchItems(page);
    }

    const onLeftArrowClick = () => {
        if (selectedPage > 0) {
            setSelectedPage(prevNumber => prevNumber - 1);
            fetchItems(selectedPage - 1);
        }
    }

    const onRightArrowClick = () => {
        if (selectedPage < pagesNumber - 1) {
            setSelectedPage(prevNumber => prevNumber + 1);
            fetchItems(selectedPage + 1);
        }
    }

    // The loop should go until the pagesNumber
    for (let i = 0; i < pagesNumber; i++) {

        let ItemUi = null;
        if (i == selectedPage) {
            ItemUi = <li key={i}><LabelButton onClick={onItemUiClick} className="pagination__label--selected-number">{i + 1}</LabelButton></li>;
        } else {
            ItemUi = <li key={i}><LabelButton onClick={onItemUiClick} className="pagination__label--number">{i + 1}</LabelButton></li>;
        }

        ItemsUi.push(ItemUi);
    }

    return (
        <div className="pagination">
            <LabelButton onClick={onLeftArrowClick} className="pagination__label--arrow">
                {HTML_ENTITIES.leftArrow}
            </LabelButton>

            <ul className="pagination__list">
                {ItemsUi}
            </ul>

            <LabelButton onClick={onRightArrowClick} className="pagination__label--arrow">
                {HTML_ENTITIES.rightArrow}
            </LabelButton>
        </div>
    );
}

export default Pagination;