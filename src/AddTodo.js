import React, { useRef } from "react";

const AddTodo = ({ addNewItem, setAddNewItem, submitHandler }) => {
  const inputRef = useRef();
  return (
    <form className="addForm" onSubmit={submitHandler}>
      <input
        className="add-todo-input"
        type="text"
        id="todoInputText"
        autoFocus
        ref={inputRef}
        placeholder="Add item"
        required
        value={addNewItem}
        onChange={(e) => setAddNewItem(e.target.value)}
      />
      <label htmlFor="todoInputText"></label>
      <button
        className="add-todo-btn"
        type="submit"
        onClick={() => inputRef.current.focus()}
      >
        +
      </button>
    </form>
  );
};

export default AddTodo;
