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
    let complete = task.completed;
    let id = task.id;
    let disableButton = (complete ? 'disabled' : '') // if task is complete, disable the button

    listTable.append(`
      <tr>
        <td><button class="complete-task-btn"
          data-completed="${complete}"
          data-id="${id}"
          ${disableButton}>&#10003;</button></td>
        <td>${task.task_name}</td>
        <td>${task.priority}</td>
        <td><button class="delete-task-btn"
          data-id="${id}">Delete</button></td>
      </tr>
    `)
  }

} // end renderTasks()

function clearTable() { $( '#list-table ').empty() };

function getEventListeners() {
  $( '#submit-task-btn' ).on('click', addTask)
  $( '#list-table' ).on('click', '.complete-task-btn', completeTask)
  $( '#list-table' ).on('click', '.delete-task-btn', deleteTask)

  $( '#test-btn' ).on('click', function() {
    console.log('bruh');
    $( this ).prop('disabled', true);
  })
}

function addTask() {
  console.log('in addtask');

  const task = {
    name: $( '#task-name-in' ).val(),
    priority: $( '#priority-in' ).val(),
    completed: false
  }
  
  if ( !validateInput(task) ) { return false } // abort mission if input is invalid

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

function validateInput(task) {
  
  if (task.name == '' || task.priority == '') {
    alert('All fields are required.')
    return false;
  }

  return true;
}

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

function deleteTask() {
  let id = $( this ).data('id')

  console.log('in delete task for task with id', id);
}