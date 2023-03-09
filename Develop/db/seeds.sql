INSERT INTO department (department_name)
VALUES ("Engineering"),
       ("Legal"),
       ("Finance"),
       ("Sales");
       
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 04),
       ("Salesperson", 80000, 04),
       ("Lead Engineer", 150000, 01),
       ("Software Engineer", 120000, 01),
       ("Account Manager", 160000, 03),
       ("Accountant", 125000, 03),
       ("Legal Team Lead", 250000, 02),
       ("Lawyer", 190000, 02);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ("John", "Doe", NULL, 01),
       ("Mike", "Chan", 01, 02),
       ("Ashley", "Rodriguez", NULL, 03),
       ("Kevin", "Tupik", 03, 04),
       ("Kunal", "Singh", NULL, 05),
       ("Malia", "Brown", 05, 06),
       ("Sarah", "Lourd", NULL, 07),
       ("Tom", "Allen", 07, 08);
       