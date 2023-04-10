const state = {
  filter: all,
  todos: [
    // {
    //   id: 1,
    //   description: "Learn HTML",
    //   done: false,
    // },
  ],
};

//mitmform neues HTMLElement ertellen - zutodo

//render todo
//li - input checkbox -text

//==========================================================//

function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(state.todos)); //
}

const loadState = () => {
  return JSON.parse(localStorage.getItem("todoAppList"));
};

//==========================================================//
//  ToDo Item erstellen
//=========================================================//

function renderElement(description, id, done) {
  //erzeuge Li lement

  const newLi = document.createElement("li");
  newLi.id = id;

  //style li  - in CSS als Klasse angeben
  //   newLi.classList.add(".todo-item");

  // input type erzeugen und als checkbox zuordnen
  const newCheckBox = document.createElement("input");
  newCheckBox.type = "checkbox";
  if (done) {
    newCheckBox.checked = true;
  }
  //erzeuge Textnode
  const todoText = document.createTextNode(description);
  //------------wenn checkboc true -- durchgstrichen-----//

  newCheckBox.addEventListener("change", () => {
    newLi.classList.toggle("strike");

    // Search for  the To Do task that was click
    let foundToDo = state.todos.find((todo) => todo.id === parseInt(newLi.id));
    if (foundToDo != null) {
      foundToDo.done = !foundToDo.done;
    }
    updateLocalStorage();
  });

  //   if (done) {
  //     newCheckBox.checked = true; // funktioniert nicht
  //   }

  //setze alles zusammen

  newLi.append(newCheckBox, todoText);
  //   newLi.appendChild(newCheckBox);  // nur Append ist kürzer
  //   newLi.appendChild(todoText);

  return newLi;
}

console.log(renderElement("Learn HTML"));
console.log(renderElement("Learn HTML").textContent);

//-------------------------------//

function addNewTodo() {
  //
  //
  //zugriff auf das Form / value.input field
  const formTextValue = document.getElementById("listInput");
  //   console.log(formTextValue.value); // testen ob der richtige Werte genommen wurde
  // tolidt ul elemnt
  const todoUl = document.getElementById("todo_list");

  state.todos.push({
    id: +new Date(), //generiert unique ID
    description: formTextValue.value,
    done: false,
  });

  //   const newTodoElement = renderElement(formTextValue.value);
  //textfield leeren
  //-----------------------------------------//
  //   formTextValue.value = "";
  event.target.reset();

  // append newTodoElement to do lis ul element
  //   todoUl.append(newTodoElement);
}

//submit form to add todo

const addButton = document.getElementById("add_button_form");

addButton.addEventListener("submit", (event) => {
  event.preventDefault(); // verhindert absenden und neuladen des Form/HTMl dokuments
  addNewTodo(); // update den State
  updateLocalStorage();
  render();
}); // eventbinding, ohne Klammern sonst würde funktion nur einmal ausgeführt werden

function render() {
  const todoUl = document.getElementById("todo_list");
  todoUl.innerHTML = "";
  for (let todo of state.todos) {
    const newTodoElement = renderElement(todo.description);
    todoUl.append(newTodoElement);
  }
}
render();

//radios

// const radiosFilterForm = document.getElementById("filter_and_options");

// radiosFilterForm.addEventListener("change", (event) => {
//   const radioValue = event.target.value;
//   switch (radioValue) {
//     case "all":
//       render(state.todos);
//       break;
//     case "open":
//       render(state.todos.filter((t) => t.done === false));
//       break;
//     case "done":
//       render(state.todos.filter((t) => t.done === true));
//       break;
//     default:
//       return;
//   }
// });

// filter

const checkedElement = state.todos.filter(function (e) {
  console.log(e.done);
});
function checkState() {
  for (const done of state.todos) {
    console.log(done);
    if (done === true) {
      console.log("es ist wahr");
    } else {
      console.log("nicht wahr");
    }
  }
}
checkState();
