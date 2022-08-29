import React from "react";
import todosStyles from "../styles/Todos.module.css";
import { useAppContext } from "../context/state";
import Link from "next/link";

const NewTaskButton = () => {
  const context = useAppContext();
  const { displayTodoForm, todoForm, todo } = context;

  return (
    <>
      <Link href="/">
        <button
          id="newTaskButton"
          onClick={displayTodoForm}
          className={
            !todoForm
              ? `${todosStyles.btn} ${todosStyles.new}`
              : todosStyles.btn
          }
        >
          {todoForm ? <strong>Cancel</strong> : <strong>+ Task</strong>}
        </button>
      </Link>
    </>
  );
};

export default NewTaskButton;
