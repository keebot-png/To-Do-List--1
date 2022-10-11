/* eslint-disable */
import _ from 'lodash';
import './style.css';
import ToDoList from './modules/todo.js';
import { addToDo, toDoAppend } from './modules/userInter.js';
import { addLocal, loadLocal } from './modules/store.js';

const submitButton = document.querySelector('.submit-btn');
const addingInput = document.querySelector('.add-todo');
const clearButton = document.querySelector('.clear-btn');

const toDoList = new ToDoList();
const dataFromLocalStorage = loadLocal();

dataFromLocalStorage.forEach((toDoObject) => {
  const pushedLocalTask = toDoList.addNewTask(
    toDoObject.index, toDoObject.description, toDoObject.isCompleted,
  );
  addToDo(pushedLocalTask, toDoList);
});

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const inputValue = addingInput.value;
  const pushedTask = toDoList.addNewTask(null, inputValue, false);
  addingInput.value = '';
  addToDo(pushedTask, toDoList);
  addLocal(toDoList.list);
});

clearButton.addEventListener('click', (e) => {
  e.preventDefault();
  toDoList.deleteCompleteItems();
  toDoAppend.innerHTML = '';
  toDoList.list.forEach((task) => {
    addToDo(task, toDoList);
  });
  addLocal(toDoList.list);
});
