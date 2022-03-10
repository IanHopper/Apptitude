const login = () => {
  console.log(loginAttempt());
  return <div>login</div>;
};

const login_url = "https://ihop-blog-api.herokuapp.com/api-auth/login";

export const loginAttempt = async () => {
  
  const body = { username: 'ersatz', password: 'trumpy123'}
  const config = {
    headers: {
      
    },
  };
  const res = await fetch(login_url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(body)
  });
  console.log(res)
  // const data = res.json();
  // return data;
};

export default login;
