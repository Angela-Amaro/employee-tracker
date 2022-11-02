INSERT INTO department (department_name)
VALUES  ("Engineering"),
        ("Development"),
        ("manager"),
        ("data scientist"),
        ("full stack developer");

INSERT INTO roles (id, title, salary, department_id)
VALUES(1, Engineering, 20000, 1),
    (2, manager, 15000, 2),
    (3, Development, 35000, 3),
    (4, data scientist, 40000, 4),
    (5, full stack developer,50000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, Calvin, Klein, 1, 1),
    (2, kim, Kardashian, 2, 2),
    (3, Harry, Styles, 3, 3),
    (4, Taylor, Switft, 4, 4),
    (5, Hello, Kitty, 5, 5);

