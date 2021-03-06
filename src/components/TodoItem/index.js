import './style.css'

function TodoItem({content,status,editTodo,removeTodo}) {
    return(
        <div className="todoItem">
        <div className="content">
            <h3>{content}</h3>
            <span>{status}</span>
        </div>
        <div>
            <button onClick={editTodo}>{status ? "Completo" : "Incompleto"}</button>
            <button onClick={removeTodo}>Deletar</button>
        </div>
        </div>
    )
}

export default TodoItem;