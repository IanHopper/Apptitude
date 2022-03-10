import { useRouter } from "next/router";
import formStyles from '../styles/Add.module.css'

const NewPost = () => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      author: 1,
      title: e.target.title.value,
      body: e.target.body.value,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = "https://ihop-blog-api.herokuapp.com/api/v1/";
    const token = "ebe0b03ab76f86f3c2c892f38628ee79ba70d88b";
    const options = {
      method: "POST",
      headers: { Authorization: `Token ${token}`,
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
      <h3>New Post</h3>
      <div className={formStyles.formControl}>
        {/* <label hmtlFor="title">Title</label> */}
        <input
        id="title"
          type="text"
          placeholder="Title"
          required
        />
      </div>
      <div className={formStyles.formControl}>
        {/* <label>Body</label> */}
        <input
          id="body"
          type="text"
          placeholder="Body"
          required
        />
      </div>
      <input className={formStyles.btn} type="submit" value="Save Task" />
    </form>
  );
};

export default NewPost;
