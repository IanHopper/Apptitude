import todosStyles from "../styles/Todos.module.css";
import TodoItem from "./TodoItem";
import { useAppContext } from "../context/state";
import NewTodo from "./NewTodo";
import Search from "./Search";
import NewTaskButton from "./NewTaskButton";

const TodoList = ({ todos, projects }) => {
  const context = useAppContext();
  const { todoForm, search } = context;
  if (search) {
    todos = todos.filter((todo) =>
      todo.task_name.toUpperCase().includes(search.toUpperCase())
    );
  }

  return (
    <>
      <div>
        {todoForm ? (
          <NewTodo projects={projects} />
        ) : (
          <>
            <div className={todosStyles.grid}>
              <div className={todosStyles.listheader}>
                <NewTaskButton />
                <Search />
              </div>

              {todos &&
                todos.length > 0 &&
                todos
                  .map((todo) => (
                    <TodoItem todo={todo} key={todo.id}></TodoItem>
                  ))
                  .reverse()}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TodoList;
