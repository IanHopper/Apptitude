import Head from "next/head";
import useSWR from "swr";
import TodoList from "../components/TodoList";
import Token from "../components/Token";

const fetcher = (url, token) => fetch(url, {headers: {'Authorization': `Bearer ${token}`}}).then((res) => res.json())


const SWR = () => {
  let token = Token()
  const url = "http://127.0.0.1:8000/api/todos/"
  
  const { data, error } = useSWR([url, token], fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(data)

  return <TodoList todos={data}></TodoList>

};


export default function Home({ todos }) {
 
  return (
    <div>
      <Head>
        <title>Appostolic</title>
        <meta name="description" content="Appostalic web development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SWR/>
      
    </div>
  );
}
