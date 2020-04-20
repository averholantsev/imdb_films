import React from "react";
import classNames from "classnames";

const STYLE_BTN_M = { marginRight: "10px" };

const ButtonNumber = (props) => {
  let buttonClasses = classNames("btn");
  if (props.children === props.currentPage) {
    buttonClasses += " btn-primary";
  } else {
    buttonClasses += " btn-light";
  }
  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={() => props.changeCurrentPage(props.children)}
      style={STYLE_BTN_M}
    >
      {props.children}
    </button>
  );
};

const ButtonText = (props) => {
  return (
    <button
      type="button"
      className="btn"
      style={STYLE_BTN_M}
      {...props}
    >
      {props.children}
    </button>
  );
};

const Pagination = (props) => {
  const {
    currentPage,
    totalPages,
    changeCurrentPage,
    changeToNextPage,
  } = props;

  let middlePages = [];
  if (currentPage <= 5 && totalPages <= 5) {
    for (let i = 2; i < totalPages; i++) {
      middlePages.push(i);
    }
  } else if (currentPage <= 4 && totalPages > 5) {
    for (let i = 2; i < 5; i++) {
      middlePages.push(i);
    }
  } else if (
    currentPage > 4 &&
    totalPages - currentPage >= 4 &&
    totalPages > 5
  ) {
    for (let i = currentPage; i < currentPage + 3; i++) {
      middlePages.push(i);
    }
  } else if (
    currentPage > 4 &&
    totalPages - currentPage <= 3 &&
    totalPages > 5
  ) {
    for (let i = totalPages - 3; i < totalPages; i++) {
      middlePages.push(i);
    }
  }

  return (
    <div>
      <ButtonText
        key={"Previous"}
        onClick={() => changeToNextPage(-1)}
        disabled={currentPage === 1 ? true : false}
      >
        Previous
      </ButtonText>
      <ButtonNumber
        key={1}
        currentPage={currentPage}
        changeCurrentPage={changeCurrentPage}
      >
        {1}
      </ButtonNumber>
      {middlePages.length === 0 ||
      middlePages[middlePages.length - 1] < 5 ? null : (
        <span className="btn" style={{ STYLE_BTN_M }}>
          ...
        </span>
      )}
      {middlePages.map((num) => (
        <ButtonNumber
          key={num}
          currentPage={currentPage}
          changeCurrentPage={changeCurrentPage}
        >
          {num}
        </ButtonNumber>
      ))}
      {middlePages.length === 0 ||
      totalPages === 5 ||
      middlePages[middlePages.length - 1] + 1 < 5 ||
      totalPages - currentPage <= 3 ? null : (
        <span className="btn" style={{ STYLE_BTN_M }}>
          ...
        </span>
      )}
      {totalPages === 1 ? null : (
        <ButtonNumber
          key={totalPages}
          currentPage={currentPage}
          changeCurrentPage={changeCurrentPage}
        >
          {totalPages}
        </ButtonNumber>
      )}
      <ButtonText
        key={"Next"}
        onClick={() => changeToNextPage(+1)}
        disabled={currentPage === totalPages ? true : false}
      >
        Next
      </ButtonText>
    </div>
  );
};

export default Pagination;
