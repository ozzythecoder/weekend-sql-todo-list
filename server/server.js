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

  const queryText = `SELECT * FROM tasks`;

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

  pool.query(queryText, [task.name, task.priority, task.completed])
    .then( (response) => {
      console.log('task added successfully');
      res.sendStatus(201)
    })
    .catch( (error) => {
      console.log('error in POST query');
      res.sendStatus(500);
    })
})

app.listen(PORT, () => {
  console.log('listening on port', PORT);
})