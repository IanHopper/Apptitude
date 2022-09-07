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
import { Key } from "react";


const TodoList = () => {
  const context = useAppContext();
  const { todoForm, search, focus, projects, todos, todo, deleteProject } = context;
  let heading = focus;
  let filteredTodos: {id: number, task_name: string, due_date: string, project: number, project_name: string, completed: boolean, duration: number, cost: number, priority: number, deleted: boolean}[] = todos;
  let deletedTodos: (object)[] = []
  if (todos && todos.length > 0) {
    deletedTodos = filteredTodos.filter((todo: { deleted: boolean; }) => todo.deleted);
    filteredTodos = filteredTodos.filter((todo: { deleted: boolean; }) => !todo.deleted);

    if (search) {
      filteredTodos = filteredTodos.filter((todo: { task_name: string; }) =>
        todo.task_name.toUpperCase().includes(search.toUpperCase())
      );
    }

    if (focus === "Inbox") {
      filteredTodos = filteredTodos.filter((todo: { project: any; }) => todo.project === null);
    }

    if (focus === "Today") {
      filteredTodos = filteredTodos.filter(
        (todo: { due_date: string; }) => todo.due_date === new Date().toISOString().slice(0, 10)
      );
    }

    if (focus !== "Inbox" && focus !== "Today" && focus !== "All Projects") {
      filteredTodos = filteredTodos.filter((todo: { project_name: any; }) => todo.project_name === focus);
    }
    // Sort tasks by priority
    filteredTodos = filteredTodos.sort(function (a: { priority: number; }, b: { priority: number; }) {
      return b.priority - a.priority;
    });
    // Sort completed tasks to the bottom
    filteredTodos = filteredTodos.sort((a: {completed:boolean}, b: {completed:boolean}) => Number(b.completed) - Number(a.completed));
  }
  
  const projectTotal = (projectTodos: {completed: boolean, duration: number, cost: number}[], quantityType: string) => {
    let projectCost = 0;
    let projectDuration = 0;
    if (typeof projectTodos === "object" && projectTodos.length > 0) {
      projectTodos = projectTodos.filter((tod:{completed:boolean}) => !tod.completed);
      for (let tod of projectTodos) {
        projectDuration += tod.duration;
        projectCost += parseFloat(tod.cost.toString());
      }
    }
    if (quantityType === "duration") {
      return projectDuration > 0 ? `${projectDuration}m` : "0m";
    } else if (quantityType === "cost") {
      return projectCost > 0 ? `$${projectCost}` : "$0";
    }
  };

  if (todoForm) {
    heading =
      todo.id !== undefined ? "Edit Task" : "Create a New Task";
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
          <NewTodo/>
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
                      {projectTotal(filteredTodos, "duration")}
                    </span>{" "}
                    <span className={todosStyles.projectCost}>
                      {projectTotal(filteredTodos, "cost")}
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

            {typeof filteredTodos !== "undefined" &&
              focus !== "Deleted Tasks" &&
              filteredTodos.length > 0 &&
              filteredTodos
                .map((todo: { id: Key; }) => <TodoItem todo={todo} key={todo.id}></TodoItem>)
                .reverse()}
            {typeof deletedTodos !== "undefined" &&
              deletedTodos.length > 0 &&
              focus === "Deleted Tasks" &&
              deletedTodos.length > 0 &&
              deletedTodos
                .map((todo: { id: Key; }) => <TodoItem todo={todo} key={todo.id}></TodoItem>)
                .reverse()}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
