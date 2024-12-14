import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setCurrentPage } from "../../redux/pagination/pagination-actions";
import { selectCurrentPage } from "../../redux/pagination/pagination-selector";
import HTML_ENTITIES from "../../util/htmlEntities";
import LabelButton from "./LabelButton";

const Pagination = ({
  paginationObj,
  fetchItems,
  currentPage,
  setCurrentPage,
}) => {
  // const [currentPage, setCurrentPage] = useState(paginationObj.currentPage);
  const ItemsUi = [];

  //Size of collection in the db / Number of items that should be shown per page
  const pagesNumber = Math.ceil(paginationObj.total / paginationObj.limit);

  const onItemUiClick = (e) => {
    const page = +e.target.innerText - 1;
    setCurrentPage(page);
    fetchItems(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onLeftArrowClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      fetchItems(currentPage - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const onRightArrowClick = () => {
    if (currentPage < pagesNumber - 1) {
      setCurrentPage(currentPage + 1);
      fetchItems(currentPage + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // The loop should go until the pagesNumber
  for (let i = 0; i < pagesNumber; i++) {
    let ItemUi = null;
    if (i == currentPage) {
      ItemUi = (
        <li key={i}>
          <LabelButton
            onClick={onItemUiClick}
            className="pagination__label--selected-number"
          >
            {i + 1}
          </LabelButton>
        </li>
      );
    } else {
      ItemUi = (
        <li key={i}>
          <LabelButton
            onClick={onItemUiClick}
            className="pagination__label--number"
          >
            {i + 1}
          </LabelButton>
        </li>
      );
    }

    ItemsUi.push(ItemUi);
  }

  return (
    <React.Fragment>
      {pagesNumber > 0 ? (
        <div className="pagination">
          <LabelButton
            onClick={onLeftArrowClick}
            className="pagination__label--arrow"
          >
            {HTML_ENTITIES.leftArrow}
          </LabelButton>

          <ul className="pagination__list">{ItemsUi}</ul>

          <LabelButton
            onClick={onRightArrowClick}
            className="pagination__label--arrow"
          >
            {HTML_ENTITIES.rightArrow}
          </LabelButton>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  currentPage: selectCurrentPage,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
