import React from "react";
import todosStyles from "../styles/Todos.module.css";
import { useAppContext } from "../context/state";
import { useRouter } from "next/router";
import Link from "next/link";

const NewTaskButton = () => {
  const context = useAppContext();
  const { displayTodoForm, todoForm } = context;
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <Link href="/">
      <button
        onClick={displayTodoForm}
        className={
          !todoForm
            ? `${todosStyles.btn} ${todosStyles.new}`
            : todosStyles.btn
        }
      >
        {todoForm ? "Cancel" : "+ New"}
      </button>
    </Link>
  );
};

export default NewTaskButton;
