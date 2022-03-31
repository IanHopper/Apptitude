import { useRouter } from "next/router";
import formStyles from '../styles/Add.module.css'
import { useState } from "react";



const Register = () => {
  const [unique_username, setUnique_Username] = useState(true);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const username = e.target.username.value
    const password = e.target.password.value
    const email = e.target.email.value

    
  

    const JSONdata = JSON.stringify({username, password, email });
    const endpoint =  "http://localhost:8000/register/"
    const options = {
      method: "POST",
      headers: {
      'Content-Type': 'application/json'},
      body: JSONdata,
    };
    try {
      const res = await fetch(endpoint, options)
      console.log(res.status)
      res.status == '200' ? router.push("about") : setUnique_Username(false)
      let data = await res.json();
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }

    // If status 200, go to success page; if error, display error and allow another attempt to register
    
    // router.push("/");
  };

  return (
    <form className={formStyles.addform} onSubmit={handleSubmit}>
      <div className={formStyles.formControl}>
        <label >{unique_username ? 'Username' : <span style={{color: 'red'}}> Username already in use! Choose a different username</span>}</label>
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
      <div className={formStyles.formControl}>
        <label>Email</label>
        <input
          id="email"
          type="email"
          required
        />
      </div>
      <input className={formStyles.btn} type="submit" value="Register" />
    </form>
  );
};

export default Register;
