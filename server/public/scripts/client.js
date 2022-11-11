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
} // end getTasks()

function renderTasks(tasks) {
  clearTable();

  let listTable = $( '#list-table' )

  for (let task of tasks) {
    console.log(task);
    listTable.append(`
      <tr>
        <td><button class="complete-task-btn" data-id="${task.id}">&#10003;</button></td>
        <td>${task.task_name}</td>
        <td>${task.priority}</td>
      </tr>
    `)
  }

} // end renderTasks()

function clearTable() { $( '#list-table ').empty() };

function getEventListeners() {
  $( '#submit-task-btn' ).on('click', addTask)
  $( '#list-table' ).on('click', '.complete-task-btn', completeTask)
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

  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: task })
    .then( function () {
      console.log('AJAX POST successful');
      getTasks();
    })
    .catch( function (error) {
      console.log(('AJAX POST error'));
      console.log(error);
      return false;
    })

  emptyInputs();
} // end addTask()

function completeTask() {
  let id = $( this ).data('id')

  $.ajax({
    method: 'PUT',
    url: '/tasks/' + id
  })
  .then(function() {
    console.log('AJAX PUT successful');
    getTasks();
  })
  .catch(function (error) {
    console.log('AJAX PUT error');
    console.log(error);
  })
} // end completeTask()

function emptyInputs() {
  $( '#task-name-in' ).val('')
  $( '#priority-in' ).val('Priority')
}