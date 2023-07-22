import { useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";

const arrayOfTodos = [
  // {
  // title: "Learn JavaScript",
  //   completed: false,
  //   id: Math.random().toString(),
  // },
  // {
  // title: "Learn React",
  //   completed: true,
  //   id: Math.random().toString(),
  // },
  // {
  // title: "Learn TypeScript",
  // completed: false,
  //   id: Math.random().toString(),
  // },
];

function App() {
  const [todoElement, setTodoElement] = useState("");
  const [todos, setTodos] = useState([]);
  const [isFormShow, setIsFormShow] = useState(false);
  const [isFormShow2, setIsFormShow2] = useState(false);
  const hadleInputChange = (e) => {
    setTodoElement(e.target.value);
  };

  const addTodos = () => {
    if (todoElement === "") {
      return alert("Эй братишке толтуур!");
    }
    setTodos([...todos, todoElement]);
    setTodoElement("");
  };
  const [indexFromMap, setIndexFromMap] = useState();
  const onDeleteTodo = (indexFromMap) => {
    setIsFormShow(true);
    setIndexFromMap(indexFromMap);
  };

  const onYes = () => {
    setIsFormShow2(true);
  };

  const onYes2 = () => {
    const filteredTodos = todos.filter((_, index) => {
      if (index !== indexFromMap) {
        return true;
      }
    });
    setTodos(filteredTodos);
    setIsFormShow(false);
    setIsFormShow2(false);
  };

  // useEffect(() => {
  //   async function getPosts() {
  //     try {
  //       const response = await fetch(
  //         "https://jsonplaceholder.typicode.com/users"
  //       );
  //       const result = await response.json();
  //       console.log(result);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getPosts();
  // }, [todos]);

  return (
    <div className="App">
      <header>
        <h1> Аткарылчу иштердин-тизмеси</h1>
      </header>
      <main>
        <form>
          <input type="text" onChange={hadleInputChange} value={todoElement} />
          <button type="button" onClick={addTodos}>
            Кошуу
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              <button onClick={() => onDeleteTodo(index)}>Очуруу</button>
            </li>
          ))}
        </ul>
        {isFormShow &&
          ReactDOM.createPortal(
            <div className="backdrop" onClick={() => setIsFormShow(false)}>
              <div onClick={(event) => event.stopPropagation()}>
                <h4>Сен чын эле ушул тапшарманы очургун келип жатабы?</h4>
                <button onClick={() => setIsFormShow(false)}>Жок</button>
                <button onClick={onYes}>Ооба</button>
                <input type="text" />
                {isFormShow2 && (
                  <div className="backdrop">
                    <div>
                      <h4>
                        Жакшылап ойлонуп корунузчу. Сиз чын эле ушул тапшырманы очургунуз келип жатабы?
                      </h4>
                      <button
                        onClick={() => {
                          setIsFormShow(false);
                          setIsFormShow2(false);
                        }}
                      >
                        Жок
                      </button>
                      <button onClick={onYes2}>Ооба</button>
                    </div>
                  </div>
                )}
              </div>
            </div>,
            document.getElementById("modals")
          )}
      </main>
    </div>
  );
}

export default App;
