import { useRouter } from "next/router";
import formStyles from '../styles/Add.module.css'
import Token from "./Token";

const NewTodo = () => {
  let token = Token()
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      task_name: e.target.task_name.value,
      description: e.target.description.value,
      due_date: e.target.due_date.value
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = "http://127.0.0.1:8000/api/todos/";
    
    const options = {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'},
      body: JSONdata,
    };
    const res = await fetch(endpoint, options);
    const result = await res.json();
    console.log(result)
    
    router.push("/");
  };

  return (
    <form className={formStyles.addform} onSubmit={handleSubmit}>
      <h3>New Todo</h3>
      <div className={formStyles.formControl}>
        {/* <label hmtlFor="title">Title</label> */}
        <input
        id="task_name"
          type="text"
          placeholder="Task Name"
          required
        />
      </div>
      <div className={formStyles.formControl}>
        {/* <label>Body</label> */}
        <input
          id="description"
          type="text"
          placeholder="Description"
          
        />
      </div>
      <div className={formStyles.formControl}>
        {/* <label>Body</label> */}
        <input
          id="due_date"
          type="date"
          placeholder="Due Date"
          
        />
      </div>
      <input className={formStyles.btn} type="submit" value="Save Task" />
    </form>
  );
};

export default NewTodo;
