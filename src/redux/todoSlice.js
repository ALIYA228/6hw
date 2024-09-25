import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push({ text: action.payload, completed: false });
        },
        removeTodo: (state, action) => {
            return state.filter((todo, index) => index !== action.payload);
        },
        toggleTodo: (state, action) => {
            const todo = state[action.payload];
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
    },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;