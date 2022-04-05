import { useAppContext } from "../context/state";
import todosStyles from "../styles/Todos.module.css";

const Search = () => {
  const context = useAppContext();
  const { search, handleSearchInput } = context;
  return (
    <form className={todosStyles.searchform}>
      <input
        type="search"
        value={search ? search : ""}
        onChange={handleSearchInput}
        className={todosStyles.search}
        placeholder={"Search"}
      />
    </form>
  );
};

export default Search;
