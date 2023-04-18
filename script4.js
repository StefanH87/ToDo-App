const state = {
  Nidoking: "all",
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
// const form = document.getElementById("filter_and_options");
// form.addEventListener("click", (event) => {
//   event.preventDefault();
// });

function renderElement(todo) {
  const newLi = document.createElement("li");
  const newCheckBox = document.createElement("input");
  newCheckBox.type = "checkbox";
  newCheckBox.checked = todo.done;

  const todoText = document.createTextNode(todo.description);

  //------------wenn checkboc true -- durchgstrichen-----//

  newCheckBox.addEventListener("change", (e) => {
    newLi.classList.toggle("strike");

    todo.done = newCheckBox.checked;
    updateState();
    // console.log(todo);
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
  updateState();
  event.target.reset();
}

//===================================================//
//verhindern senden und reload des HTML Form, Update State, Eventbinding
addButton.addEventListener("submit", (event) => {
  event.preventDefault();
  addNewTodo();

  render();
});

// function render() {
//   todoUl.innerHTML = "";
//   state.Nidoking = loadState().Nidoking; //nicht die methode gemeint sondern dr Name des States - vorher stand Filter
//   state.todos = loadState().todos;
//   // loadState();
//   for (let todo of state.todos) {
//     const newTodoElement = renderElement(todo);
//     todoUl.append(newTodoElement);
//   }

// }
function render(newFilterArray) {
  todoUl.innerHTML = "";
  // console.log(newFilterArray);
  if (newFilterArray === undefined) {
    state.Nidoking = loadState().Nidoking; //nicht die methode gemeint sondern dr Name des States - vorher stand Filter
    state.todos = loadState().todos;
    // loadState();
    for (let todo of state.todos) {
      const newTodoElement = renderElement(todo);
      todoUl.append(newTodoElement);
    }
  } else {
    const richtigesArray = Array.from(newFilterArray);
    for (let todo of richtigesArray) {
      const newTodoElement = renderElement(todo);
      todoUl.append(newTodoElement);
    }
    // console.log(richtigesArray);
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
  deleteTodo();
  render();
});

function deleteTodo() {
  let todoIndexArr = state.todos.filter((todo) => todo.done === false);
  state.todos = todoIndexArr;
  updateState();
}

//==================================================//

const radiosFilterForm = document.getElementById("filter_and_options");

radiosFilterForm.addEventListener("change", (event) => {
  // event.preventDefault();
  // console.log(event.target.value);
  const radioValue = event.target.value;
  switch (radioValue) {
    case "all":
      render();

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

  // render();
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
