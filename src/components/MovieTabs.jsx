import React from "react";
import classNames from "classnames";

const TAB_VALUES = [
  { key: "popularity.desc", name: "Popularity" },
  { key: "revenue.desc", name: "Revenue" },
  { key: "vote_average.desc", name: "Vote average" },
];

const MovieTabs = (props) => {
  const { sort_by, changeMovieTab } = props;
  
  const handleClick = (value) => () => {
    changeMovieTab(value);
  };
  
  const getClassLink = (value) => {
    return classNames("nav-link", {
      active: sort_by === value,
    });
  };

  return (
    <ul className="tabs nav nav-pills">
      {TAB_VALUES.map((tab) => (
        <li className="nav-item" key={tab.key}>
          <div
            className={getClassLink(tab.key)}
            onClick={handleClick(tab.key)}
          >
            {tab.name}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieTabs;
