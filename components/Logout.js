import React from "react";
import { useRouter } from "next/router";
import formStyles from "../styles/Add.module.css";
import { useAppContext } from "../context/state";
import { useState } from "react";
import Link from "next/link";

const Logout = () => {
  const context = useAppContext();
  const { auth, logout } = context;

  const router = useRouter();

  return (
    <div>
      <h2>You are now logged out</h2>
      <Link href="/login">Login Again</Link>
    </div>
  );
};

export default Logout;
