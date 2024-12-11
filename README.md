# README.md

IMPORTANT: Once you've cloned this to your forked repository, ensure that you continuously update this document as you complete each task to demonstrate your ongoing progress.

Please include your shared repository link here:

Example:
Gerald's shared repository: https://github.com/GajeTheGejo/A2-Gerald-22081453.git

Task 6 Documentation
1. Model Structure
## **Data Models**

### **1. Item Model**
| Attribute    | Type        | Constraints                  |
|--------------|-------------|------------------------------|
| `item_id`    | INTEGER     | Primary Key, Auto Increment  |
| `item_name`  | STRING      | Not Null                     |
| `price`      | INTEGER     | Not Null                     |
The item.model.js represents the items available in the system, with essential attributes like name and price. Enforcing data integrity by ensuring that item_name and price are always provided (allowNull: false).

### **2. Customer Model**
| Attribute         | Type        | Constraints                       |
|-------------------|-------------|-----------------------------------|
| `customer_id`     | INTEGER     | Primary Key, Auto Increment       |
| `customer_name`   | STRING      | Not Null                         |
| `customer_email`  | STRING      | Not Null, Unique, Valid Email     |
The customer.model.js captures customer data for the application, ensuring each customer has a name and email. Enforces uniqueness of customer_email to avoid duplicates (unique: true). Ensures customer_email is in a valid email format (isEmail: true).

### **3. Order Model**
| Attribute       | Type        | Constraints                       |
|-----------------|-------------|-----------------------------------|
| `order_id`      | INTEGER     | Primary Key, Auto Increment       |
| `order_date`    | DATE        | Default: Current Timestamp        |
| `customer_id`   | INTEGER     | Foreign Key (Customer)            |
| `item_id`       | INTEGER     | Foreign Key (Item)                |
The order.model.js links customers and items through orders, maintaining a record of purchases.

---
A customer can place multiple orders, but each order is linked to a single customer. Also an item can be part of multiple orders, but each order links to a single item. Both are defining One-to-Many relationship listed:
- Item.hasMany(models.Order, { foreignKey: 'item_id' }) in the index.js.
- Order.belongsTo(models.Item, { foreignKey: 'item_id' }).

2. API Implementation
# API Implementation Documentation

This section outlines the API implementation for managing `Items`, `Customers`, and `Orders` in the system.

---

## **API Implementation**

### **Base URL**: `/api`

### **1. Items API**
| Method | Endpoint       | Description                              |
|--------|----------------|------------------------------------------|
| `POST` | `/items`       | Create a new item                       |
| `GET`  | `/items`       | Retrieve all items                      |
| `PUT`  | `/items/:item_id` | Update an existing item by its ID        |
| `DELETE` | `/items/:item_id` | Delete an item by its ID                |

### **2. Customers API**
| Method | Endpoint        | Description                              |
|--------|-----------------|------------------------------------------|
| `POST` | `/customers`    | Create a new customer                   |
| `GET`  | `/customers`    | Retrieve all customers                  |
| `PUT`  | `/customers/:customer_id` | Update an existing customer by its ID    |
| `DELETE` | `/customers/:customer_id` | Delete a customer by its ID           |

### **3. Orders API**
| Method | Endpoint       | Description                              |
|--------|----------------|------------------------------------------|
| `POST` | `/orders`      | Create a new order                      |
| `GET`  | `/orders`      | Retrieve all orders                     |
| `PUT`  | `/orders/:order_id` | Update an existing order by its ID       |
| `DELETE` | `/orders/:order_id` | Delete an order by its ID               |

---

## **Front-End Implementation**

### **Components**
1. **ItemComponent**:
   - Manages item creation, viewing, editing, and deletion.
   - Supports expanding and collapsing item details.

2. **CustomerComponent**:
   - Handles customer creation, viewing, editing, and deletion.
   - Allows toggling details for specific customers.

3. **OrderComponent**:
   - Manages order creation, viewing, and deletion.
   - Includes dropdowns for selecting customers and items.

---

## **Testing the Application**

