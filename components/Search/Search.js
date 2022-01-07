import { useState } from "react";
import style from "../../styles/Search/Search.module.css";
import Input from "../Input/Input";

function Search({ list, callback }) {
  const [inputed, setInputed] = useState("");

  const handleSelect = (category) => {
    if (category === "all") return callback(list);
    list = list.filter((item) => item.category === category);
    callback(list);
  };

  const handleInput = (key) => {
    const testName = new RegExp(key, "i");
    list = list.filter((item) => testName.exec(item.name));
    callback(list);
    setInputed(key);
  };

  return (
    <div className={style.search} data-testid="search">
      {/* TODO: Add onchange*/}
      Select category
      <select
        className={style.select_by_category}
        data-testid="select-by-category"
        aria-label="Select by category"
        defaultValue="all"
        onChange={(event) => handleSelect(event.target.value)}
      >
        <option value="all">All</option>
        <option value="health">Health</option>
        <option value="energy">Energy</option>
        <option value="other">Other</option>
      </select>
      {/* TODO: Add select by category component*/}
      or
      <Input
        placeholder="Start typing a name"
        type="search"
        label="Search"
        value={inputed}
        callback={handleInput}
        data-testid="search-input"
      />
    </div>
  );
}

export default Search;
