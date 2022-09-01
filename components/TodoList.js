import todosStyles from "../styles/Todos.module.css";
import TodoItem from "./TodoItem";
import { useAppContext } from "../context/state";
import NewTodo from "./TodoForm";
import NewTaskButton from "./NewTaskButton";
import Search from "./Search";
import ProjectList from "./ProjectList";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TodoList = () => {
  const context = useAppContext();
  const { todoForm, search, focus, projects, todos, todo, deleteProject } = context;
  const heading = focus;
  if (todos && todos.length > 0) {
    let deletedTodos = todos.filter((todo) => todo.deleted);
    // Filter out deleted todos
    todos = todos.filter((todo) => !todo.deleted);

    if (search) {
      todos = todos.filter((todo) =>
        todo.task_name.toUpperCase().includes(search.toUpperCase())
      );
    }

    if (focus === "Inbox") {
      todos = todos.filter((todo) => todo.project === null);
    }

    if (focus === "Today") {
      todos = todos.filter(
        (todo) => todo.due_date === new Date().toISOString().slice(0, 10)
      );
    }

    if (focus !== "Inbox" && focus !== "Today" && focus !== "All Projects") {
      todos = todos.filter((todo) => todo.project_name === focus);
    }
    // Sort tasks by priority
    todos = todos.sort(function (a, b) {
      return b.priority - a.priority;
    });
    // Sort completed tasks to the bottom
    todos = todos.sort(function (a, b) {
      return b.completed - a.completed;
    });
  }

  const projectTotal = (todos, quantity) => {
    const projectCost = 0;
    const projectDuration = 0;
    if (typeof todos === "object" && todos.length > 0) {
      todos = todos.filter((todo) => !todo.completed);
      for (todo of todos) {
        projectDuration += todo.duration;
        projectCost += parseFloat(todo.cost);
      }
    }
    if (quantity === "duration") {
      return projectDuration > 0 ? `${projectDuration}m` : "0m";
    } else if (quantity === "cost") {
      return projectCost > 0 ? `$${projectCost}` : "$0";
    }
  };

  if (todoForm) {
    heading =
      todo.id !== undefined ? `Edit ${todo.task_name}` : "Create a New Task";
  }

  return (
    <div className={todosStyles.datacontainer}>
      <ProjectList projects={projects} />

      {todoForm ? (
        <div>
          <div className={todosStyles.tasksHeader}>
            <div className={`${todosStyles.projectFocus}`}>{heading}</div>
            <NewTaskButton />
            <Search />
          </div>
          <NewTodo projects={projects} />
        </div>
      ) : (
        <>
          <div>
            <div className={todosStyles.tasksHeader}>
              <div className={`${todosStyles.projectFocus}`}>
                {focus}{" "}
                {focus !== "Deleted Tasks" ? (
                  <>
                    <span className={todosStyles.projectDuration}>
                      <span>
                        <FontAwesomeIcon icon={faClock} />
                      </span>{" "}
                      {projectTotal(todos, "duration")}
                    </span>{" "}
                    <span className={todosStyles.projectCost}>
                      {projectTotal(todos, "cost")}
                    </span>
                  </>
                ) : (
                  ""
                )}
                {focus !== "Inbox" &&
                focus !== "Today" &&
                focus !== "All Projects" &&
                focus !== "Deleted Tasks" ? (
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={todosStyles.trashIcon}
                    onClick={deleteProject}
                  />
                ) : (
                  ""
                )}
              </div>
              <NewTaskButton />
              <Search />
            </div>

            {typeof todos !== "undefined" &&
              focus !== "Deleted Tasks" &&
              todos.length > 0 &&
              todos
                .map((todo) => <TodoItem todo={todo} key={todo.id}></TodoItem>)
                .reverse()}
            {typeof deletedTodos !== "undefined" &&
              deletedTodos.length > 0 &&
              focus === "Deleted Tasks" &&
              deletedTodos.length > 0 &&
              deletedTodos
                .map((todo) => <TodoItem todo={todo} key={todo.id}></TodoItem>)
                .reverse()}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
