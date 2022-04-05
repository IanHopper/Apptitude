import Head from "next/head";
import useSWR from "swr";
import TodoList from "../components/TodoList";
import Token from "../components/Token";
import { useAppContext } from "../context/state";



export default function Home() {
  const context = useAppContext();
  const { todos, updateTodos } = context;
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
  const projectUrl = "http://127.0.0.1:8000/api/projects/";
  // Fetch projects
  const { data: projects, error: projectError } = useSWR([projectUrl, token], fetcher);
  if (projectError) <p>Loading failed...</p>;
  if (!projects) <h1>Loading...</h1>;



 
  return (
    <div>
      <Head>
        <title>Apptitude</title>
        <meta name="description" content="Appostalic web development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TodoList todos={fetchedTodos} projects={projects}/>
    </div>
  );
}
