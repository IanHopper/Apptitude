import todosStyles from "../styles/Todos.module.css";
import Token from "./Token";
import { useAppContext } from "../context/state";

const NewTodo = ({ projects }) => {
  const context = useAppContext();
  const { todo, createTodo, handleInputChange, cancelTodo } = context;
  let token = Token();

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    createTodo(todo, token);
  };
  const handleCancelTodo = (e) => {
    e.preventDefault();
    cancelTodo();
  };

  const priorityList = {
    1: todosStyles.vital,
    2: todosStyles.important,
    3: todosStyles.urgent,
    4: todosStyles.trivial,
  };

  return (
    <div>
      <form onSubmit={handleTodoSubmit} className={todosStyles.formcard}>
        <div className={`${todosStyles.formControl}`}>
          <input
            id="task_name"
            className={`${todosStyles.taskName} ${priorityList[todo.priority]}`}
            type="text"
            value={todo.task_name ? todo.task_name : ""}
            placeholder="New Task"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={todosStyles.formControl}>
          <select
            value={todo.project ? todo.project : ""}
            onChange={handleInputChange}
            id="project"
          >
            <option key={""} value={false}>
              No Project
            </option>
            {projects && projects.length > 0
              ? projects.map((project) => (
                  <option value={project.id} key={project.id}>
                    {project.project_name}
                  </option>
                ))
              : null}
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
            className={todosStyles.saveTodo}
            type="submit"
            value="Save Task"
          />
        </div>
      </form>
    </div>
  );
};

export default NewTodo;
