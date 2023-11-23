// import uuid from "react-uuid";
import shortid from 'shortid';

const initialState = [
    {
        id: shortid.generate(),
        title: '할일제목1',
        body: '할일내용1',
        isDone: false,
    },
    {
        id: shortid.generate(),
        title: '할일제목2',
        body: '할일내용2',
        isDone: true,
    },
];

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SWITCH_TODO = 'SWITCH_TODO';

//action creator
export const addTodo = (payload) => {
    //console.log('payload', payload);
    return { type: ADD_TODO, payload };
};

export const deleteTodo = (payload) => {
    //console.log('payload', payload);
    return { type: DELETE_TODO, payload };
};

export const switchTodo = (payload) => {
    return { type: SWITCH_TODO, payload };
};

// 리듀서
const todos = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            const newTodo = action.payload;
            //console.log('newTodo', newTodo);
            return [newTodo, ...state];

        case 'DELETE_TODO':
            const selectId = action.payload;
            //console.log('selectId', selectId);
            return state.filter((todo) => todo.id !== selectId.id);

        case 'SWITCH_TODO':
            const id = action.payload;
            return state.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isDone: !todo.isDone };
                }
            });

        default:
            return state;
    }
};

export default todos;
