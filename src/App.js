import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt, faListAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrashAlt, faListAlt);

function App() {
  const [list, setList] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [count, setCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPromiseAdd = [...list];

    const arrNotDone = list.filter(
      (elemNotDone) => elemNotDone.haveBeenDoneYet !== true
    );
    const arrDone = list.filter(
      (elemDone) => elemDone.haveBeenDoneYet !== false
    );

    if (arrDone.length === 0) {
      console.log("----1------");
      newPromiseAdd.push({
        id: Math.round(Math.random() * 1000),
        value: textInput,
        haveBeenDoneYet: false,
        remove: false,
      });
      setList(newPromiseAdd);
      setCount(list.length);

      setTextInput("");
    }

    if (arrDone.length !== 0) {
      console.log("----2------");
      arrNotDone.push({
        id: Math.round(Math.random() * 1000),
        value: textInput,
        haveBeenDoneYet: false,
        adding: true,
        remove: false,
      });
      const newArr = [...arrNotDone, ...arrDone];
      setList(newArr);
      setCount(list.length);

      setTextInput("");
    }
  };

  const handleCheck = (index) => {
    const newPromiseCheck = [...list];
    newPromiseCheck[index].haveBeenDoneYet =
      !newPromiseCheck[index].haveBeenDoneYet;
    const arrNotDone = list.filter(
      (elemNotDone) => elemNotDone.haveBeenDoneYet !== true
    );
    const arrDone = list.filter(
      (elemDone) => elemDone.haveBeenDoneYet !== false
    );

    if (newPromiseCheck[index].haveBeenDoneYet) {
      const itemToGoLast = newPromiseCheck.splice(index, 1);
      newPromiseCheck.push(itemToGoLast[0]);
      return setList(newPromiseCheck);
    }

    if (!newPromiseCheck[index].haveBeenDoneYet) {
      const itemToGoLast = newPromiseCheck.splice(index, 1);
      arrDone.filter((elem) => elem !== itemToGoLast[0]);
      arrNotDone.pop();
      const newPromiseCheckUncheck = [];
      newPromiseCheckUncheck.push(...arrNotDone, itemToGoLast[0], ...arrDone);
      return setList(newPromiseCheckUncheck);
    }
  };
  const handleClickDelete = (index) => {
    const newPromiseDelete = [...list];
    newPromiseDelete[index].remove = true;
    console.log(newPromiseDelete[index]);

    newPromiseDelete.splice(index, 1);
    setCount(list.length);

    console.log(newPromiseDelete);
    setList(newPromiseDelete);
  };

  return (
    <div className="container">
      <div className="list-container">
        {list.map((promise, index) => {
          console.log("index", index);
          console.log("count", count);
          // setCount(list.length);
          // if (count > list.length) {
          //   console.log("coucouc");
          // }
          return (
            <ul
              key={promise.id}
              className={
                promise.haveBeenDoneYet
                  ? "successful-promise"
                  : list.length < count
                  ? "remove"
                  : "have-not-been-done-yet"
                // : ""
              }
            >
              {console.log(
                "---------------",
                promise.haveBeenDoneYet,
                "yet",
                promise.remove,
                "remove",
                promise.adding,
                "add"
              )}

              <li>
                <span>
                  <input
                    type="checkbox"
                    // className="fade-down"
                    onChange={() => handleCheck(index)}
                  />
                </span>
                <span>&nbsp;{promise.value}&nbsp;</span>
                <span onClick={() => handleClickDelete(index)}>
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
