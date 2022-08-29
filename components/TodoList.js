import todosStyles from "../styles/Todos.module.css";
import TodoItem from "./TodoItem";
import { useAppContext } from "../context/state";
import NewTodo from "./NewTodo";
import NewTaskButton from "./NewTaskButton";
import Search from "./Search";
import ProjectList from "./ProjectList";

const TodoList = () => {
  const context = useAppContext();
  const { todoForm, search, focus, projects, todos, todo } = context;

  let today = new Date().toISOString().slice(0, 10);

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
      todos = todos.filter((todo) => todo.project_name === focus);
    }
  }

 let heading = focus

 if (todoForm) {
  heading = todo.id !== undefined ? `Edit ${todo.task_name}` : "Create a New Task"
 }

  

  return (
    <div className={todosStyles.datacontainer}>
      <ProjectList projects={projects} />

      {todoForm ? (
        <div>
          <div className={todosStyles.tasksHeader}>
            <div className={`${todosStyles.projectFocus}`}>
              {heading}
            </div>
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
