import todosStyles from "../styles/Todos.module.css";
import { faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "../context/state";

const TodoItem = ({ todo }) => {
  const context = useAppContext();
  const { displayTodoForm, todos, projects, updateTodoCompleted } = context;
  let today = new Date().toISOString().slice(0, 10);

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
    <div
      onClick={(e) => displayTodoForm(e, todos, (id = todo.id))}
      className={`${todosStyles.card} ${todosStyles.todo}`}
    >
      <div className={todosStyles.taskname}>
        <p className ='item-completed'>
          {" "}
          <input
            name="complete"
            type="checkbox"
            id={`checkbox ${id}`}
            onChange={(e) => updateTodoCompleted(e,todo)}
            checked={completed}
            className={todosStyles.checkbox}
          ></input>
        </p>
        <p className={priorityList[priority]}>{task_name}</p>
        {project != null ? (
          <p className={todosStyles.project}>{todo.project_name}</p>
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
          {today === new Date(todo.due_date).toISOString().slice(0, 10)
            ? "Today"
            : new Date(todo.due_date).toISOString().slice(0, 10)}
        </p>
      ) : (
        <p className={todosStyles.date}>
          <span>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </span>
          &nbsp; No Date
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
