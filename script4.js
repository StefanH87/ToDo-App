const state = {
  filter: all,
  todos: [
    {
      id: 1,
      description: "Learn HTML",
      done: false,
    },
    {
      id: 2,
      description: "Learn CSS",
      done: false,
    },
  ],
};

//==========================================================//
const addButton = document.getElementById("add_button_form");
const todoUl = document.getElementById("todo_list");
const formTextValue = document.getElementById("listInput");
//==========================================================//
const updateState = () => {
  localStorage.setItem("todoAppList", JSON.stringify(state));
};
const loadState = () => {
  return JSON.parse(localStorage.getItem("todoAppList"));
};

//  ToDo Item erstellen
//=========================================================//

// const list = document.getElementById("todo_list");
// list.innerHTML = "";
const form = document.getElementById("filter_and_options");
form.addEventListener("click", (event) => {
  event.preventDefault();
});

function renderElement(todo) {
  const newLi = document.createElement("li");
  const newCheckBox = document.createElement("input");
  newCheckBox.type = "checkbox";
  newCheckBox.checked = todo.done;

  const todoText = document.createTextNode(todo.description);
  //------------wenn checkboc true -- durchgstrichen-----//
  newCheckBox.addEventListener("change", (e) => {
    newLi.classList.toggle("strike");
    // newCheckBox.checked = true;
    todo.done = newCheckBox.checked;
    console.log(todo);
  });

  newLi.append(newCheckBox, todoText);

  return newLi;
}

//===================================================//
// zum State pushen
function addNewTodo() {
  state.todos.push({
    id: +new Date(),
    description: formTextValue.value.trim(), // am ende und anfang Leerzeichen entfernen
    done: false,
  });

  event.target.reset();
}

//===================================================//
//verhindern senden und reload des HTML Form, Update State, Eventbinding
addButton.addEventListener("submit", (event) => {
  event.preventDefault();
  addNewTodo();

  render();
  updateState();
});

function render() {
  todoUl.innerHTML = "";

  for (let todo of state.todos) {
    const newTodoElement = renderElement(todo);
    todoUl.append(newTodoElement);
  }
}
render();

//===================================================//
//check keine doppelten Todos

function checkDuplicateTodos() {
  for (let description of state.todos) {
    if (input === description) {
      console.log("Zwilling");
    } else {
      console.log("alles cool");
    }
  }
  return;
}

//==============================================//

//Delete
//=====================================================================//

const deleteBtn = document.getElementById("remove_button");

deleteBtn.addEventListener("click", (event) => {
  console.log("huhuh");

  deleteTodo();
  render();
});

// function deleteTodo() {
//   let todoIndex = state.todos.findIndex((todo) => todo.done === true);
//   let todoDone = todoIndex;
//   console.log("position" + todoDone);
//   state.todos.splice(todoDone, -1);
// }
// // function deleteTodo() {
// //   let todoIndex = state.findIndex((e) => e.done === true);
// //   // let todoZustand = todoIndex;
// //   console.log(todoIndex);
// // }

function deleteTodo() {
  let todoIndex = state.todos.filter((todo) => todo.done === true);
  let Zustand = todoIndex;
  render();
  console.log(Zustand);
}

//==================================================//

const radiosFilterForm = document.getElementById("filter_and_options");

radiosFilterForm.addEventListener("change", (event) => {
  const radioValue = event.target.value;
  switch (radioValue) {
    case "all":
      render(state.todos);
      break;
    case "open":
      render(state.todos.filter((todo) => todo.done === false));
      break;
    case "done":
      render(state.todos.filter((todo) => todo.done === true));
      break;
    default:
      return;
  }
  console.log(radioValue);
  render();
});

// filter--WIP
// const checkedElement = state.todos.filter(function (e) {
//   console.log(e.done);
// });

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
