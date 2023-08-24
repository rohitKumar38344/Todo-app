const taskContainerEl = document.querySelector(".task-list-ctn");
const taskOpSection = document.querySelector(".task-list-status");
const taskCountEl = document.getElementById("task-count");
const allBtn = document.querySelector(".task-all");
const activeBtn = document.querySelector(".task-active");
const completedBtn = document.querySelector(".task-completed");
const clearBtn = document.querySelector(".task-clear");
let taskArr = [];
let taskIdCount = 0;
let currentView = "all";

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

  updateTaskStatus();
}

function createTask(taskInfo) {
  const taskListContainerEl = document.querySelector(".task-list-ctn");
  const divEl = document.createElement("div");
  divEl.classList.add("task-list-item", "active");
  divEl.setAttribute("draggable", "true");
  divEl.setAttribute("id", `${++taskIdCount}`);
  divEl.addEventListener("click", updateTask);
  // divEl.addEventListener("click", deleteTask);

  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", "images/icon-cross.svg");
  imgEl.setAttribute("alt", "delete icon");
  imgEl.setAttribute("class", "cross-icon");
  imgEl.addEventListener("click", deleteTask);

  const paraEl = document.createElement("p");
  paraEl.classList.add("task-list-icon");
  const anotherParaEl = document.createElement("p");
  anotherParaEl.classList.add("task-list-content");

  anotherParaEl.textContent = taskInfo;

  divEl.appendChild(paraEl);
  divEl.appendChild(anotherParaEl);
  divEl.appendChild(imgEl);
  taskListContainerEl.appendChild(divEl);

  //reseting the value
  document.querySelector("#user-input").value = "";
  taskArr.push(divEl);

  updateTaskStatus();
  setUpDragAndDrop(divEl);
}

function deleteTask(e) {
  if (e.target && e.target.classList.contains("cross-icon")) {
    const task = e.target.closest(".task-list-item");

    if (task) {
      task.remove(); // Or perform your delete logic
      console.log("delete task: ", task);

      const removeTaskId = task.id;
      for (let index = 0; index < taskArr.length; index++) {
        const element = taskArr[index];
        if (element.id === removeTaskId) {
          console.log("el removing in ask arr: ", element);
          console.log("before removing el from arr: ", taskArr);
          taskArr.splice(index, 1);
          console.log("after removing el from arr new arr: ", taskArr);
        }
      }

      switch (currentView) {
        case "all":
          displayAllTasks();
          break;
        case "active":
          displayActiveTasks();
          break;
        default:
          displayCompletedTasks();
          break;
      }
      updateTaskStatus();
    } else {
      console.log("No such task exists.");
    }
  } else {
    return;
  }
  e.stopPropagation();
}

function displayAllTasks(e) {
  currentView = "all";
  taskContainerEl.innerHTML = "";
  taskArr.forEach((task) => {
    taskContainerEl.appendChild(task);
  });
}

function displayActiveTasks(e) {
  currentView = "active";
  taskContainerEl.innerHTML = "";

  taskArr.forEach((task) => {
    if (task.classList.contains("active")) taskContainerEl.appendChild(task);
  });
}

function displayCompletedTasks(e) {
  currentView = "completed";
  taskContainerEl.innerHTML = "";

  taskArr.forEach((task) => {
    if (task.classList.contains("finished")) taskContainerEl.appendChild(task);
  });
}

function clearTasks(e) {
  e.target.classList.toggle("highlight");
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

let dragSrcElement = null;
function setUpDragAndDrop(task) {
  task.addEventListener("dragstart", handleDragStart, false);
  task.addEventListener("dragover", handleDragOver, false);
  task.addEventListener("drop", handleDrop, false);
}

function handleDragStart(e) {
  dragSrcElement = this;
  console.log(this);
  console.log(this.innerHTML);
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = "move";
  return false;
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); // Stops the browser from redirecting.
  }
  const destClasses = dragSrcElement.classList;
  const srcClasses = this.classList;
  const destClassToMove = destClasses[1];
  const srcClassToMove = srcClasses[1];

  const data = e.dataTransfer.getData("text/html");
  console.log("data transfered: ", data);
  if (dragSrcElement !== this) {
    dragSrcElement.innerHTML = this.innerHTML;
    this.innerHTML = data;
    // if both the classes are same then, we don't need to exchange classes
    if (destClassToMove !== srcClassToMove) {
      this.classList.remove(srcClassToMove);
      this.classList.add(destClassToMove);
      dragSrcElement.classList.remove(destClassToMove);
      dragSrcElement.classList.add(srcClassToMove);
    }
  }
  return false;
}
