import { createContext, useContext } from "react";
import reducers from "./reducers";
import { useReducer } from "react";
import { mutate } from "swr";
import jwtDecode from "jwt-decode";

import {
  TODOS_DATA_UPDATE,
  DISPLAY_TODO_FORM,
  HANDLE_SORT,
  HANDLE_FILTER,
  HANDLE_INPUT_CHANGE,
  HANDLE_UNDO,
  DELETE_TODO,
  HANDLE_LOGIN_CHANGE,
  HANDLE_REGISTER_CHANGE,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_USER,
  HANDLE_REGISTER_SUCCESS,
  HANDLE_SEARCH_INPUT,
  UPDATE_TASK_DATA,
  MULTI_SELECT,
  HANDLE_TODO_RESET,
  SET_FOCUS,
  URL_ENDPOINT,
  LOAD_USER,
  HANDLE_PROJECT_CHANGE,
  HANDLE_PROJECT_RESET,
} from "./types";
import { Router } from "next/router";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const initialState = {
    // authentication credentials
    auth: {
      token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
      rereshToken:
        typeof window !== "undefined" ? localStorage.getItem("token") : "",
      // isLoading: false,
      // user: null,
      user: typeof window !== "undefined" ? localStorage.getItem("user") : "",
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
      password2: null,
    },
    tasksData: {}, // object with total quantity, duration, and cost of displayed tasks
    todos: [], // todo array from API
    todo: {
      project: null,
    }, // current todo
    focus: "All Projects",
    multiSelection: [], // multiple selections for group editing
    projects: [], // array derived from projects in objects in todos
    history: [], // deleted todos that can be recreated
    search: "", // search input
    todoForm: false, // task create and update form
    projectName: ""
  };

  const [state, dispatch] = useReducer(reducers, initialState);

  // Login user
  const login = async (e, username, password) => {
    e.preventDefault();

    if (!username | !password) {
      return null;
    } else if ((username.length < 4) | (password.length < 6)) {
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
      let decoded_token = jwtDecode(token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: token,
          refreshToken: refreshToken,
          user: decoded_token.username,
        },
      });
    } else {
      alert("Something went wrong");
    }
  };

  // Handle change in login form
  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    dispatch({
      type: HANDLE_LOGIN_CHANGE,
      payload: { id, value },
    });
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
      let decoded_token = jwtDecode(token);
      // console.log('Refresh 200')
      // console.log('Token', token)
      // console.log('Refresh', refreshToken)
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
    // console.log("log out")
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

  const displayTodoForm = (e, todos, id) => {
    id && console.log(id);
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

    dispatch({
      type: SET_FOCUS,
      payload: focus,
    });
  };

  const updateTodos = async (todos, projects) => {
    dispatch({
      type: TODOS_DATA_UPDATE,
      payload: { todos: todos, projects: projects },
    });
  };

  const cancelTodo = async () => {
    let form = await displayTodoForm();

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

    let form = await displayTodoForm();
    // Force useSWR to refresh todos from api
    mutate([`${URL_ENDPOINT}api/projects/`, token]);
    mutate([`${URL_ENDPOINT}api/todos/`, token]);

    dispatch({
      type: HANDLE_TODO_RESET,
    });
  };

  const handleTodoClickChange = async (e, todo) => {
    
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
        e.target.type === 'checkbox'
          ? e.target.checked === true
          : todo.completed,
      deleted: e.target.name === "delete-button" ? true : todo.deleted,
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
    let form = e.target.type !== 'checkbox' ? await displayTodoForm(): '';
    // Force useSWR to refresh todos from api
    mutate([`${URL_ENDPOINT}api/projects/`, token]);
    mutate([`${URL_ENDPOINT}api/todos/`, token]);
    
    dispatch({
      type: HANDLE_TODO_RESET
    })
  };

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

    let form = await displayTodoForm();
    // Force useSWR to refresh todos from api
    mutate([`${URL_ENDPOINT}api/projects/`, token]);
    mutate([`${URL_ENDPOINT}api/todos/`, token]);

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
        handleSearchInput,
        handleProjectChange,
        createTodo,
        createProject,
        cancelTodo,
        handleLoginChange,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
