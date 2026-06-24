-- Insert roles
INSERT INTO roles (name) VALUES ('ADMIN');
INSERT INTO roles (name) VALUES ('MEMBER');

-- Insert admin2 user
INSERT INTO app_users (username, password_hash, password) VALUES 
('admin2', '$2a$10$slYQmyNdGzin7olVN3p5be4DlH.PKZbv5H8KnzzVgXXbVxzy990P2', 'password123');

-- Assign admin2 to both ADMIN and MEMBER roles
INSERT INTO user_roles (user_id, role_id) VALUES 
((SELECT id FROM app_users WHERE username = 'admin2'), (SELECT id FROM roles WHERE name = 'ADMIN')),
((SELECT id FROM app_users WHERE username = 'admin2'), (SELECT id FROM roles WHERE name = 'MEMBER'));

-- Insert books
INSERT INTO books (title, author, description, publish_year, isbn, created_at, updated_at) VALUES
('Pride and Prejudice', 'Jane Austen', 'A classic novel of manners.', 1813, '9780141199078', CURRENT_DATE, CURRENT_DATE),
('1984', 'George Orwell', 'Dystopian social science fiction novel.', 1949, '9780451524935', CURRENT_DATE, CURRENT_DATE),
('To Kill a Mockingbird', 'Harper Lee', 'Pulitzer Prize-winning novel on racial injustice.', 1960, '9780061120084', CURRENT_DATE, CURRENT_DATE),
('The Great Gatsby', 'F. Scott Fitzgerald', 'A novel about the American dream.', 1925, '9780743273565', CURRENT_DATE, CURRENT_DATE),
('Moby Dick', 'Herman Melville', 'Epic tale of a sea captain and a white whale.', 1851, '9780142437247', CURRENT_DATE, CURRENT_DATE),
('War and Peace', 'Leo Tolstoy', 'Historical novel that chronicles Napoleonic wars.', 1869, '9780199232765', CURRENT_DATE, CURRENT_DATE),
('The Catcher in the Rye', 'J.D. Salinger', 'A story about teenage angst and alienation.', 1951, '9780316769488', CURRENT_DATE, CURRENT_DATE),
('Brave New World', 'Aldous Huxley', 'A futuristic dystopian novel.', 1932, '9780060850524', CURRENT_DATE, CURRENT_DATE);
