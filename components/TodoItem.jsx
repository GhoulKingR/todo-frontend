import { useState } from "react";


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

  return <div>
    { !edit
        ? <div>{todo.attributes.item}</div>
        : <form onSubmit={changeTodo}>
            <input type="text" placeholder="Enter new todo" value={newTodo} onChange={e => setNewTodo(e.currentTarget.value)} />
            <button type="submit">Change todo</button>
          </form>
    }
    <div>
      <button onClick={() => setEdit(!edit)}>edit</button>
      <button onClick={deleteTodo}>delete</button>
    </div>
  </div>
}

export default TodoItem;