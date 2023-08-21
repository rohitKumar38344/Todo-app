const taskOpSection = document.querySelector(".task-list-status");
const taskCountEl = document.getElementById("task-count");

document.addEventListener("keydown", function (e) {
  if (e.key == "Enter" && e.target.id === "user-input") {
    const userInput = e.target.value;
    console.log(userInput);
    createTask(userInput);
  }
});

function updateTaskStatus() {
  const taskListEl = document.querySelectorAll(".task-list-item");
  // console.log(taskListEl);
  let activetaskCount = 0;
  taskListEl.forEach((task) => {
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
  const taskListEl = document.querySelector(".task-list");
  const divEl = document.createElement("div");
  divEl.classList.add("task-list-item", "active");
  divEl.addEventListener("click", updateTask);
  divEl.addEventListener("click", updateTaskStatus);

  // add image when the task is checked as child of parent div
  const imgEl = `<img src="../images/icon-check.svg" alt="" class="w-full" />`;
  const paraEl = document.createElement("p");
  paraEl.classList.add("task-list-icon");
  const anotherParaEl = document.createElement("p");
  anotherParaEl.classList.add("task-list-content");

  anotherParaEl.textContent = taskInfo;

  divEl.appendChild(paraEl);
  divEl.appendChild(anotherParaEl);
  taskListEl.insertBefore(divEl, taskOpSection);

  //reseting the value
  document.querySelector("#user-input").value = "";
  updateTaskStatus();
  // rebuildTailwind();
}
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
