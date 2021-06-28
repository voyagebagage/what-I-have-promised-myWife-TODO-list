import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt, faListAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrashAlt, faListAlt);

function App() {
  const [list, setList] = useState([]);
  const [textInput, setTextInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // setList(textInput);

    const newPromiseAdd = [...list];
    newPromiseAdd.push({
      id: Math.round(Math.random() * 1000),
      value: textInput,
      haveBeenDoneYet: false,
    });
    setList(newPromiseAdd);
    setTextInput("");
  };
  const handleCheck = (index) => {
    const newPromiseCheck = [...list];
    let i;
    newPromiseCheck[index].haveBeenDoneYet =
      !newPromiseCheck[index].haveBeenDoneYet;

    if (newPromiseCheck[index].haveBeenDoneYet) {
      const itemToGoLast = newPromiseCheck.splice(index, 1);
      newPromiseCheck.push(itemToGoLast[0]);
    }

    if (!newPromiseCheck[index].haveBeenDoneYet) {
      const itemToGoLast = newPromiseCheck.splice(index, 1);
      // newPromiseCheck.unshift(itemToGoLast[0]);
      // if (newPromiseCheck[0].haveBeenDoneYet) {
      newPromiseCheck.unshift(itemToGoLast[0]);
    }
    //   newPromiseCheck.splice(1, 0, itemToGoLast[0]);
    // }
    setList(newPromiseCheck);
  };
  const handleClickDelete = (index) => {
    const newPromiseDelete = [...list];
    newPromiseDelete.splice(index, 1);
    setList(newPromiseDelete);
  };

  return (
    <div className="container">
      <div className="list-container">
        {list.map((promise, index) => {
          return (
            <ul key={promise.id}>
              <li>
                <span>
                  <input type="checkbox" onChange={() => handleCheck(index)} />
                </span>
                <span
                  className={
                    promise.haveBeenDoneYet
                      ? "successful-promise"
                      : "have-not-been-done-yet"
                  }
                >
                  &nbsp;{promise.value}&nbsp;
                </span>
                <span onClick={() => handleClickDelete(index)}>
                  &nbsp;&nbsp;
                  <FontAwesomeIcon icon="trash-alt" />
                </span>
              </li>
            </ul>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          className="text-input"
          type="text"
          value={textInput}
          autoFocus
          placeholder="I promised my wife to ?"
          onChange={(e) => setTextInput(e.target.value)}
        />
        <input className="add-button" type="submit" value="add promise" />
      </form>
    </div>
  );
}

export default App;
