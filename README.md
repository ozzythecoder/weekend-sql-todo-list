# SQL TO-DO LIST

## Description

_Duration: Weekend Project_

This app is a simple to-do list, that accepts an input of a task and an assigned priority, stores tasks persistently in a database, and displays them on the page, with the options to mark them as completed with the checkmark, or to delete them from the database.

## Prerequisites

- Node.JS

## Installation

1. Install dependencies by running `npm install` in your terminal, from the app's root directory.
2. Create an SQL database called "weekend-to-do-app".
3. Inside the "weekend-to-do-app" database, run the SQL queries in the included `database.sql` file.
4. Run `npm start` from the app's root directory.
5. Open up your browser and navigate to [http://localhost:5000](http://localhost:5000) to open the app.

## Usage

1. Type a short description of a task into the "task name" input field.
2. Select a priority from the dropdown menu to assign it to the task.
3. Press 'Add Task' to add the task to the database. It will be displayed below.
4. If multiple tasks are present, they will be displayed top to bottom, starting with the highest priority task(s).
5. Mark a task as complete by clicking the checkbox; the box will turn green and the task will be struck out.
6. Press the "Delete" button to remove a task from the database, whether it is complete or not.


## Built With

- JavaScript
- Express
- Node.JS
- SQL

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.