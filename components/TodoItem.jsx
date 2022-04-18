import { useState } from "react";
import style from '../styles/Home.module.css';

function TodoItem({ todo, update }) {

  const [edit, setEdit] = useState(false);
  const [newTodo, setNewTodo] = useState(todo.attributes.item);

  function changeTodo(e) {
    e.preventDefault();
    let item = newTodo;
    let pos = todo.id;
    let body = {
      data: {
        item
      }
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND}api/todos/${pos}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(() => {
        setEdit(false);
        update();
      })
  }

  function deleteTodo(e) {
    e.preventDefault();
    let pos = todo.id;
  
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}api/todos/${pos}`, {
      method: "DELETE"
    })
      .then(() => {
        update();
      })
  }

  return <div className={style.todo}>
    { !edit
        ? <div className={style.name}>{todo.attributes.item}</div>
        : <form onSubmit={changeTodo}>
            <input className={style.todo_input} type="text" placeholder="Enter new todo" value={newTodo} onChange={e => setNewTodo(e.currentTarget.value)} />
            <button className={style.todo_button} type="submit">Change todo</button>
          </form>
    }
    <div>
      <button className={style.delete} onClick={deleteTodo}>delete</button>
      <button className={style.edit} onClick={() => setEdit(!edit)}>edit</button>
    </div>
  </div>
}

export default TodoItem;