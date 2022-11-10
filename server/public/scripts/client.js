$( document ).ready(onReady)

function onReady() {
  console.log('jQ');
  getTest();
}

function getTest() {

  $.ajax({
    method: 'GET',
    url: '/db'
  })
  .then( (res) => {
    console.log(res);
  })
  .catch( (err) => {
    console.log('epic fail.');
  })

}