// Ui vars
const formUI = document.getElementById('form-tasks');
const taskInputUI = document.getElementById('task');
const taskFilterUI = document.querySelector('#filter');
const clearTasksUI = document.querySelector('#clear');
const listUI = document.querySelector('.list-group');

loadAll();

function loadAll(){

    document.addEventListener('DOMContentLoaded',getTasks);

    formUI.addEventListener('submit', addTask);

    listUI.addEventListener('click', deleteTask);

    taskFilterUI.addEventListener('keyup', searchTasks);

    clearTasksUI.addEventListener('click', clearAll);
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
            
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(task))
        let a = document.createElement('a');
        a.className = 'delete-item secondary-content';
        a.innerHTML = '<i class="fa fa-remove float-right"></i>';
        li.appendChild(a);
        listUI.appendChild(li);
    })
}

function addTask(e){

    if(taskInputUI.value === ''){
        alert('Add task')
    }

    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(taskInputUI.value))
    let a = document.createElement('a');
    a.className = 'delete-item secondary-content';
    a.innerHTML = '<i class="fa fa-remove float-right"></i>';
    li.appendChild(a);
    listUI.appendChild(li);

    storeTasks(taskInputUI.value);

    taskInputUI.value = '';

    e.preventDefault();
}

// Store Task
function storeTasks(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


function deleteTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure you want to delete?')){
            e.target.parentElement.parentElement.remove();
            //remove from LS
            deletefromLs( e.target.parentElement.parentElement);
        }
    }
    e.preventDefault();
}

// Delete from ls
function deletefromLs(tsk){
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
      if(tsk.textContent === task){
        tasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function searchTasks(e){

    let typed = e.target.value.toLowerCase();
    
      document.querySelectorAll('.list-group-item').forEach(function(task){
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(typed) != -1){
          task.style.display = 'block';
        } else {
          task.style.display = 'none';
        }
      });

}

function clearAll(e){
    listUI.innerHTML = '';

    clearAllLs();

    e.preventDefault();
}

function clearAllLs(){
    localStorage.clear();
}
