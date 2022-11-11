$( document ).ready(onReady)

function onReady() {
  console.log('jQ');
  getEventListeners();
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
  
  emptyInputs();
  console.log(task);
}

function emptyInputs() {
  $( '#task-name-in' ).val('')
  $( '#priority-in' ).val('Priority')
}