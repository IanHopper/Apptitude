import React from "react";
import Link from "next/link";

const Logout = () => {
 

  return (
    <div>
      <h2>You are now logged out</h2>
      <Link href="/login">
      <a>Login again</a>
      </Link>
    </div>
  );
};

export default Logout;
