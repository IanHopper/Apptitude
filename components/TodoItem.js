import todosStyles from "../styles/Todos.module.css";
import { useState } from "react";
import { ReactElement } from "react";
import { faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TodoItem = ({ todo }) => {
  const [editTodo, setEditTodo] = useState(false);

  const toggleEdit = (e) => {
    setEditTodo(!editTodo);
  };

  const {
    id,
    task_name,
    description,
    priority,
    due_date,
    duration,
    cost,
    completed,
    project,
  } = todo;

  const priorityList = {
    1: todosStyles.vital,
    2: todosStyles.important,
    3: todosStyles.urgent,
    4: todosStyles.trivial,
  };

  return (
    <div onClick={(e) => toggleEdit()} className={todosStyles.card}>
      <div className={todosStyles.taskname}>
        <p className={priorityList[priority]}>{task_name}</p>
        {project != null ? (
          <p className={todosStyles.project}>({project})</p>
        ) : null}
      </div>

      <div className={todosStyles.project}></div>
      <div className={todosStyles.duration}>
        {duration > 0 ? (
          <div>
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            &nbsp;{duration}m
          </div>
        ) : null}
      </div>
      {due_date != null ? (
        <p className={todosStyles.date}>
          <span>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </span>
          &nbsp;
          {new Date(todo.due_date).toString().slice(4, 10)},{" "}
          {new Date(todo.due_date).toString().slice(11, 15)}
        </p>
      ) : (
        <p className={todosStyles.date}>
          <span>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </span>
          &nbsp;
          No Date
        </p>
      )}
      <div className={todosStyles.cost}>
        {cost > 0 ? <span>${cost.slice(0, -3)}</span> : null}
      </div>
      <p className={todosStyles.description}>{description}</p>
    </div>
  );
};

export default TodoItem;
