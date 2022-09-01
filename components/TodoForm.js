import todosStyles from "../styles/Todos.module.css";
import { faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "../context/state";

const NewTodo = ({}) => {
  const context = useAppContext();
  const {
    todo,
    createTodo,
    handleInputChange,
    projects,
    handleTodoClickChange,
    project,
  } = context;

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    createTodo();
  };

  const priorityList = {
    1: todosStyles.vital,
    2: todosStyles.important,
    3: todosStyles.urgent,
    4: todosStyles.trivial,
  };

  return (
    <div>
      <form
        onSubmit={handleTodoSubmit}
        className={todosStyles.formcard}
        noValidate
      >
        <div className={`${todosStyles.formControl}`}>
          <input
            id="task_name"
            className={`${todosStyles.taskName} ${priorityList[todo.priority]}`}
            type="text"
            value={todo.task_name ? todo.task_name : ""}
            placeholder="Task Name"
            onChange={handleInputChange}
            required
            autoFocus
          />
        </div>
        <div className={todosStyles.formControl}>
          <select
            value={todo.project !== null ? todo.project : ""}
            onChange={handleInputChange}
            id="project"
          >
            <option key={""} value={""}>
              Inbox
            </option>
            {projects && projects.length > 0
              ? projects.map((project) => (
                  <option value={project.id} key={project.id}>
                    {project.project_name}
                  </option>
                ))
              : ""}
          </select>
        </div>
        <div className={todosStyles.formControl}>
          <input
            id="description"
            type="text"
            value={todo.description ? todo.description : ""}
            onChange={handleInputChange}
            placeholder="Description"
          />
        </div>
        <div className={todosStyles.formControl}>
          <input
            id="due_date"
            type="date"
            value={todo.due_date ? todo.due_date : ""}
            onChange={handleInputChange}
            placeholder="Due Date"
          />
        </div>
        <div className={todosStyles.formControl}>
          <select
            className={priorityList[todo.priority]}
            id="priority"
            value={todo.priority ? todo.priority : 4}
            onChange={handleInputChange}
          >
            <option value="1">Vital</option>
            <option value="2">Important</option>
            <option value="3">Urgent</option>
            <option value="4">Trivial</option>
          </select>
        </div>
        <div className={todosStyles.formControl}>
          <input
            id="cost"
            type="number"
            min="1"
            value={todo.cost ? todo.cost : ""}
            onChange={handleInputChange}
            step="any"
            placeholder="$"
          />
        </div>
        <div className={todosStyles.formControl}>
          <input
            id="duration"
            type="number"
            value={todo.duration ? todo.duration : ""}
            onChange={handleInputChange}
            placeholder="Duration"
          />
        </div>
        <div className={todosStyles.formControl}>
          {!todo.deleted ? (
            <input
              className={todosStyles.inputTodo}
              type="submit"
              value="Save Task"
            />
          ) : (
            ""
          )}

          {todo.id !== undefined && (
            <input
              className={todosStyles.inputTodo}
              type="button"
              name="delete-button"
              style={
                todo.deleted ? { background: "green" } : { background: "red" }
              }
              onClick={(e) => handleTodoClickChange(e, todo)}
              value={todo.deleted ? " Save and Restore Task" : "Delete"}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default NewTodo;
