const form = document.querySelector("#input_form");

const addTodoBtn = document.querySelector("#add_button");
const removeBtn = document.querySelector("#remove_button");
const toDoNewTxt = document.querySelector("#listInput");

//---------------------------------------------------//

//---------------------------------------------------//

const toDos = ["lars"];

function addList() {
  let listElement = toDos.map((todo) => `<li>${todo}</li>`).join(`\n`);
  document.getElementById("todo_list").innerHTML = listElement;
}
addTodoBtn.addEventListener("click", () => {
  toDos.push(toDoNewTxt.value);
  toDoNewTxt.value = "";
  addList();
});

console.log(toDos);
