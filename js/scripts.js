document.getElementById('taskInputForm').addEventListener('submit', saveTask);

function saveTask(e) {
  var taskDesc = document.getElementById('taskDescInput').value;
  var taskPriority = document.getElementById('taskPriorityInput').value;
  var taskAssiTo = document.getElementById('taskAssiToInput').value;
  var taskId = chance.guid();
  taskStatus = 'open';

  var taskObject = {
    id: taskId,
    description: taskDesc,
    priority: taskPriority,
    assiTo: taskAssiTo,
    status: taskStatus
  }

  if (localStorage.getItem('tasksListArray') == null) {
    var tasksListArray = [];
    tasksListArray.push(taskObject);
    localStorage.setItem('tasksListArray', JSON.stringify(tasksListArray));
  } else {
    var tasksListArray = JSON.parse(localStorage.getItem('tasksListArray'));
    tasksListArray.push(taskObject);
    localStorage.setItem('tasksListArray', JSON.stringify(tasksListArray));
  }
  // form re-set
  document.getElementById(taskInputForm).reset();
  // Genetrate the new task and disply it
  generateNewTask();
  e.preventDefault();
}
function generateNewTask() {
  var tasks = JSON.parse(localStorage.getItem('tasksListArray'));
  var tasksListHolder = document.getElementById('tasksList');
  tasksListHolder = ' ';

  for (var i = 0; i < tasks.length; i++) {
    var id = tasks[i].id;
    var desc = tasks[i].description;
    var priority = tasks[i].priority;
    var assignTo = tasks[i].assiTo;
    var status = tasks[i].status;

    tasksListHolder.innerHTML +=  '<div class="well">' +
                                  '<h6> Task ID: ' + id + '</h6>' +
                                  '<p><span class="label label-info">' + status + '</span></p>' +
                                  '<h3>' + desc + '</h3>'
                                  '<p><span class="glyphicon glyphicon-time"></span>' + priority + '</p>' +
                                  '<p><span class="glyphicon glyphicon-user"></span>' + assignTo + '</p>' +
                                  '<a href ="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>' +
                                  '<a href ="#" onclick="deleteTask(\''+id+'\')" class="btn btn-danger">Delete</a>' +
                                  '</div>';



  }
}
