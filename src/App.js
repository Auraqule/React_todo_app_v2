import Header from "./Header";
import AddTodo from "./AddTodo";
import SearchItem from "./SearchItem";
import Main from "./Main";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items";
  const [items, setItems] = useState([]);
  const [addNewItem, setAddNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setItems(JSON.parse(localStorage.getItem("todoList")) || []);
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok)
          throw Error("Something went wrong, could not fetch expected data!");
        const data = await response.json();
        setItems(data);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("todoList", JSON.stringify(newItems));
  };
  const addTodoHandler = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems);

    const postOPtions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };

    const result = await apiRequest(API_URL, postOPtions);
    if (result) setFetchError(result);
  };

  const checkHandler = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setAndSaveItems(listItems);
    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };
  const deleteHandler = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveItems(listItems);
    const reqUrl = `${API_URL}/${id}`;
    const deleteOptions = {
      method: "DELETE",
    };
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    addTodoHandler(addNewItem);
    setAddNewItem("");
  };

  return (
    <div className="App">
      <Header title="Todo-List" />
      <AddTodo
        addNewItem={addNewItem}
        setAddNewItem={setAddNewItem}
        submitHandler={submitHandler}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main className="main-container">
        {isLoading && <p className="api-loading">Loading...</p>}
        {fetchError && <p className="api-error">{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Main
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            setItems={setItems}
            checkHandler={checkHandler}
            deleteHandler={deleteHandler}
          />
        )}
      </main>

      <Footer items={items} fetchError={fetchError} />
    </div>
  );
}

export default App;
