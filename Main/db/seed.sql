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
    ('Lead Engineer', 150000, 2),
