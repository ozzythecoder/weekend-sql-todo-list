const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// pg / pool
const pg = require('pg');
const Pool = pg.Pool
const pool = new Pool({
  database: 'weekend-to-do-app', // name of database
  host: 'localhost', // database server
  port: 5432, // Postgres default
  max: 10, // max queries at once
  idleTimeoutMillis: 30000 // 30 seconds to try to connect before cancelling query
});

pool.on('connect', () => {
  console.log('postgresql is connected!');
});

pool.on('error', (error) => {
  console.log('error in postgres pool.', error);
})

// end pg / pool

app.get('/tasks', (req, res) => {

  const queryText = `SELECT * FROM tasks ORDER BY priority DESC`;

  pool.query(queryText)
    .then( (result) => {
      res.send(result.rows);
    })
    .catch( (error) => {
      console.log('error in GET query');
      console.log(error);
      res.sendStatus(500);
    })
})

app.post('/tasks', (req, res) => {
  const task = req.body
  const queryText = `
  INSERT INTO tasks
    (task_name, priority, completed)
  VALUES
    ($1, $2, $3);`

  console.log(req.body);
  pool.query(queryText, [task.name, task.priority, task.completed])
    .then( (response) => {
      console.log('task added successfully');
      res.sendStatus(201)
    })
    .catch( (error) => {
      console.log('error in POST query');
      console.log(error);
      res.sendStatus(500);
    })
})

app.put('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const queryText = `
    UPDATE tasks
      SET completed = TRUE
      WHERE id = $1;`

  pool.query(queryText, [id])
    .then( (result) => {
      console.log('PUT QUERY successful');
      res.sendStatus(200);
    })
    .catch( (error) => {
      console.log('PUT QUERY error:', error);
      res.sendStatus(500);
    })
})

app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id
  const queryText = `
    DELETE FROM tasks
      WHERE id = $1;
  `

  pool.query(queryText, [id])
    .then( (result) => {
      console.log('DELETE QUERY successful');
      res.sendStatus(200);
    })
    .catch( (error) => {
      console.log('error in DELETE query');
      console.log(error);
      res.sendStatus(500);
    })

})

app.listen(PORT, () => {
  console.log('listening on port', PORT);
})