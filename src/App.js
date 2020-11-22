import { useState,useEffect } from 'react'
import TodoList from './components/TodoList'
import TodoItem from './components/TodoItem'

function App() {
  const [todoText,setTodoText] = useState("");
  const [error,setError] = useState(false);
  const [selectValue,setSelectValue ] = useState('all');
  const [ todoFilter , setTodoFilter ] = useState([]);
  const [todo,setTodo] = useState(()=>{
    const storage = localStorage.getItem('todo');
    if(!!storage){
      return JSON.parse(storage)
    }else{
      return [];
    }
  });
  useEffect(()=>{
    localStorage.setItem('todo',JSON.stringify(todo))
    switch(selectValue){
      case "completed":
        setTodoFilter(todo.filter(td => td.completed === true))
        break
      case "uncompleted":
        setTodoFilter(todo.filter(td => td.completed === false))
        break;
     default:
      setTodoFilter(todo);
    }
  },[todo,selectValue])

  const addTodo = () => {
    if(todoText === ""){
      setError(true)
      return;
    }else{
      setTodo([...todo,{
        id: Math.floor(Math.random() * 150),
        content: todoText,
        completed: false,
      }])
      setError(false);
    }
    setTodoText("")
  }
  const completeTodo = (id) => {
    const filterTodo = todo.findIndex(td => td.id === id)
    const newArray = [...todo]
    newArray[filterTodo] = {...newArray[filterTodo],completed: !newArray[filterTodo].completed}
    setTodo(newArray);
    console.log(todo)
  }
  const removeTodo = (id) =>{
      const filteredTodo = todo.filter(td => td.id !== id)
      setTodo(filteredTodo)
  }
  const filterTodo = (e) => {
    setSelectValue(e.target.value)
  }
  console.log()
  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-field">
      <input 
      type="text"
      value={todoText}
      onChange={(e) => setTodoText(e.target.value)}
      />
      <select name="status" 
      value={selectValue}
      onChange={filterTodo}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
      </div>
      {error && <p>Digite algo</p>}
      <button className="add" onClick={addTodo}>Adicionar</button>
      <TodoList>
        {todoFilter.map((t) => {
          return(
              <TodoItem
              key={t.id}
              content={t.content}
              status = {t.completed}
              editTodo = {() => completeTodo(t.id)}
              removeTodo = {() => removeTodo(t.id)}
              />
          )})}
      </TodoList>
   </div>
  );
}

export default App;
