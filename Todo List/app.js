const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");
const addBtn = document.querySelector("#add-btn");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const taskContent = inputBox.value.trim();
  if(taskContent === '') {
    alert("You must write something!");
  }
  else {
    let li = document.createElement("li");
    li.textContent = taskContent;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.textContent = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = '';
  saveData();
});

listContainer.addEventListener("click", (e) => {
  if(e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
  else if(e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});


const saveData = () => {
  localStorage.setItem("data", listContainer.innerHTML);
}

const showTask = (() => {
  listContainer.innerHTML = localStorage.getItem("data");
})();