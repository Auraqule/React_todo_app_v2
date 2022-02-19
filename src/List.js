import React from "react";
import ItemList from "./ItemList";

const List = ({ items, checkHandler, deleteHandler }) => {
  return (
    <ul>
      {items.map((item) => (
        <ItemList
          key={item.id}
          item={item}
          checkHandler={checkHandler}
          deleteHandler={deleteHandler}
        />
      ))}
    </ul>
  );
};

export default List;
