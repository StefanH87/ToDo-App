const state = {
  Nidoking: "all",
  todos: [],
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
  // console.log(state.todos.includes(formTextValue.value));

  // console.log(formTextValue.value);
  // console.log(state.todos);

  if (
    state.todos.some(
      (todo) =>
        todo.description.toLowerCase() === formTextValue.value.toLowerCase()
    )
  ) {
    window.alert("todo existiert bereits");
  } else {
    addNewTodo();

    renderHtml();
  }

  // addNewTodo();

  // renderHtml();
});

function renderHtml(newFilterArray) {
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

renderHtml();

//===================================================//
//check keine doppelten Todos

// function checkDuplicateTodos() {
//   for (let description of state.todos) {
//     if (formTextValue.value === state.todos.description) {
//       console.log("Zwilling");
//     } else {
//       console.log("alles cool");
//     }
//   }
//   console.log(checkDuplicateTodos);
// }
// console.log(checkDuplicateTodos);
//==============================================//

//Delete
//=====================================================================//

const deleteBtn = document.getElementById("remove_button");

deleteBtn.addEventListener("click", (event) => {
  deleteTodo();
  renderHtml();
});

function deleteTodo() {
  let todoIndexArr = state.todos.filter((todo) => todo.done === false);
  state.todos = todoIndexArr;
  updateState();
}

//==================================================//

const radiosFilterForm = document.getElementById("filter_and_options");

radiosFilterForm.addEventListener("change", (event) => {
  const radioValue = event.target.value;
  switch (radioValue) {
    case "all":
      renderHtml();

      break;
    case "open":
      renderHtml(state.todos.filter((todo) => todo.done === false));

      break;
    case "done":
      renderHtml(state.todos.filter((todo) => todo.done === true));

      break;
    default:
      return;
  }
});
