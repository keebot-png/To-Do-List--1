/* eslint-disable */
import _ from 'lodash';
import './style.css';

const taskInput = document.querySelector('.newtask input');
// Retrieving local storage todo-list
let toDo = JSON.parse(localStorage.getItem("todo-list"));
const taskAdd = document.getElementById('tasks');
let editId;
let isEditTask = false;

 showToDo = () => {
    let li = "";
    if(toDo){
        toDo.forEach((element, id) => {
            // if toDo completed is true, set the isCompleted value to checked.
            let isCompleted = element.completed == "true" ? "checked" : "";
            li +=  `<li class="task">
            <label for="${id}">
                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                <p class="${isCompleted}">${element.description}</p>
            </label>
            <div class="settings">
            <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                <ul class="task-menu">
                    <li onclick="editTask(${id}, '${element.description}')"><i class="fa-sharp fa-solid fa-pencil"></i>Edit</li>
                    <li onclick="deleteTask(${id})"><i class="fa-solid fa-trash"></i>Delete</li>
                </ul>
            </div>
        </li>`;
        });
    }
    taskAdd.innerHTML = li;
}
showToDo();

editTask = (taskId, taskDescription) => {
    editId = taskId;
    isEditTask = true;
    taskInput.value = taskDescription;
}

deleteTask = (deleted) => {
    // removing selected task from array
    toDo.splice(deleted, 1);
    localStorage.setItem("todo-list", JSON.stringify(toDo));
    showToDo();
}

showMenu = (selectedTask) => {
    // getting task menu ul
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        // removing show class from the task menu on the document click
        if(e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    })
}

updateStatus = (selectedTask) => {
    // getting paragraph that contains task description
    let taskName = selectedTask.parentElement.lastElementChild;
        if(selectedTask.checked){
            taskName.classList.add("checked");
            // updating completed to true when selected
            toDo[selectedTask.id].completed = "true";
        } else {
            taskName.classList.remove("true");
            taskName.classList.remove("checked");
           // updating completed to false when selected
            toDo[selectedTask.id] = "false";
        }
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
        if (!isEditTask){
            if (!toDo){  // if toDo doesnt exist then assign an empty array
                toDo = [];
            }
            let taskInfo = {description: userTask, completed: "false"};
            toDo.push(taskInfo); //adding new task to todos
        } else {
            isEditTask = true;
            toDo[editId].description = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(toDo));
        showToDo();
    }
})
