import Head from "next/head";
import useSWR from "swr";
import TodoList from "../components/TodoList";
import { useAppContext } from "../context/state";
import { URL_ENDPOINT } from "../context/types";
import { useEffect, useState } from "react";

export default function Home() {
  const context = useAppContext();
  const { updateTodos, auth, todos, projects } = context;

  let token = auth.token
  const todosUrl = `${URL_ENDPOINT}api/todos/`;

  const fetcher = async (url, token) =>
    fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) =>
      res.json()
    );

  // Fetch todos
  const { data: fetchedTodos, error: todosError } = useSWR([todosUrl, token], fetcher);
  if (todosError) <p>Loading failed...</p>;
  if (!fetchedTodos) <h1>Loading...</h1>;

  
  
  const projectUrl = `${URL_ENDPOINT}api/projects/`;
  // Fetch projects
  const { data: fetchedProjects, error: projectError } = useSWR([projectUrl, token], fetcher);
  if (projectError) <p>Loading failed...</p>;
  if (!fetchedProjects) <h1>Loading...</h1>;

  useEffect(() => {
    updateTodos(fetchedTodos, fetchedProjects)
    console.log(fetchedTodos, fetchedProjects)
  }, [fetchedTodos, fetchedProjects])

 
  return (
    <div>
      <Head>
        <title>Apptitude</title>
        <meta name="description" content="Appostalic web development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TodoList todos={todos} projects={projects}/>
    </div>
  );
}
