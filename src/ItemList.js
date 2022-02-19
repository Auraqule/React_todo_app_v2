import React from "react";

const ItemList = ({ item, checkHandler, deleteHandler }) => {
  return (
    <li className="itemlist">
      <input
        type="checkbox"
        checked={item.checked}
        id="check"
        onChange={() => checkHandler(item.id)}
      />
      <label className="checkbox-label" htmlFor="check">
        Checkbox
      </label>
      <label
        className="item-label"
        style={item.checked ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => checkHandler(item.id)}
      >
        {" "}
        {item.item}{" "}
      </label>
      <div className="del-btn" onClick={() => deleteHandler(item.id)}>
        X
      </div>
    </li>
  );
};

export default ItemList;
