CREATE DATABASE IF NOT EXISTS maindb
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE maindb;
CREATE USER IF NOT EXISTS db_user@localhost IDENTIFIED BY 'db_pass';
GRANT ALL PRIVILEGES ON maindb.* TO 'db_user'@'localhost';