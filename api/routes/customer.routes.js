module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
    const router = require("express").Router();

    // Create a new customer
    router.post("/", customers.create);

    // Retrieve all customers
    router.get("/", customers.findAll);

    // Update a customer by ID
    router.put("/:customer_id", customers.update);

    // Delete a customer by ID
    router.delete("/:customer_id", customers.delete);

    app.use("/api/customers", router);
};
