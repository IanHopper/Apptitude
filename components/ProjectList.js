import todosStyles from "../styles/Todos.module.css";
import { useAppContext } from "../context/state";

const ProjectList = ({ projects }) => {
  const context = useAppContext();
  const {
    setFocus,
    focus,
    createProject,
    projectName,
    handleProjectChange,
    auth,
    todos
  } = context;

  let token = auth.token;

  const handleProjectSubmit = (e) => {
    console.log("createProject", token);
    e.preventDefault();
    createProject(projectName, token);
  };


  const todoCount = (name) => {
    let count = [];
    if (todos && todos.length > 0) {
      // Filter out deleted todos
      todos = todos.filter((todo) => !todo.deleted);
      if (name !== "Today") {
        count = todos.filter((todo) => todo.project_name === name)
      } else {
        // count = todos.filter((todo)=> todo.due_date = new Date().toISOString().slice(0, 10))
        // count = todos.filter((todo)=> todo.due_date = new Date().toISOString().slice(0, 10))
      }
    }
    return count.length
  };

  // const todoCount = () => {
  //   todos = todos.filter((todo) => todo.project_name === focus);
  // }

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
          key={"All Projects"}
          id={"All Projects"}
          style={focus === "All Projects" ? { fontWeight: "bold" } : null}
          className={todosStyles.card}
          onClick={setFocus}
        >
          All Projects
        </div>

        <div className={todosStyles.title}>
          <h3>Projects</h3>
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
    </>
  );
};

export default ProjectList;
