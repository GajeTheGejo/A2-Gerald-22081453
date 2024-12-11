module.exports = app => {
    const items = require("../controllers/item.controller.js");
    const router = require("express").Router();

    // Create a new item
    router.post("/", items.create);

    // Retrieve all items
    router.get("/", items.findAll);

    // Update an item by ID
    router.put("/:item_id", items.update);

    // Delete an item by ID
    router.delete("/:item_id", items.delete);

    app.use("/api/items", router);
};