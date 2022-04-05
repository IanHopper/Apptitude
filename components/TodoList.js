import todosStyles from "../styles/Todos.module.css";
import TodoItem from "./TodoItem";
import { useAppContext } from "../context/state";
import NewTodo from "./NewTodo";
import NewTaskButton from "./NewTaskButton";
import Search from "./Search";

const TodoList = ({ todos, projects }) => {
  const context = useAppContext();
  const { todoForm, search, setFocus, focus } = context;

  let today = new Date().toISOString().slice(0, 10);
  console.log(today);
  if (todos && todos.length > 0) {
    if (search) {
      todos = todos.filter((todo) =>
        todo.task_name.toUpperCase().includes(search.toUpperCase())
      );
    }

    if (focus === "Inbox") {
      todos = todos.filter((todo) => todo.project === null);
    }

    if (focus === "Today") {
      todos = todos.filter((todo) => todo.due_date === today);
    }

    if (focus !== "Inbox" && focus !== "Today" && focus !== "All Projects") {
      todos = todos.filter((todo) => todo.project === focus);
    }
  }

  return (
    <div className={todosStyles.datacontainer}>
      <div>
        <div
          key={"Inbox"}
          className={todosStyles.card}
          onClick={setFocus}
          style={focus === "Inbox" ? { fontWeight: "bold" } : null}
          id="Inbox"
        >
          Inbox
        </div>
        <div
          key={"Today"}
          className={todosStyles.card}
          onClick={setFocus}
          id={"Today"}
          style={focus === "Today" ? { fontWeight: "bold" } : null}
        >
          Today
        </div>
        <div
          key={"All Projects"}
          id={"All Projects"}
          style={focus === "All Projects" ? { fontWeight: "bold" } : null}
          className={todosStyles.card}
          onClick={setFocus}
        >
          All Projects <span style={{ float: "right" }}>+</span>
        </div>
        {projects &&
          projects.length > 0 &&
          projects.map((project) => (
            <div
              key={project.id}
              id={project.project_name}
              style={
                focus === project.project_name ? { fontWeight: "bold" } : null
              }
              className={todosStyles.card}
              onClick={setFocus}
            >
              {project.project_name}
            </div>
          ))}
      </div>

      {todoForm ? (
        <div>
          <div className={todosStyles.tasksHeader}>
            <div className={`${todosStyles.projectFocus}`}>{focus}</div>
            <NewTaskButton />
            <Search />
          </div>
          <NewTodo projects={projects} />
        </div>
      ) : (
        <>
          <div>
            <div className={todosStyles.tasksHeader}>
              <div className={`${todosStyles.projectFocus}`}>{focus}</div>
              <NewTaskButton />
              <Search />
            </div>

            {todos &&
              todos.length > 0 &&
              todos
                .map((todo) => <TodoItem todo={todo} key={todo.id}></TodoItem>)
                .reverse()}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
