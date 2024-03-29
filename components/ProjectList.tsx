import todosStyles from "../styles/Todos.module.css";
import { useAppContext } from "../context/state";
import { Key } from "react";

const ProjectList = ({ projects }) => {
  const context = useAppContext();
  const {
    setFocus,
    focus,
    createProject,
    projectName,
    handleProjectChange,
    auth,
    todos,
    today
  } = context;

  let token = auth.token;

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProject(projectName, token);
  };


  const todoCount = (name: string) => {
    let count: (object)[]  = [];
    
    if (todos && todos.length > 0) {
      if (name === "Deleted Tasks") {
        let deletedTodos = todos.filter((todo) => todo.deleted);
        return deletedTodos.length
      }
      
      // Filter out deleted todos
      let activeTodos = todos.filter((todo) => !todo.deleted);
      if (name === "All") {
        count = activeTodos
      }
      else if (name !== "Today") {
        count = activeTodos.filter((todo) => todo.project_name === name)
      } else {
        count = activeTodos.filter((todo) => todo.due_date === today)
      }
    }
    const totalTodos:number = count.length
    return totalTodos
  };

  return (
    <>
      <div>
        <div
          key={"Inbox"}
          className={todosStyles.card}
          onClick={setFocus}
          style={focus === "Inbox" ? { fontWeight: "bold" } : null}
          id="Inbox"
        >
          Inbox {todoCount(null)}
        </div>
        <div
          key={"Today"}
          className={todosStyles.card}
          onClick={setFocus}
          id={"Today"}
          style={focus === "Today" ? { fontWeight: "bold" } : null}
        >
          Today {todoCount("Today")}
        </div>
        <div
          key={"All Tasks"}
          id={"All Tasks"}
          style={focus === "All Tasks" ? { fontWeight: "bold" } : null}
          className={todosStyles.card}
          onClick={setFocus}
        >
          All Tasks {todoCount("All")}
        </div>
        <div
          key={"Deleted Tasks"}
          id={"Deleted Tasks"}
          style={focus === "Deleted Tasks" ? { fontWeight: "bold" } : null}
          className={todosStyles.card}
          onClick={setFocus}
        >
          Deleted Tasks {todoCount("Deleted Tasks")}
        </div>

        <div className={todosStyles.title}>
          <h3>Tasks</h3>
        </div>
        <div>
          <form
            className={todosStyles.formControl}
            onSubmit={handleProjectSubmit}
          >
            <input
              className={todosStyles.projectInput}
              id="new_project"
              type="text"
              value={projectName ? projectName : ""}
              onChange={handleProjectChange}
              placeholder="+ Add Project"
            />
          </form>
        </div>
        {projects &&
          projects.length > 0 &&
          projects.map((project: { id: Key; project_name: string}) => (
            <div
              key={project.id}
              data-key={project.id}
              id={project.project_name}
              style={
                focus === project.project_name ? { fontWeight: "bold" } : null
              }
              className={todosStyles.card}
              onClick={setFocus}
            >
              {project.project_name} {todoCount(project.project_name)}
            </div>
          ))}
      </div>
    </>
  );
};

export default ProjectList;
