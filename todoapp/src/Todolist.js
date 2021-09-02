import React,{useState} from 'react';
import './Todolist.css';

function Todo({todo,index,completeTodo,removeTodo}){
    return( 
        <div className="todo" style={{ textDecoration: todo.isCompleted ? "line-through" : "" }} >
               <div className="TEXT">
                {todo.text}
                </div>
            
                <button className="Complete" onClick={()=> completeTodo(index)}>Complete</button>
                <button className="Delete" onClick={()=> removeTodo(index)}>Delete</button>
                
        </div>
    );
}

function TodoForm({addTodo}){
    const [value, setValue] = useState('');
    const clickSumbit = e=>{
        e.preventDefault();
        if(!value) return;
        addTodo(value);
        setValue('');
        
    };
    return(
        <form onSubmit={clickSumbit}>
            <input 
                type="text"
                className="input"
                value={value}
                placeholder="Enter text here..."
                onChange={e=>setValue(e.target.value)}
            />
            
        </form> 
    );
}

function Todolist(){
const [todos, setTodos] = useState([]);


useState(() => {
    const list = window.localStorage.getItem('value');
    const parsedList = JSON.parse(list);
    setTodos(parsedList);
});


const addTodo=text=>{
    const newTodos=[{text},...todos];
    setTodos(newTodos);
    localStorage.setItem('value',JSON.stringify(newTodos));
};
const completeTodo = text => {
    const newTodos = [...todos];
    newTodos[text].isCompleted = true;
    setTodos(newTodos);
    localStorage.setItem('value',JSON.stringify(newTodos));  
};
const removeTodo=index=>{
    const newTodos=[...todos];
    newTodos.splice(index,1);
    setTodos(newTodos);
    localStorage.setItem('value',JSON.stringify(newTodos));
};
return(
<div className="todo_app">
    <div className="todo-list">
    <div className="heading">My To Do List</div><br />
    <TodoForm addTodo={addTodo} />
    {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        
    </div>
</div>
);
}
export default Todolist;