### **1. Testing via cURL**
```bash
- Create An Item:
curl -X POST http://localhost/api/items \
-H "Content-Type: application/json" \
-d '{"item_name": "Laptop", "price": 1500}'

- Retrieve All Items:
curl -X GET http://localhost/api/items

- Update An Item:
curl -X PUT http://localhost/api/items/1 \
-H "Content-Type: application/json" \
-d '{"item_name": "Gaming Laptop", "price": 2000}'

- Delete An Item:
curl -X DELETE http://localhost/api/items/1

- Create A New Customer:
curl -X POST http://localhost/api/customers \
-H "Content-Type: application/json" \
-d '{"customer_name": "John Doe", "customer_email": "john.doe@example.com"}'

- Retrieve All Customers:
curl -X GET http://localhost/api/customers

- Update A Customer:
curl -X PUT http://localhost/api/customers/1 \
-H "Content-Type: application/json" \
-d '{"customer_name": "Johnathan Doe", "customer_email": "john.doe@example.com"}'

- Delete A Customer:
curl -X DELETE http://localhost/api/customers/1

- Create An Order:
curl -X POST http://localhost/api/orders \
-H "Content-Type: application/json" \
-d '{"order_date": "2024-12-10", "customer_id": 1, "item_id": 1}'

- Retrieve All Orders:
curl -X GET http://localhost/api/orders

- Update An Order:
curl -X PUT http://localhost/api/orders/1 \
-H "Content-Type: application/json" \
-d '{"order_date": "2024-12-11", "customer_id": 1, "item_id": 2}'

- Delete An Order:
curl -X DELETE http://localhost/api/orders/1

### **Controller Breakdown**

Item Controller

Handles all operations related to `Items`.

#### **Functionality**
1. **Create an Item (`create`)**
   - Accepts `item_name` and `price` from the request body.
   - Validates that both fields are provided.
   - Adds a new record to the database.
   - Responds with the newly created item details or an error message.

2. **Retrieve All Items (`findAll`)**
   - Fetches all items from the database.
   - Supports optional filtering by item name using query parameters (`item_name`).
   - Returns the list of items or an error message.

3. **Update an Item by ID (`update`)**
   - Accepts `item_id` as a route parameter and updated fields (`item_name`, `price`) in the request body.
   - Updates the matching item in the database.
   - Returns the updated item details if successful, or an error message if not found.

4. **Delete an Item by ID (`delete`)**
   - Accepts `item_id` as a route parameter.
   - Deletes the matching item from the database.
   - Responds with a success message if the deletion was successful, or an error message if not found.

---

### **2. Customer Controller**

Handles all operations related to `Customers`.

#### **Functionality**
1. **Create a Customer (`create`)**
   - Accepts `customer_name` and `customer_email` from the request body.
   - Validates that both fields are provided.
   - Ensures the `customer_email` is unique and correctly formatted.
   - Adds a new customer to the database.
   - Responds with the newly created customer details or an error message.

2. **Retrieve All Customers (`findAll`)**
   - Fetches all customers from the database.
   - Returns the list of customers or an error message.

3. **Update a Customer by ID (`update`)**
   - Accepts `customer_id` as a route parameter and updated fields (`customer_name`, `customer_email`) in the request body.
   - Updates the matching customer in the database.
   - Returns a success message if updated, or an error message if not found.

4. **Delete a Customer by ID (`delete`)**
   - Accepts `customer_id` as a route parameter.
   - Deletes the matching customer from the database.
   - Responds with a success message if the deletion was successful, or an error message if not found.

---

### **3. Order Controller**

Handles all operations related to `Orders`.

#### **Functionality**
1. **Create an Order (`create`)**
   - Accepts `order_date`, `customer_id`, and `item_id` from the request body.
   - Validates that all fields are provided.
   - Ensures the `customer_id` and `item_id` reference existing records in the database.
   - Creates a new order record in the database.
   - Responds with the created order details, including the associated customer and item names.

2. **Retrieve All Orders (`findAll`)**
   - Fetches all orders from the database.
   - Includes associated customer and item details (e.g., `customer_name`, `item_name`).
   - Returns a list of orders or an error message.

3. **Update an Order by ID (`update`)**
   - Accepts `order_id` as a route parameter and updated fields (`order_date`, `customer_id`, `item_id`) in the request body.
   - Updates the matching order in the database.
   - Returns a success message if updated, or an error message if not found.

4. **Delete an Order by ID (`delete`)**
   - Accepts `order_id` as a route parameter.
   - Deletes the matching order from the database.
   - Responds with a success message if the deletion was successful, or an error message if not found.

---

Final Output
Every functionality has been implemented except the edit order due to maintaining the data integrity. Why would an order be edited even after it has been submited? As well as due to the scope of the assignment the order fetch the current data, so when the item change although the order has been set or created the item name may still have changed in the order list.

![Screenshot example](/Screenshot%202024-12-11%20at%2017.29.34.png)