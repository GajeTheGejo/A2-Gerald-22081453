module.exports = app => {
    const items = require("../controllers/item.controller.js");
    const router = require("express").Router();

    // Create a new item
    router.post("/", items.create);

    // Retrieve all items
    router.get("/", items.findAll);

    // Update an item by ID
    router.put("/:itemId", items.update);

    // Delete an item by ID
    router.delete("/:itemId", items.delete);

    app.use("/api/items", router);
};