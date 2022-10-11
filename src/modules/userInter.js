import { addLocal } from './store.js';

const toDoAppend = document.querySelector('.list');
const parser = new DOMParser();

const addToDo = (todo, todoList) => {
  const string = `
    <li class="border-bottom">
      <div class="list-item">
        <input type="checkbox" ${todo.completed ? 'checked' : ''} id=${todo.index}>
        <div class="todo-li">
          ${todo.description}
        </div>
        <div>
          <input type="text" class="edit-todo hidden" value=${todo.description}>
        </div>
      </div>
      <i class="fa-solid fa-ellipsis menu"></i>
      <ul class="task-menu hidden">
          <li>
            <i class="fa-solid fa-pen edit"></i>
          </li>
          <li>
            <i class="fa-solid fa-trash delete"></i>
          </li>
          <li>
            <i class="fa-solid fa-xmark close"></i>
          </li>
        </ul>
    </li>
  `;

  const todoElement = parser.parseFromString(string, 'text/html').body.firstChild;

  /* function to display menu */

  const taskMenuBtn = todoElement.querySelector('.menu');
  const taskMenu = todoElement.querySelector('.task-menu');
  taskMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    taskMenu.classList.remove('hidden');
  });

  /* function to close menu */

  const closeButton = todoElement.querySelector('.close');
  closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    taskMenu.classList.add('hidden');
  });

  /* function to delete task */
  const deleteButton = todoElement.querySelector('.delete');
  deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    todoList.removeTask(todo);
    todoElement.remove();
    addLocal(todoList.list);
  });

  /* functiom to edit task */
  const toDoEl = todoElement.querySelector('.todo-li');
  const editToDo = todoElement.querySelector('.edit-todo');
  const editBtn = todoElement.querySelector('.edit');
  editBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toDoEl.classList.add('hidden');
    editToDo.classList.remove('hidden');
    taskMenu.classList.add('hidden');
    editToDo.focus();
  });

  editToDo.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      todoList.updatedTaskDescription(todo.index, editToDo.value);
      toDoEl.innerHTML = editToDo.value;
      toDoEl.classList.remove('hidden');
      editToDo.classList.add('hidden');
      addLocal(todoList.list);
    }
  });

  const todoCompleted = todoElement.querySelector('input[type="checkbox"]');
  if (todo.completed) {
    todoElement.style.textDecoration = 'line-through';
    todoElement.style.color = '#545862a3';
  } else {
    todoElement.style.textDecoration = 'none';
    todoElement.style.color = 'inherit';
  }

  todoCompleted.addEventListener('change', (e) => {
    if (e.target.checked) {
      todoList.updateTask(todo.index, true);
      todoElement.style.textDecoration = 'line-through';
      todoElement.style.color = '#545862a3';
    } else {
      todoList.updateTask(todo.index, false);
      todoElement.style.textDecoration = 'none';
      todoElement.style.color = 'inherit';
    }

    addLocal(todoList.list);
  });
  toDoAppend.append(todoElement);
};

export { addToDo, toDoAppend };