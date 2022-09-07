import { createContext, useContext } from "react";
import reducers from "./reducers";
import { useReducer } from "react";
import { mutate } from "swr";
import jwtDecode from "jwt-decode";

import {
  TODOS_DATA_UPDATE,
  DISPLAY_TODO_FORM,
  HANDLE_INPUT_CHANGE,
  HANDLE_LOGIN_CHANGE,
  HANDLE_REGISTER_CHANGE,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  HANDLE_REGISTER_SUCCESS,
  HANDLE_SEARCH_INPUT,
  HANDLE_TODO_RESET,
  SET_FOCUS,
  URL_ENDPOINT,
  LOAD_USER,
  HANDLE_PROJECT_CHANGE,
  HANDLE_PROJECT_RESET,
} from "./types";
import Router, { useRouter } from "next/router";

const AppContext = createContext(null);

export function AppWrapper({ children }) {
  const initialState = {
    // authentication credentials
    auth: {
      token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
      rereshToken:
        typeof window !== "undefined" ? localStorage.getItem("token") : "",
      user: typeof window !== "undefined" ? localStorage.getItem("user") : "",
      isLoggedIn: false,
    },
    // credentials to submit to API for login
    loginCredentials: {
      username: null,
      password: null,
    },
    // data to submit to API for registration
    registration: {
      username: null,
      email: null,
      password: null,
    },
    registrationFail: false,
    tasksData: {}, // object with total quantity, duration, and cost of displayed tasks
    todos: [], // todo array from API
    todo: {
      project: null,
    }, // current todo
    focus: "All Projects",
    activeProject: "",
    multiSelection: [], // multiple selections for group editing
    projects: [], // array derived from projects in objects in todos
    history: [], // deleted todos that can be recreated
    search: "", // search input
    todoForm: false, // task create and update form
    projectName: "",
    today: new Date().toISOString().slice(0, 10),
  };

  const [state, dispatch] = useReducer(reducers, initialState);
  // Register user
  const register = async (e, registration) => {
    e.preventDefault();
    const { username, email, password } = registration;
    console.log(username, email, password);
    const JSONdata = JSON.stringify({ username, password, email });
    const endpoint = `${URL_ENDPOINT}register/`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    try {
      const res = await fetch(endpoint, options);
      res.status === 200
        ? Router.replace("/login")
        //Add better alert here
        : alert("Your registration failed");
      let data = await res.json();

      dispatch({
        type: HANDLE_REGISTER_SUCCESS,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  // Login user
  const login = async (e, username, password) => {
    e.preventDefault();

    if (!username || !password) {
      return null;
    } else if ((username.length < 4) || (password.length < 6)) {
      return null;
    }

    const JSONdata = JSON.stringify({ username, password });
    const endpoint = `${URL_ENDPOINT}login/`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    async function getKey() {
      let data = await res.json();
      let token = data.access;
      let refreshToken = data.refresh;
      return { token, refreshToken };
    }
    const res = await fetch(endpoint, options);
    if (res.status === 200) {
      let { token, refreshToken } = await getKey();
      let decoded_token:{username:string} = jwtDecode(token);
      Router.replace("/");
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: token,
          refreshToken: refreshToken,
          user: decoded_token.username,
          isLoggedIn: true,
        },
      });
    } else {
      alert("Something went wrong");
    }
  };

  // Handle change in login form
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    console.log(e.target.parentNode.parentNode.id);
    const page = e.target.parentNode.parentNode.id;
    if (page === "login") {
      dispatch({
        type: HANDLE_LOGIN_CHANGE,
        payload: { id, value },
      });
    } else if (page === "registration") {
      dispatch({
        type: HANDLE_REGISTER_CHANGE,
        payload: { id, value },
      });
    }
  };

  // Refresh tokens
  const refreshJWT = async () => {
    const refresh = localStorage.getItem("refresh");
    console.log("refresh ran");
    const JSONdata = JSON.stringify({ refresh: refresh });
    const endpoint = `${URL_ENDPOINT}login/refresh/`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    async function getKey() {
      let data = await res.json();
      let token = data.access;
      let refreshToken = data.refresh;
      return { token, refreshToken };
    }
    const res = await fetch(endpoint, options);
    if (res.status === 200) {
      let { token, refreshToken } = await getKey();
      let decoded_token:{username:string} = jwtDecode(token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: token,
          refreshToken: refreshToken,
          user: decoded_token.username,
        },
      });
    } else {
      logout();
    }
  };

  // When page loads check for user
  const loadUser = (user) => {
    dispatch({
      type: LOAD_USER,
      payload: user,
    });
  };

  // Logout
  const logout = async () => {
    console.log("logout");
    dispatch({
      type: LOGOUT_USER,
    });
  };

  // Handle change in form input
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch({
      type: HANDLE_INPUT_CHANGE,
      payload: { id, value },
    });
  };

  // Handle change in form input
  const handleProjectChange = (e) => {
    const projectName = e.target.value;
    dispatch({
      type: HANDLE_PROJECT_CHANGE,
      payload: projectName,
    });
  };

  const displayTodoForm = (todos, id) => {
    const todo = id
      ? todos.filter((todo) => {
          return todo.id === id;
        })[0]
      : {};

    let todoForm = !state.todoForm;
    dispatch({
      type: DISPLAY_TODO_FORM,
      payload: { todoForm, todo },
    });
  };

  const setFocus = (e) => {
    const focus = e.target.id;
    const activeProject = e.target.dataset.key;
    console.log(focus, activeProject);
    dispatch({
      type: SET_FOCUS,
      payload: { focus, activeProject },
    });
  };

  const updateTodos = async (todos, projects) => {
    dispatch({
      type: TODOS_DATA_UPDATE,
      payload: { todos: todos, projects: projects },
    });
  };

  const cancelTodo = async () => {
    dispatch({
      type: HANDLE_TODO_RESET,
    });
  };
  // Handle search input
  const handleSearchInput = (e) => {
    const { value } = e.target;
    dispatch({
      type: HANDLE_SEARCH_INPUT,
      payload: { value },
    });
  };

  // Create project
  const createProject = async (projectName) => {
    const data = {
      project_name: projectName,
    };
    const JSONdata = JSON.stringify(data);
    let token = state.auth.token;
    const endpoint = `${URL_ENDPOINT}api/projects/`;
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSONdata,
    };
    const res = await fetch(endpoint, options);
    // Force useSWR to refresh projects from api
    mutate([`${URL_ENDPOINT}api/projects/`, token]);
    mutate([`${URL_ENDPOINT}api/todos/`, token]);

    dispatch({
      type: HANDLE_PROJECT_RESET,
    });
  };

  // Delete project
  const deleteProject = async () => {
    const id = state.activeProject;
    let token = state.auth.token;
    const endpoint = `${URL_ENDPOINT}api/projects/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    };
    const res = await fetch(endpoint, options);
    // Force useSWR to refresh projects from api
    mutate([`${URL_ENDPOINT}api/projects/`, token]);
    mutate([`${URL_ENDPOINT}api/todos/`, token]);

    dispatch({
      type: HANDLE_PROJECT_RESET,
    });
    const activeProject = "";
    const focus = "All Projects";
    dispatch({
      type: SET_FOCUS,
      payload: { focus, activeProject },
    });
  };

  // Create todo
  const createTodo = async () => {
    const todo = state.todo;
    const data = {
      task_name: todo.task_name,
      description: todo.description,
      due_date: todo.due_date,
      priority: todo.priority,
      cost: todo.cost,
      duration: todo.duration,
      id: todo.id,
      project: todo.project,
    };

    todo.project !== null ? (data.project = todo.project) : null;
    // const id = data.id !== {} ? `${data.id}/` : ''
    const id = data.id ? `${data.id}/` : "";
    const method = data.id ? "PUT" : "POST";

    let token = state.auth.token;
    const JSONdata = JSON.stringify(data);

    const endpoint = `${URL_ENDPOINT}api/todos/${id}`;

    const options = {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSONdata,
    };
    const res = await fetch(endpoint, options);
    

    

    // Force useSWR to refresh todos from api
    mutate([`${URL_ENDPOINT}api/projects/`, token]);
    mutate([`${URL_ENDPOINT}api/todos/`, token]);
    
    let todoForm = false
    dispatch({
      type: DISPLAY_TODO_FORM,
      payload: todoForm
    })

    dispatch({
      type: HANDLE_TODO_RESET,
    });
  };

  // Update or delete Todo
  const handleTodoClickChange = async (e, todo) => {
    let changeType = e.target.name;
    let token = state.auth.token;
    const data = {
      task_name: todo.task_name,
      description: todo.description,
      due_date: todo.due_date,
      priority: todo.priority,
      cost: todo.cost,
      duration: todo.duration,
      id: todo.id,
      project: todo.project,
      completed:
        e.target.type === "checkbox"
          ? e.target.checked === true
          : todo.completed,
      deleted:
        e.target.name === "delete-button"
          ? (todo.deleted = !todo.deleted)
          : todo.deleted,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = `${URL_ENDPOINT}api/todos/${data.id}/`;
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSONdata,
    };
    const res = await fetch(endpoint, options);

    // Force useSWR to refresh todos from api
    mutate([`${URL_ENDPOINT}api/projects/`, token]);
    mutate([`${URL_ENDPOINT}api/todos/`, token]);
    console.log(changeType);
    dispatch({
      type: HANDLE_TODO_RESET,
    });
  };

  // Currently not in use since this permanently deletes from DB
  const deleteTodo = async () => {
    const id = `${state.todo.id}/`;
    let token = state.auth.token;

    const endpoint = `${URL_ENDPOINT}api/todos/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    };
    const res = await fetch(endpoint, options);

    // Force useSWR to refresh todos from api
    mutate([`${URL_ENDPOINT}api/projects/`, token]);
    mutate([`${URL_ENDPOINT}api/todos/`, token]);
    
    let todoForm = false
    dispatch({
      type: DISPLAY_TODO_FORM,
      payload: todoForm
    })

    dispatch({
      type: HANDLE_TODO_RESET,
    });
  };

  return (
    <AppContext.Provider
      value={{
        auth: state.auth,
        user: state.user,
        todos: state.todos,
        todo: state.todo,
        multiSelection: state.multiSelection,
        search: state.search,
        todoForm: state.todoForm,
        projectName: state.projectName,
        sortSelection: state.sortSelection,
        filterSelection: state.filterSelection,
        history: state.history,
        loginCredentials: state.loginCredentials,
        registration: state.registration,
        tasksData: state.taskData,
        projects: state.projects,
        defaultTodo: state.defaultTodo,
        focus: state.focus,
        today: state.today,
        activeProject: state.activeProject,
        handleSearchInput,
        handleProjectChange,
        createTodo,
        createProject,
        cancelTodo,
        handleFormChange,
        handleInputChange,
        displayTodoForm,
        deleteTodo,
        refreshJWT,
        updateTodos,
        setFocus,
        loadUser,
        login,
        logout,
        handleTodoClickChange,
        register,
        deleteProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
