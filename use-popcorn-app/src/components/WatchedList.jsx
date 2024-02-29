import React from "react";
import WatchedListItem from "./WatchedListItem";

const WatchedList = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedListItem movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};

export default WatchedList;
