import { useRouter } from "next/router";
import formStyles from '../styles/Add.module.css'

const Login = () => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const username = e.target.username.value
    const password = e.target.password.value
  

    const JSONdata = JSON.stringify({ username, password });
    const endpoint =  "http://localhost:8000/login/"
    const options = {
      method: "POST",
      headers: {
      'Content-Type': 'application/json'},
      body: JSONdata,
    };
    const res = await fetch(endpoint, options);

    if (res.status === 200) {
      router.push("/");
    }

    async function getKey(){
      let key = await res.json()
      let token = key.access
      console.log(token)
      localStorage.setItem("token", token.toString())
      return token
    };

    getKey()
  
  };

  return (
    <form className={formStyles.addform} onSubmit={handleSubmit}>
      <div className={formStyles.formControl}>
        <label >Username</label>
        <input
        id="username"
          type="text"
          required
        />
      </div>
      <div className={formStyles.formControl}>
        <label>Password</label>
        <input
          id="password"
          type="password"
          required
        />
      </div>
      <input className={formStyles.btn} type="submit" value="Login" />
    </form>
  );
};

export default Login;
