module.exports = app => {
    const orders = require("../controllers/order.controller.js");
    const router = require("express").Router();

    // Create a new order
    router.post("/", orders.create);

    // Retrieve all orders
    router.get("/", orders.findAll);

    // Update an order by ID
    router.put("/:order_id", orders.update);

    // Delete an order by ID
    router.delete("/:order_id", orders.delete);

    app.use("/api/orders", router);
};
