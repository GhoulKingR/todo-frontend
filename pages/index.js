import { useRef, useState, useEffect } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  let newTodo = useRef(null);
  let todoPos = useRef(null);
  let newTodoChange = useRef(null);
  let delTodoPos = useRef(null);

  useEffect(() => {
    update();
  }, []);

  function update() {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}api/todos`)
      .then(res => res.json())
      .then(todo => {
        setTodos(todo.data);
      })
  }

  function addTodo(e) {
    e.preventDefault();
    let item = newTodo.current.value;
    let body = {
      data: {
        item
      }
    };
  
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}api/todos`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(() => {
        update();
      })
  }

  function changeTodo(e) {
    e.preventDefault();
    let item = newTodoChange.current.value;
    let pos = todoPos.current.value;
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
        update();
      })
  }

  function deleteTodo(e) {
    e.preventDefault();
    let pos = delTodoPos.current.value;
  
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}api/todos/${pos}`, {
      method: "DELETE"
    })
      .then(() => {
        update();
      })
  }

  return (
    <div>
      <main>
        <form onSubmit={addTodo}>
          <input type="text" placeholder="Enter new todo" ref={newTodo}/>
          <button type="submit">Add todo</button>
        </form>

        <ul>
          {
            todos.map((todo, i) => {
              return <li key={i}>{todo.attributes.item}</li>
            })
          }
        </ul>

        <form onSubmit={changeTodo}>
          <select ref={todoPos}>
            {
              todos.map((todo, i) => {
                return <option key={i} value={todo.id}>{i + 1}</option>
              })
            }
          </select>
          <input type="text" placeholder="Enter new todo" ref={newTodoChange} />
          <button type="submit">Change todo</button>
        </form>

        <form onSubmit={deleteTodo}>
          <select ref={delTodoPos}>
            {
              todos.map((todo, i) => {
                return <option key={i} value={todo.id}>{i + 1}</option>
              })
            }
          </select>
          <button type="submit">Delete todo</button>
        </form>
      </main>
    </div>
  )
}
