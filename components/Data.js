import Token from "./Token";
import useSWR from "swr";
import { useAppContext } from "../context/state";


const DataFetcher = () => {
  const context = useAppContext();
  const { updateTodos } = context;
  const fetcher = async (url, token) =>
    fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) =>
      res.json()
    );

  let token = Token();
  const todosUrl = "http://127.0.0.1:8000/api/todos/";
  // Fetch todos
  const { data: fetchedTodos, error: todosError } = useSWR([todosUrl, token], fetcher);
  if (todosError) <p>Loading failed...</p>;
  if (!fetchedTodos) <h1>Loading...</h1>;
  console.log(fetchedTodos)
  // updateTodos(fetchedTodos)
  const projectUrl = "http://127.0.0.1:8000/api/projects/";
  // Fetch projects
  const { data: projects, error: projectError } = useSWR([projectUrl, token], fetcher);
  if (projectError) <p>Loading failed...</p>;
  if (!projects) <h1>Loading...</h1>;
  
  return (
    null
  )
}

export default DataFetcher