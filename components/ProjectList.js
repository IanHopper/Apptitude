import todosStyles from "../styles/Todos.module.css";
import { useAppContext } from "../context/state";


const ProjectList = ({ projects }) => {
  const context = useAppContext();
  const { setFocus, focus, createProject, projectName, handleProjectChange, auth} = context;


  let token = auth.token
  
  const handleProjectSubmit = (e) => {
    console.log('createProject', token)
    e.preventDefault();
    createProject(projectName, token);
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
          All Projects
        </div>
        
        <div className={todosStyles.title}><h3>Projects</h3></div>
        <div>
          <form className={todosStyles.formControl} onSubmit={handleProjectSubmit} >
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
