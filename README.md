# employee-postgres
Employee Management System

This is a command-line application for managing departments, roles, and employees within a company. It allows users to view, add, and update departments, roles, and employees using a PostgreSQL database.
	•	View all departments: Displays a table of all departments with their IDs and names.
	•	View all roles: Displays a table of all roles with their IDs, titles, salaries, and the departments they belong to.
	•	View all employees: Displays a table of all employees with their IDs, first names, last names, job titles, departments, salaries, and managers.
	•	Add a department: Prompts the user to enter the name of a new department and adds it to the database.
	•	Add a role: Prompts the user to enter the title, salary, and department for a new role and adds it to the database.
	•	Add an employee: Prompts the user to enter the first name, last name, role, and manager for a new employee and adds it to the database.
	•	Update an employee role: Prompts the user to select an employee and update their role.

Database Schema

The database schema consists of three tables:

	1.	department
	•	id (SERIAL): Primary key, unique identifier for each department.
	•	name (VARCHAR(30)): Name of the department.
	2.	role
	•	id (SERIAL): Primary key, unique identifier for each role.
	•	title (VARCHAR(30)): Title of the role.
	•	salary (DECIMAL): Salary associated with the role.
	•	department_id (INTEGER): Foreign key, references the id of the department table.
	3.	employee
	•	id (SERIAL): Primary key, unique identifier for each employee.
	•	first_name (VARCHAR(30)): First name of the employee.
	•	last_name (VARCHAR(30)): Last name of the employee.
	•	role_id (INTEGER): Foreign key, references the id of the role table.
	•	manager_id (INTEGER): Foreign key, self-referential, references the id of the employee table (to denote the manager of the employee).

License

This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to modify the README file to better suit your needs. Ensure to replace the placeholder repository URL and any other placeholders with your actual project details.