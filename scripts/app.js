const taskContainerEl = document.querySelector(".task-list-ctn");
const taskOpSection = document.querySelector(".task-list-status");
const taskCountEl = document.getElementById("task-count");
const allBtn = document.querySelector(".task-all");
const activeBtn = document.querySelector(".task-active");
const completedBtn = document.querySelector(".task-completed");
const clearBtn = document.querySelector(".task-clear");
let taskArr = [];

document.addEventListener("keydown", function (e) {
  if (e.key == "Enter" && e.target.id === "user-input") {
    const userInput = e.target.value;
    console.log(userInput);
    createTask(userInput);
  }
});

function updateTaskStatus() {
  const taskListItemEl = document.querySelectorAll(".task-list-item");
  // console.log(taskListItemEl);
  let activetaskCount = 0;
  taskListItemEl.forEach((task) => {
    if (task.classList.contains("active")) activetaskCount++;
  });
  taskCountEl.textContent = activetaskCount;
}

function updateTask(ev) {
  const targetEl = ev.target;
  let divEl;

  if (targetEl.classList.contains("task-list-item")) {
    divEl = targetEl;
  } else {
    divEl = targetEl.parentElement;
  }

  if (divEl.classList.contains("active")) {
    divEl.classList.remove("active");
    divEl.classList.add("finished");
    const taskListIconEl = divEl.querySelector(".task-list-icon");
    taskListIconEl.innerHTML =
      '<img src="images/icon-check.svg" alt="icon-check"/>';
  } else {
    divEl.classList.remove("finished");
    divEl.classList.add("active");
    const taskListIconEl = divEl.querySelector(".task-list-icon");
    taskListIconEl.innerHTML = "";
  }
}

function createTask(taskInfo) {
  const taskListContainerEl = document.querySelector(".task-list-ctn");
  const divEl = document.createElement("div");
  divEl.classList.add("task-list-item", "active");
  divEl.addEventListener("click", updateTask);
  divEl.addEventListener("click", updateTaskStatus);

  const paraEl = document.createElement("p");
  paraEl.classList.add("task-list-icon");
  const anotherParaEl = document.createElement("p");
  anotherParaEl.classList.add("task-list-content");

  anotherParaEl.textContent = taskInfo;

  divEl.appendChild(paraEl);
  divEl.appendChild(anotherParaEl);
  taskListContainerEl.appendChild(divEl);

  //reseting the value
  document.querySelector("#user-input").value = "";
  taskArr.push(divEl);
  // allTasks = document.querySelectorAll(".task-list-item");
  updateTaskStatus();
  // rebuildTailwind();
}

function displayAllTasks() {
  // const allTasks = document.querySelectorAll(".task-list-item");

  taskContainerEl.innerHTML = "";
  console.log("Inside displayAllTasks: ", taskArr);
  taskArr.forEach((task) => {
    taskContainerEl.appendChild(task);
  });
}

function displayActiveTasks() {
  // const allTasks = document.querySelectorAll(".task-list-item");
  taskContainerEl.innerHTML = "";
  console.log("Inside displayActiveTasks", taskArr);
  taskArr.forEach((task) => {
    if (task.classList.contains("active")) taskContainerEl.appendChild(task);
  });
}

function displayCompletedTasks() {
  // const allTasks = document.querySelectorAll(".task-list-item");
  taskContainerEl.innerHTML = "";
  console.log("Inside displayCompletedTasks ", taskArr);
  taskArr.forEach((task) => {
    if (task.classList.contains("finished")) taskContainerEl.appendChild(task);
  });
}

function clearTasks() {
  // const alltask = document.querySelectorAll(".task-list-item");
  taskContainerEl.innerHTML = "";
  const activeTask = taskArr.filter((task) =>
    task.classList.contains("active")
  );
  taskArr = activeTask;
  activeTask.forEach((task) => {
    taskContainerEl.appendChild(task);
  });
  // displayAllTasks();
}

allBtn.addEventListener("click", displayAllTasks);
activeBtn.addEventListener("click", displayActiveTasks);
completedBtn.addEventListener("click", displayCompletedTasks);
clearBtn.addEventListener("click", clearTasks);

/*
const { exec } = require("child_process");

function rebuildTailwind() {
  exec(
    "npx tailwindcss build -o path/to/output.css",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Tailwind CSS recompiled: ${stdout}`);
    }
  );
}
*/
