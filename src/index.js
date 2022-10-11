/* eslint-disable */
import _ from 'lodash';
import './style.css';
import ToDoList from './modules/todo.js';
import addToDo from './modules/userInter.js';
import { addLocal, loadLocal } from './modules/store.js';

const submitBtn = document.querySelector('.submit-btn');
const addingInput = document.querySelector('.add-todo');

const toDoList = new ToDoList();
const dataFromLocalStorage = loadLocal();

dataFromLocalStorage.forEach((toDoObject) => {
  const pushedLocalTask = toDoList.addNewTask(
    toDoObject.index, toDoObject.description, toDoObject.isCompleted,
  );
  addToDo(pushedLocalTask, toDoList);
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const inputValue = addingInput.value;
  const pushedTask = toDoList.addNewTask(null, inputValue, false);
  addingInput.value = '';
  addToDo(pushedTask, toDoList);
  addLocal(toDoList.list);
});
