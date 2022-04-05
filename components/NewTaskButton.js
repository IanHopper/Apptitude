import React from "react";
import todosStyles from "../styles/Todos.module.css";
import { useAppContext } from "../context/state";

const NewTaskButton = () => {
  const context = useAppContext();
  const { displayTodoForm } = context;
  return (
    <button
      onClick={displayTodoForm}
      className={`${todosStyles.btn} ${todosStyles.new}`}
    >
      New Task
    </button>
  );
};

export default NewTaskButton;
