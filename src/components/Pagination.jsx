import React from "react";
import classNames from "classnames";

const stylesMarginRight = { marginRight: "10px" };

const SHOW_MAX_SPAGES = 5;

const getClassLink = (page, currentPage) => {
  return classNames(
    "btn",
    {
      "btn-primary": page === currentPage,
    },
    {
      "btn-light": page !== currentPage,
    }
  );
};

const getMiddlePages = (currentPage, totalPages) => {
  let middlePages = [];
  if (currentPage <= SHOW_MAX_SPAGES && totalPages <= SHOW_MAX_SPAGES) {
    for (let i = 2; i < totalPages; i++) {
      middlePages.push(i);
    }
    return middlePages;
  }

  if (currentPage <= 4 && totalPages > SHOW_MAX_SPAGES) {
    for (let i = 2; i < SHOW_MAX_SPAGES; i++) {
      middlePages.push(i);
    }
    return middlePages;
  }

  if (
    currentPage > 4 &&
    totalPages - currentPage >= 4 &&
    totalPages > SHOW_MAX_SPAGES
  ) {
    for (let i = currentPage; i < currentPage + 3; i++) {
      middlePages.push(i);
    }
    return middlePages;
  }

  if (
    currentPage > 4 &&
    totalPages - currentPage <= 3 &&
    totalPages > SHOW_MAX_SPAGES
  ) {
    for (let i = totalPages - 3; i < totalPages; i++) {
      middlePages.push(i);
    }

    return middlePages;
  }

  return middlePages;
};

const Pagination = (props) => {
  const {
    currentPage,
    totalPages,
    updateCurrentPage,
    onNextPage,
    onPrevPage,
  } = props;

  let middlePages = getMiddlePages(currentPage, totalPages);

  return (
    <div>
      <button
        type="button"
        className="btn"
        style={stylesMarginRight}
        onClick={onPrevPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        type="button"
        className={getClassLink(1, currentPage)}
        onClick={() => updateCurrentPage(1)}
        style={stylesMarginRight}
      >
        1
      </button>
      {middlePages[middlePages.length - 1] >= SHOW_MAX_SPAGES && ( //7>5 true
        <span className="btn" style={stylesMarginRight}>
          ...
        </span>
      )}
      {middlePages.map((page) => (
        <button
          key={page}
          type="button"
          className={getClassLink(page, currentPage)}
          onClick={() => updateCurrentPage(page)}
          style={stylesMarginRight}
        >
          {page}
        </button>
      ))}
      {middlePages[0] < totalPages - 3 && (
        <span className="btn" style={stylesMarginRight}>
          ...
        </span>
      )}
      {totalPages !== 1 && (
        <button
          type="button"
          className={getClassLink(totalPages, currentPage)}
          onClick={() => updateCurrentPage(totalPages)}
          style={stylesMarginRight}
        >
          {totalPages}
        </button>
      )}
      <button
        type="button"
        className="btn"
        style={stylesMarginRight}
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
