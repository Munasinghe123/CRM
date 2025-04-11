# CRM System for Financial Company

This is a CRM (Customer Relationship Management) system developed for a leading financial company based in Melbourne, Australia. The system allows different types of users to manage and exchange client ticket data securely.

## Technologies Used

- React.js 
- Node.js & Express 
- Redux 
- MySQL
- Axios 
- CSS 

## User Roles

- **Admin**
- **Financial Planner**
- **Mortgage Broker**

## Features

### Authentication
- Login screen with username, password, and forgot password link.
- Redux,Jwt based authentication with protected routes.
  
### Admin
- Create/register new users with basic information (name, email, role, password).

### Ticket Management
- **Financial Planner** and **Mortgage Broker** can:
  - Create tickets with:
    - Serial Number
    - Client Name
    - Client Address
    - Client Contact Details
    - Amount
  - Submit tickets to the other role.
  - View shared tickets.

## Database Setup

1. Make sure MySQL is installed and running.
2. Open your MySQL CLI or GUI tool (like phpMyAdmin or MySQL Workbench).
3. Run the SQL script provided :

### SQL querry

CREATE DATABASE crm_system;

USE crm_system;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('admin', 'financial_planner', 'mortgage_broker')
);

CREATE TABLE tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  serial_number VARCHAR(50),
  client_name VARCHAR(100),
  client_address TEXT,
  client_contact VARCHAR(100),
  amount DECIMAL(10,2),
  from_user INT,
  to_user INT,
  FOREIGN KEY (from_user) REFERENCES users(id),
  FOREIGN KEY (to_user) REFERENCES users(id)
);
