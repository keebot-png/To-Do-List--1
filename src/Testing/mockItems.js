const mockList = require('../mock/mockStorage');

module.exports = class MockItemsTest {
  constructor(description, id = 1, completed = false) {
    this.description = description;
    this.id = id;
    this.completed = completed;
  }

  getItem() {
    const task = {
      description: this.description,
      id: this.id,
      complete: this.complete,
    };
    return task;
  }

  static addTask(items) {
    mockList.push(items);
    return mockList;
  }

  static deleteTask(id) {
    mockList.splice(id, 1);
    return mockList;
  }
};