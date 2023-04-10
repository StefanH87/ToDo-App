//---------------State------------------------------//
const state = {
  filter: all,
  toDos: [
    { description: "Learn HTML", done: true },
    { description: "Learn CSS", done: false },
    { description: "Learn Javascript", done: false },
  ],
};
//---------------State------------------------------//
//                                               //
//----------------------local Storage --------//
const updateState = () => {
  localStorage.setItem("todoAppList", JSON.stringify(state));
};
const loadState = () => {
  return JSON.parse(localStorage.getItem("todoAppList"));
};

//----------------------local Storage - End------//

const addTodoBtn = document.querySelector("#add_button");
const removeBtn = document.querySelector("#remove_button");
const toDoNewTxt = document.querySelector("#listInput");

//--------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

function renderTodos() {
  const toDoList = document.querySelector("#todo_list");
  toDoList.innerHTML = "";

  state.toDos.forEach((todo) => {
    const renderTodosElement = document.createElement("li"); // erstellt neues LI Element

    renderTodosElement.todoObj = todo; // gibt dem Element neue Eigenschaften, für später

    // erstellt neues Input Element
    const checkbox = document.createElement("input");
    // bestimt input type
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    // wird im HTML eingebunden
    renderTodosElement.appendChild(checkbox);

    // erstellt toDo text
    const todoText = document.createTextNode(todo.description);
    renderTodosElement.append(todoText); // bindet ihn ein

    toDoList.appendChild(renderTodosElement);
  });
}

renderTodos();

// zentraler Eventlistener---------aktualisiert und rendert den State-------------------------------//
const toDoList = document.querySelector("#todo_list");
toDoList.addEventListener("change", (e) => {
  //   console.log(e.target.parentElement.todoObj);

  const checkbox = e.target; // element ist chekcbox, da nur es einen change empfangen kann
  const ListElement = checkbox.parentElement; //spircht List Element mit an
  const todo = ListElement.todoObj;

  todo.done = checkbox.checked;
  console.log(state);
});

// zentraler Eventlistener---------aktualisiert und rendert den State-------------------------------//

addTodoBtn.addEventListener("click", function () {
  const ul = document.getElementById("todo_list");
  const newLi = document.createElement("li");

  newLi.appendChild(liText);

  ul.appendChild(newLi);
});

removeBtn.addEventListener("click", function () {
  const ul = document.getElementById("todo_list");
  ul.innerText = "";
});
