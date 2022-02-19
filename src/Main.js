import List from "./List";

import React from "react";

const Main = ({ items, checkHandler, deleteHandler }) => {
  return (
    <main className="main">
      {items.length ? (
        <List
          items={items}
          checkHandler={checkHandler}
          deleteHandler={deleteHandler}
        />
      ) : (
        <p className="empty-message">List is Empty, nothing to show</p>
      )}
    </main>
  );
};

export default Main;
