USE work;

INSERT INTO department_table (dep_Name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');

INSERT INTO role_table (title, salary, department_id)
VALUES  ('Engineer Manager', 500000.00, 1),
        ('Intern Engineer', 100000.00, 1),
        ('Accounting Manager', 600000.00, 2),
        ('Accountant', 100000.00, 2),
        ('Lawyer', 700000.00, 3),
        ('Legal Team Lead', 150000.00, 3),
        ('Sales Representative', 100000.00, 4),
        ('Lead Sales Representative', 300000.00, 4);

INSERT INTO employees_table (first_name, last_name, role_id, manager_id)
VALUES  ('Jessy', 'Bone', 1, 1), 
        ('Gustav', 'Kovac', 2, NULL),
        ('Weldon', 'Van Heel', 3, 3),
        ('Fredenand', "Enns", 4, NULL),
        ('Keone', 'Saller', 5, NULL),
        ('Phoebe', 'simons', 6, 6),
        ('Caitlyn', 'Chevrolet', 7, NULL),
        ('Luna', 'Zanaris', 8, 8);

