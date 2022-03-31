import Head from "next/head";
import NewTodo from "../components/NewTodo";

const new_todo = () => {
  return (
    <>
      <Head>
        <title>New Todo</title>
      </Head>
      <NewTodo/>
    </>
  );
};

export default new_todo;