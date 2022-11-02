INSERT INTO department (department_name)
VALUES  ("Engineering"),
        ("Development"),
        ("manager"),
        ("data scientist"),
        ("full stack developer");

INSERT INTO roles ( title, salary, department_id)
VALUES( "Engineering", 20000, 1),
    ( "manager", 15000, 2),
    ( "Development", 35000, 3),
    ( "scientist", 40000, 4),
    ( "full stack developer", 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ( "Calvin", "Klein", 1, 1),
    ( "kim", "Kardashian", 2, 2),
    ( "Harry", "Styles", 3, 3),
    ( "Taylor", "Switft", 4, 4),
    ( "Hello", "Kitty", 5, 5);

