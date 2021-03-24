import { createContext, useReducer, useContext } from "react";

const TodoContext = createContext();

const initialItems = [
  {
    id: 1,
    text: "Extract todo state to todo context",
  },
  {
    id: 2,
    text: "Implement todo provider",
  },
];

// Actions
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const CLEAR_ALL = "CLEAR_ALL";

// Action creators
export const addTodo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

export const removeTodo = (id) => {
  return {
    type: REMOVE_TODO,
    id,
  };
};

export const clearAll = () => {
  return {
    type: CLEAR_ALL,
  };
};

// Reducer
const TodoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        { id: state[state.length - 1]?.id + 1 || 1, text: action.text },
      ];

    case REMOVE_TODO:
      return state.filter((state) => state.id !== action.id);

    case CLEAR_ALL:
      return [];

    default:
      return state;
  }
};

export const TodoProvider = (props) => {
  const [items, dispatch] = useReducer(TodoReducer, initialItems);
  const todoData = { items, dispatch };

  return <TodoContext.Provider value={todoData} {...props} />;
};

export const useTodoContext = () => useContext(TodoContext);
