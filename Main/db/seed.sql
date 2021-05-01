use employees;

INSERT INTO department
    (name)
VALUES
    ('sales'),
    ('Engineering'),
    ('Fiance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)

VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("K", "P", 3, NULL), ("D", "J", 1, 1), ("E", "R", 2, 1);