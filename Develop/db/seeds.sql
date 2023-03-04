INSERT INTO department (id, department_name)
VALUES (01, "Engineering"),
       (02, "Legal"),
       (03, "Finance"),
       (04, "Sales");
       
INSERT INTO role (id, title, salary, department_id)
VALUES (01, "Sales Lead", 100000, 04),
       (02, "Salesperson", 80000, 04),
       (03, "Lead Engineer", 150000, 01),
       (04, "Software Engineer", 120000, 01),
       (05, "Account Manager", 160000, 03),
       (06, "Accountant", 125000, 03),
       (07, "Legal Team Lead", 250000, 02),
       (08, "Lawyer", 190000, 02);

INSERT INTO employee (id, first_name, last_name, manager_id, role_id)
VALUES (01, "John", "Doe", NULL, 01),
       (02, "Mike", "Chan", 01, 02),
       (03, "Ashley", "Rodriguez", NULL, 03),
       (04, "Kevin", "Tupik", 03, 04),
       (05, "Kunal", "Singh", NULL, 05),
       (06, "Malia", "Brown", 05, 06),
       (07, "Sarah", "Lourd", NULL, 07),
       (08, "Tom", "Allen", 07, 08);
       