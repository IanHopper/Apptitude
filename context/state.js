import { createContext, useContext } from "react";
import reducers from "./reducers";
import { useReducer } from "react";
import {mutate} from "swr";
import {
  FETCH_TODOS,
  DISPLAY_TODO_FORM,
  HANDLE_SORT,
  HANDLE_FILTER,
  HANDLE_INPUT_CHANGE,
  DISPLAY_DELETE_MODAL,
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
  DISPLAY_USER_MODAL,
  UPDATE_TASK_DATA,
  DISPLAY_FAILED_LOGIN_MODAL,
  MULTI_SELECT,
  HANDLE_TODO_RESET,
  SET_FOCUS,
} from "./types";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const initialState = {
    // authentication credentials
    auth: {
      token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
      rereshToken: typeof window !== "undefined" ? localStorage.getItem("token") : "",
      isAuthenticated: false,
      isLoading: false,
      user: null,
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
    taskData: {}, // object with total quantity, duration, and cost of displayed tasks
    todos: [], // todo array from API
    todo: {
      project: null,
    }, // selected todo
    focus: "All Projects",
    multiSelection: [], // multiple selections for group editing
    projects: [], // array derived from projects in objects in todos
    history: [], // deleted todos that can be recreated
    search: "", // search input
    todoForm: false, // task create and update form
    modalNew: true, // boolean for create or update task modal
    deleteModal: "", // value of todo to be deleted
    failedLoginModal: "",
    userModal: false, // boolean to display logout modal
    sortSelection: "date-ascending",
    filterSelection: "active",
    // default todo values for creating a new task
    defaultTodo: {
      username: null,
      task_name: "",
      description: "",
      due_date: null,
      priority: 4,
      project: "",
      cost: null,
      duration: null,
    },
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
    const endpoint = "http://localhost:8000/login/";
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
      let refresh_token = data.refresh;
      console.log(`token: ${token}`);
      console.log(`refresh token: ${refresh_token}`);
      console.log(data);
      return token;
    }
    const res = await fetch(endpoint, options);
    if (res.status === 200) {
      console.log("200 OK");
      let token = await getKey();
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token: token, user: username },
      });
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

  // Logout
  const logout = async () => {
    let token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // If token, add to headers config
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    try {
      await axios.post(`${appUrl}/api/auth/logout`, null, config);
      dispatch({
        type: LOGOUT_USER,
      });
    } catch (err) {
      console.log(err.response.data, err.response.status);
    }
  };

  // Handle change in form input
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch({
      type: HANDLE_INPUT_CHANGE,
      payload: { id, value },
    });
  };

  const displayTodoForm = () => {
    let todoForm = !state.todoForm;
    dispatch({
      type: DISPLAY_TODO_FORM,
      payload: { todoForm },
    });
  };

  const setFocus = (e) => {
    const focus = e.target.id
    console.log(focus)
    dispatch({
      type: SET_FOCUS,
      payload: focus,
    });
  };

  // NOT IMPLEMENTED; STATE CHANGE FORCES REFRESH
  const updateTodos = async (data) => {
    console.log('updateTodos')
    console.log(data)
    dispatch({
      type: FETCH_TODOS,
      payload: data
    })
  }
  const cancelTodo = async () => {
    let form = await displayTodoForm();

  dispatch({
    type: HANDLE_TODO_RESET,
  })
  }
   // Handle search input
   const handleSearchInput = (e) => {
    const { value } = e.target;
    dispatch({
      type: HANDLE_SEARCH_INPUT,
      payload: { value },
    });
  };
  
  const createTodo = async (todo, token) => {
    const data = {
      task_name: todo.task_name,
      description: todo.description,
      due_date: todo.due_date,
      priority: todo.priority,
      project: todo.project,
      cost: todo.cost,
      duration: todo.duration,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = "http://127.0.0.1:8000/api/todos/";

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const res = await fetch(endpoint, options);
    const result = await res.json();
    console.log(result);
    let form = await displayTodoForm();
    // Force useSWR to refresh todos from api
    mutate(["http://127.0.0.1:8000/api/todos/", token])

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
        modalNew: state.modalNew,
        sortSelection: state.sortSelection,
        filterSelection: state.filterSelection,
        deleteModal: state.deleteModal,
        userModal: state.userModal,
        history: state.history,
        loginCredentials: state.loginCredentials,
        registration: state.registration,
        taskData: state.taskData,
        failedLoginModal: state.failedLoginModal,
        projects: state.projects,
        defaultTodo: state.defaultTodo,
        focus: state.focus,
        handleSearchInput,
        createTodo,
        cancelTodo,
        handleLoginChange,
        handleInputChange,
        displayTodoForm,
        updateTodos,
        setFocus,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
