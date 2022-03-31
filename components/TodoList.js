import todosStyles from '../styles/Todos.module.css'
import TodoItem from './TodoItem'


const TodoList = ({todos}) => {
  return (
    <div className={todosStyles.grid}>
      {todos.length > 0 && todos.map((todo) => (<TodoItem todo={todo} key={todo.id}>
      </TodoItem>)).reverse()}
    </div>
  )
}

export default TodoList