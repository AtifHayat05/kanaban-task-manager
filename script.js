let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("progress").innerHTML = "";
  document.getElementById("done").innerHTML = "";

  tasks.forEach((task) => {
    const card = document.createElement("div");

    card.classList.add("task");

    card.draggable = true;

    card.innerHTML = `
            <p>${task.text}</p>
            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

    card.addEventListener("dragstart", () => {
      card.classList.add("dragging");
    });

    card.dataset.id = task.id;

    document.getElementById(task.status).appendChild(card);
  });

  saveTasks();
}

function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value.trim() === "") return;

  tasks.push({
    id: Date.now(),
    text: input.value,
    status: "todo",
  });

  input.value = "";

  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  renderTasks();
}

document.querySelectorAll(".task-list").forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    const taskId = document.querySelector(".dragging").dataset.id;

    tasks.forEach((task) => {
      if (task.id == taskId) {
        task.status = column.id;
      }
    });

    document.querySelector(".dragging").classList.remove("dragging");

    renderTasks();
  });
});

renderTasks();
