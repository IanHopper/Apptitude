import todosStyles from "../styles/Todos.module.css";
import TodoItem from "./TodoItem";
import { useAppContext } from "../context/state";
import NewTodo from "./NewTodo";

const ProjectList = ({ projects}) => {
  const context = useAppContext();
  const { todoForm, displayTodoForm, updateTodos } = context;

  return (
    <>
      <div>
        {todoForm ? (
          <NewTodo />
        ) : (
          <>
            <div className={todosStyles.grid}>
              <button
                onClick={displayTodoForm}
                className={`${todosStyles.btn} ${todosStyles.newTask}`}
              >
                New Task
              </button>
              {projects &&
                projects.length > 0 &&
                projects
                  .map((project) => (
                    <TodoItem project={project} key={project.id}></TodoItem>
                  ))
                  .reverse()}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProjectList;
