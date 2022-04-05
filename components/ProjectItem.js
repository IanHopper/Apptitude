import todosStyles from "../styles/Todos.module.css";
import { useState } from "react";
import { faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProjectItem = ({ project }) => {
  const [editTodo, setEditTodo] = useState(false);

  const toggleEdit = (e) => {
    setEditTodo(!editTodo);
  };

  const {
    id
  } = project;

  return (
    <div>{id}</div>
  );
};

export default ProjectItem;
