import {
  TODOS_DATA_UPDATE,
  DISPLAY_TODO_FORM,
  HANDLE_SORT,
  HANDLE_FILTER,
  HANDLE_INPUT_CHANGE,
  DISPLAY_DELETE_MODAL,
  HANDLE_UNDO,
  DELETE_TODO,
  HANDLE_LOGIN_CHANGE,
  HANDLE_REGISTER_CHANGE,
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
  LOAD_USER,
  HANDLE_PROJECT_CHANGE,
  HANDLE_PROJECT_RESET,
} from "./types";

export default function reducers(state, action) {
  switch (action.type) {
    case TODOS_DATA_UPDATE:
    return {
        ...state,
        todos: action.payload.todos,
        projects: action.payload.projects
      };
    case SET_FOCUS:
      return {
        ...state,
        focus: action.payload.focus,
        activeProject: action.payload.activeProject
      };
    case HANDLE_FILTER:
      return {
        ...state,
        filterSelection: action.payload,
      };
    case HANDLE_SORT:
      return {
        ...state,
        sortSelection: action.payload,
      };
    case DISPLAY_TODO_FORM:
      return {
        ...state,
        todoForm: action.payload.todoForm,
        todo: action.payload.todo
      };
    case DISPLAY_USER_MODAL:
      return {
        ...state,
        userModal: action.payload.userModal,
      };
    case HANDLE_INPUT_CHANGE:
      return {
        ...state,
        todo: {
          ...state.todo,
          [action.payload.id]: action.payload.value,
        },
      };
    case HANDLE_PROJECT_CHANGE:
      return {
        ...state,
        projectName: action.payload
      };
    case DISPLAY_DELETE_MODAL:
      return {
        ...state,
        deleteModal: action.payload.deleteModal,
        todo: action.payload.todo,
      };
    case DISPLAY_FAILED_LOGIN_MODAL:
      return {
        ...state,
        failedLoginModal: action.payload.message,
      };
    case HANDLE_UNDO:
      if (!state.history.length) return state;
      return {
        ...state,
        history: action.payload.newHistory,
      };
    case DELETE_TODO:
      return {
        ...state,
        history: state.history.concat([action.payload.deletedTask]),
      };
    case HANDLE_LOGIN_CHANGE:
      return {
        ...state,
        loginCredentials: {
          ...state.loginCredentials,
          [action.payload.id]: action.payload.value,
        },
      };
    case HANDLE_REGISTER_CHANGE:
      return {
        ...state,
        registration: {
          ...state.registration,
          [action.payload.id]: action.payload.value,
        },
      };
    case HANDLE_REGISTER_SUCCESS:
      return {
        ...state,
        registration: {
          username: null,
          email: null,
          password: null,
          password2: null,
        },
      };
    case LOAD_USER:
      return {
        ...state,
        auth: {
          ...state.auth,
          isLoading: false,
          user: action.payload,
        },
      };
    case AUTH_ERROR:
    case LOGOUT_USER:
    case LOGIN_FAIL:
      localStorage.clear()
      return {
        ...state,
        auth: {
          token: null,
          refreshToken: null,
          user: null,
          isLoading: false,
        },
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("refresh", action.payload.refreshToken)
      localStorage.setItem("user", action.payload.user)
      
      return {
        ...state,
        ...action.payload,
        auth: {
          ...state.auth,
          token: action.payload.token,
          refreshToken: action.payload.refreshToken,
          isLoading: false,
          user: action.payload.user,
          isLoggedIn: true,
        },
        loginCredentials: {
          username: null,
          password: null,
        },
      };
    case HANDLE_SEARCH_INPUT:
      return {
        ...state,
        search: action.payload.value,
      };
    default:
      return state;
    case UPDATE_TASK_DATA:
      return {
        ...state,
        taskData: action.payload.taskData,
      };
    case MULTI_SELECT:
      return {
        ...state,
        multiSelection: action.payload.newSelectionArray,
      };
    case HANDLE_TODO_RESET:
      return {
        ...state,
        todo: {},
      };
    case HANDLE_PROJECT_RESET:
      return {
        ...state,
        projectName: '',
      };
  }
}
