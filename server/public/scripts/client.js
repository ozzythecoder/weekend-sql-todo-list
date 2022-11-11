$( document ).ready(onReady)

function onReady() {
  console.log('jQ');

  getEventListeners();
  getTasks();
}

function getTasks() {

  $.ajax({
    method: 'GET',
    url: 'tasks'
  })
  .then(function (response) {
    renderTasks(response);
    console.log('GET query successful');
  })
  .catch(function (error) {
    console.log('error in AJAX GET:', error);
  })
}

function renderTasks(tasks) {
  let listTable = $( '#list-table' )

  for (let task of tasks) {
    listTable.append(`
      <tr>
        <td><button class="complete-task" data-id="${task.id}">&#10003;</button></td>
        <td>${task.name}</td>
        <td>${task.priority}</td>
      </tr>
    `)
  }

}

function getEventListeners() {
  $( '#submit-task-btn' ).on('click', addTask)
}

function addTask() {
  console.log('in addtask');

  const task = {
    name: $( '#task-name-in' ).val(),
    priority: $( '#priority-in' ).val(),
    completed: false
  }
  
  if (task.name == '' || task.priority == '') {
    alert('All fields are required.')
    return false;
  }

  console.log(task);
  emptyInputs();
}

function emptyInputs() {
  $( '#task-name-in' ).val('')
  $( '#priority-in' ).val('Priority')
}