const db = require("../models");
const Item = db.items;

// Create a new item
exports.create = (req, res) => {
  const { item_name, price } = req.body;

  // Validate request
  if (!item_name || !price) {
    return res.status(400).send({
      message: "Item name and price are required!",
    });
  }

  Item.create({ item_name, price })
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the item.",
      });
    });
};

// Retrieve all items
exports.findAll = (req, res) => {
  const { name } = req.query; // Optional filtering by name
  const condition = name
    ? { item_name: { [db.Sequelize.Op.like]: `%${name}%` } }
    : null;

  Item.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};

// Retrieve single item by ID
exports.findOne = (req, res) => {
  const id = req.params.item_id;

  Item.findByPk(id)
    .then((data) => {
      if (data) res.send(data);
      else
        res.status(404).send({
          message: `Item with id=${id} not found.`,
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Item with id=${id}.`,
      });
    });
};

// Update item by ID
exports.update = async (req, res) => {
    console.log("PUT request received for item ID:", req.params.itemId);
    const id = req.params.item_id;

  try {
    const [num] = await Item.update(req.body, { where: { item_id: id } });

    if (num === 1) {
      // Fetch and return the updated item
      const updatedItem = await Item.findOne({ where: { item_id: id } });
      res.send(updatedItem);
    } else {
      res.status(404).send({
        message: `Cannot update Item with id=${id}. Item not found or req.body is empty.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Error updating Item with id=${id}.`,
    });
  }
};

// Delete item by ID
exports.delete = (req, res) => {
  const id = req.params.item_id;

  Item.destroy({ where: { item_id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Item was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Item with id=${id}. Item not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Item with id=${id}.`,
      });
    });
};