const state = {
  filter: all,
  todos: [
    {
      id: 1,
      description: "Learn HTML",
      done: true,
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
    description: formTextValue.value,
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
});

function render() {
  todoUl.innerHTML = "";
  for (let todo of state.todos) {
    const newTodoElement = renderElement(todo);
    todoUl.append(newTodoElement);
  }
}
render();

// filter--WIP
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
