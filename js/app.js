const addTaskBtn = document.getElementById("add-task-btn");
const input = document.getElementById("task-description");
const taskList = document.getElementById("task-list");
const checkbox = document.querySelector(".btn-complete");


console.log(taskList);

let tasks;


!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

let taskItem = [];

function Task(description) {
   this.description = description;
   this.completed = false;
}



input.addEventListener('keypress', (e) => {
   if (input.value != '' && e.key === 'Enter') {
      tasks.push(new Task(input.value))
      input.value = '';
   }
   updateLocalStorage();
   fillTaskList();
   filterTasks();

})

addTaskBtn.addEventListener('click', () => {
   if (input.value != '') {
      tasks.push(new Task(input.value))
      input.value = '';
   }
   updateLocalStorage();
   fillTaskList();
   filterTasks();

})

const createTaskItem = (task, index) => {
   return `
      <div class="task-item ${task.completed ? "done" : ''}">
         <div class="task-item__description" >${task.description}</div>
         <div class="buttons">
            <input onclick="completeTask(${index})" type="checkbox"${task.completed ? "checked" : ""} class="btn-complete">
            <button onclick="deleteTask(${index})" id="delBtn" class="task-item__delete"><img src="/img/delete.svg" alt=""></button>
         </div>
      </div>`
}



const fillTaskList = () => {
   taskList.innerHTML = "";
   if (tasks.length > 0) {
      tasks.map((i, index) => {
         taskList.innerHTML += createTaskItem(i, index)
      })
      taskItem = document.querySelectorAll('.task-item')
   }
}

const filterTasks = () => {
   const activeTasks = tasks.filter(item => item.completed == false);
   const completedTasks = tasks.filter(item => item.completed == true);
   tasks = [...activeTasks, ...completedTasks];
   updateLocalStorage();
   fillTaskList();
}


const completeTask = index => {
   tasks[index].completed = !tasks[index].completed
   if (!taskItem.completed) {
      taskItem[index].classList.add('done');
   }
   if (taskItem.completed) {
      taskItem[index].classList.remove('done');
   }
   updateLocalStorage();
   fillTaskList();
   filterTasks();
}


const deleteTask = index => {
   console.log(index);
   tasks.splice(index, 1);
   updateLocalStorage();
   fillTaskList();
}
const updateLocalStorage = () => {
   localStorage.setItem('tasks', JSON.stringify(tasks));
}


filterTasks();
fillTaskList();



































// console.log(tasks);

// function Task(description) {
//    this.description = description;
//    this.complite = false;
// }


// addTaskBtn.addEventListener('click', () => {
//    tasks.push(new Task(input.value))
//    input.value = '';
//    console.log(tasks);
//    updateLocal();
//    fillTaskList();
// });

// // checkbox.addEventListener('change', () => {
// //    if (checkbox.checked = true) {
// //       taskItem.classList.add('checked');
// //    }
// //    else {
// //       taskItem.classList.remove('checked');
// //    }
// // })

// function createTaskItem(task) {
//    return `
//    <div class="task-item">
//       <div class="task-item__description ${task.complite ? "checekd" : ""}">${task.description}</div>
//          <div class="buttons">
//          <input class="btn-complete"  type="checkbox" ${task.complite ? "checked" : ""}>
//          <a class="task-item__delete"><img src="/img/delete.svg" alt=""></a>
//       </div>
//    </div>
//    `
// }

// function updateLocal() {
//    localStorage.setItem('tasks', JSON.stringify(tasks));
// }



// function fillTaskList() {
//    taskList.innerHTML = "";
//    if (tasks.length > 0) {
//       tasks.map(i => taskList.innerHTML += createTaskItem(i))
//    }
// }

// fillTaskList();


