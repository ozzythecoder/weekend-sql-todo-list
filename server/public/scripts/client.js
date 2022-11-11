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
  let priorityText = {
    '1': 'High',
    '2': 'Medium',
    '3': 'Low'
  };

  for (let task of tasks) {
    let complete = task.completed;
    let priority = task.priority;
    let id = task.id;

    listTable.append(`
      <tr class="${complete ? 'completed-row' : ''}">
        <td class="complete-cell">
        <button class="complete-task-btn"
          data-completed="${complete}"
          data-id="${id}"
          ${complete ? 'disabled' : ''}>
            &#10003;
          </button></td>
        <td class="task-cell">${task.task_name}</td>
        <td class="priority-cell">${priorityText[priority]}</td>
        <td class="delete-cell"><button class="delete-task-btn"
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
    priority: $( '#priority-in option:selected' ).val(),
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

  if (task.name.length > 40) {
    alert('Task name must be 40 characters or less.')
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
  $( '#priority-in option[value=""]' ).prop('selected', true) // resets dropdown to ghost option
}

function deleteTask() {
  let id = $( this ).data('id')

  console.log('in deletetask for task with id', id);

  $.ajax({
    method: 'DELETE',
    url: '/tasks/' + id
  })
  .then(function() {
    console.log('Ajax delete successful');
    getTasks();
  })
  .catch(function () {
    console.log('Error in Ajax delete');
  })
}