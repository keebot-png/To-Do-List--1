import _ from 'lodash';
import './style.css';

//  Array to place the to-do list items
const itemArray = [
  {
    "index": 0,
    "description": "Tempor consequat ut et consectetur irure aute fugiat qui velit.",
    "completed": false
  },
  {
    "index": 1,
    "description": "Reprehenderit eu eu veniam ullamco incididunt aliqua velit non consequat excepteur excepteur qui.",
    "completed": false
  },
  {
    "index": 2,
    "description": "Sint nisi mollit sunt non fugiat.",
    "completed": false
  },
  {
    "index": 3,
    "description": "Amet laborum aute aliqua Lorem reprehenderit.",
    "completed": false
  }
];


itemArray.forEach((item) => {
  document.getElementById('tasks').innerHTML += 

  `<li class="task-1 ${item.index}">
    <label for="1">
      <input type="checkbox">
      <p>${item.description}</p>
    </label>
  </li>`;
})
