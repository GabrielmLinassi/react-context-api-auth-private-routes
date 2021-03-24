import { useState } from "react";
import {
  addTodo,
  clearAll,
  removeTodo,
  useTodoContext,
} from "../../contexts/TodoContext";

export const NewItem = () => {
  const [text, setText] = useState("");
  const { dispatch } = useTodoContext();

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => dispatch(addTodo(text))}>Add</button>
    </div>
  );
};

export const ItemList = () => {
  const { items, dispatch } = useTodoContext();

  return (
    <div>
      {items.map(({ id, text }) => (
        <Item key={id} id={id} text={text} dispatch={dispatch} />
      ))}
      <button onClick={() => dispatch(clearAll())}>Clear All</button>
    </div>
  );
};

const Item = ({ id, text, dispatch }) => {
  return (
    <div>
      <span>{text}</span>
      <button onClick={() => dispatch(removeTodo(id))}>Done</button>
    </div>
  );
};
