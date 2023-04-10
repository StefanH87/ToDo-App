const state = {
  todos: [
    {
      description: "Learn HTMl",
      done: true,
    },
    {
      description: "Learn CSS",
      done: true,
    },
  ],
};

function renderTodos() {
  const list = document.getElementById("todo_list");
  list.innerHTML = "";

  state.todos.forEach((todo) => {
    const newTodoLi = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    newTodoLi.appendChild(checkbox);
    const todoText = document.createTextNode(todo.description);
    newTodoLi.append(todoText);

    list.appendChild(newTodoLi);
  });
}

renderTodos();

const addButton = document.getElementById("add_button_form");
addButton.addEventListener("submit", (event) => {
  event.preventDefault();
  renderTodos();
});
