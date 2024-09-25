import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, toggleTodo } from './redux/todoSlice';

function App() {
    const [input, setInput] = useState('');
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            storedTodos.forEach((todo) => {
                dispatch(addTodo(todo.text));
            });
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = () => {
        if (input.trim()) {
            dispatch(addTodo(input));
            setInput('');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a task"
            />
            <button onClick={handleAddTodo}>Add Task</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <span
                            onClick={() => dispatch(toggleTodo(index))}
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                cursor: 'pointer',
                                color: todo.completed ? 'green' : 'black',
                            }}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => dispatch(removeTodo(index))}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
