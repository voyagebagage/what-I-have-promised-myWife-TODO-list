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
    //adding
    e.preventDefault();
    const newPromiseAdd = [...list]; //copy my list onto a new array
    const arrNotDone = list.filter(
      //splitting the list into 2 arrays if needed, here 1st, unchecked boxes result
      (elemNotDone) => elemNotDone.haveBeenDoneYet !== true
    );
    const arrDone = list.filter(
      //here 2nd, checked boxes
      (elemDone) => elemDone.haveBeenDoneYet !== false
    );
    if (arrDone.length === 0) {
      //if nothing is checked use the very 1st array
      newPromiseAdd.push({
        id: Math.round(Math.random() * 1000),
        value: textInput,
        haveBeenDoneYet: false,
      });
      setList(newPromiseAdd); //updating
      setTextInput(""); //clearing the input field
    }
    if (arrDone.length !== 0) {
      //if any is checked push the last submission to the array of undone tasks
      arrNotDone.push({
        id: Math.round(Math.random() * 1000),
        value: textInput,
        haveBeenDoneYet: false,
        adding: true,
      });
      const newArr = [...arrNotDone, ...arrDone];
      setList(newArr); //updating
      setTextInput("");
    }
  };

  const handleCheck = (index) => {
    //updating
    const newPromiseCheck = [...list];
    newPromiseCheck[index].haveBeenDoneYet =
      !newPromiseCheck[index].haveBeenDoneYet; //check/uncheck
    //splitting again done tasks/ undone
    const arrNotDone = list.filter(
      (elemNotDone) => elemNotDone.haveBeenDoneYet !== true
    );
    const arrDone = list.filter(
      (elemDone) => elemDone.haveBeenDoneYet !== false
    );

    if (newPromiseCheck[index].haveBeenDoneYet) {
      // if we check
      const itemToGoLast = newPromiseCheck.splice(index, 1);
      newPromiseCheck.push(itemToGoLast[0]); //push the done task to the end of the list
      return setList(newPromiseCheck);
    }

    if (!newPromiseCheck[index].haveBeenDoneYet) {
      //if we uncheck, we want the elem to go down the undone tasks
      const itemToGoLast = newPromiseCheck.splice(index, 1);
      arrDone.filter((elem) => elem !== itemToGoLast[0]); //filtering to not get the elem in the list
      arrNotDone.pop(); //avoid doubles
      const newPromiseCheckUncheck = [];
      newPromiseCheckUncheck.push(...arrNotDone, itemToGoLast[0], ...arrDone); //sorting the order
      return setList(newPromiseCheckUncheck); //updating
    }
  };
  const handleClickDelete = (index) => {
    //removing
    const newPromiseDelete = [...list];
    newPromiseDelete.splice(index, 1); //spotting the elem to remove
    setList(newPromiseDelete); //updating
  };

  return (
    <fieldset className="container">
      <legend>
        <span>
          &nbsp;
          <FontAwesomeIcon
            icon="list-alt"
            style={{ color: "#5d47d3", height: 40, width: 40 }}
          />
        </span>
        &nbsp;&nbsp;What have I promised my wife ? &nbsp;
      </legend>
      <div className="list-container">
        {list.map((promise, index) => {
          return (
            <ul
              key={promise.id}
              className={
                promise.haveBeenDoneYet
                  ? "successful-promise"
                  : "have-not-been-done-yet"
              }
            >
              <li>
                <span>
                  <input type="checkbox" onChange={() => handleCheck(index)} />
                </span>
                <span>&nbsp;{promise.value}&nbsp;</span>
                <span onClick={() => handleClickDelete(index)}>
                  <FontAwesomeIcon
                    icon="trash-alt"
                    style={{ color: "#5d47d3", height: "75%" }}
                  />
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
          placeholder="  I promised my wife to ?"
          onChange={(e) => setTextInput(e.target.value)}
        />
        <input className="add-button" type="submit" value="add promise" />
      </form>
    </fieldset>
  );
}

export default App;
