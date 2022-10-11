import TaskNames from './taskNames.js';

export default class ToDoList {
  constructor() {
    this.list = [];
  }

    addNewTask = (index = null, description = null, completed = null) => {
      if (description) {
        const newTaskIndex = index || this.list.length + 1;
        const newTaskIsCompleted = completed || false;
        const newTask = new TaskNames(newTaskIndex, description, newTaskIsCompleted);
        this.list.push(newTask);
        return newTask;
      }
      return null;
    }

    updateTask = (index, completed) => {
      this.list[index - 1].completed = completed;
    }

    updatedTaskDescription = (index, description) => {
      this.list[index - 1].description = description;
    }

    removeTask = (todo) => {
      this.list = this.list.filter((item) => item !== todo);
      this.list.forEach((task, indexOfTask) => {
        task.index = indexOfTask + 1;
      });
    }

    deleteCompleteItems = () => {
      this.list = this.list.filter((item) => item.completed !== true);
      this.list.forEach((task, indexOfTask) => {
        task.index = indexOfTask + 1;
      });
    }
}