INSERT INTO departments
 ( names, id )
 VALUES
 ("Tech", 1),
 ("Legal", 2),
 ("Sales", 3);

 INSERT INTO role
 (title, id, dep, salary)
 VALUES
 ("software engineer", 1, "tech", 90000),
 ("Lawyer", 2, "legal", 200000),
 ("Salesman", 3, "Sales", 80000);

 INSERT INTO employees
 (id, first_name, last_name, title, department, salary, manager_id )
 VALUES
 (1, "Bill", "Smith", "engineer", "tech", 90000, 1),
 (2, "Chad", "West", "Lawyer", "legal", 200000, 2),
 (3, "Zion", "Brown", " Salesman", "Sales", 80000, 3);