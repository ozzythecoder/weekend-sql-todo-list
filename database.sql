CREATE TABLE "tasks2" (
	"id" serial primary key,
	"task_name" varchar(200),
	"priority" varchar(1),
	"completed" boolean
);

INSERT INTO tasks2
	(task_name, priority, completed)
VALUES
	('Do the dishes', 3, false),
	('Prep cook', 2, true),
	('Graduate Prime', 1, false);