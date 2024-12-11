const db = require("../models");
const Order = db.orders;
const Item = db.items;
const Customer = db.customers;

// Create a new Order
exports.create = async (req, res) => {
  try {
    const { order_date, customer_id, item_id } = req.body;

    // Validate the request
    if (!order_date || !customer_id || !item_id) {
      return res.status(400).send({
        message: "Order date, customer_id, and item_id are required!",
      });
    }

    // Check if the referenced Customer and Item exist
    const customer = await Customer.findByPk(customer_id);
    const item = await Item.findByPk(item_id);

    if (!customer) {
      return res.status(404).send({ message: "Customer not found!" });
    }
    if (!item) {
      return res.status(404).send({ message: "Item not found!" });
    }

    // Create the order in the database
    const newOrder = await Order.create({ order_date, customer_id, item_id });

    // Format the response
    res.status(201).send({
      order_id: newOrder.order_id,
      order_date: newOrder.order_date,
      customer_id: newOrder.customer_id,
      item_id: newOrder.item_id,
      customer_name: customer.customer_name,
      item_name: item.item_name,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Order.",
    });
  }
};

// Retrieve all Orders
exports.findAll = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Customer,
          attributes: ["customer_name"],
        },
        {
          model: Item,
          attributes: ["item_name"],
        },
      ],
    });

    // Map the data to include customer_name and item_name
    const formattedData = orders.map((order) => ({
      order_id: order.order_id,
      order_date: order.order_date,
      customer_id: order.customer_id,
      item_id: order.item_id,
      customer_name: order.customer?.customer_name || "Unknown Customer",
      item_name: order.item?.item_name || "Unknown Item",
    }));

    res.send(formattedData);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving orders.",
    });
  }
};

// Update an Order by ID
exports.update = async (req, res) => {
  const id = req.params.orderId;

  try {
    // Validate request
    const { customer_id, item_id } = req.body;
    if (customer_id) {
      const customer = await Customer.findByPk(customer_id);
      if (!customer) {
        return res.status(404).send({ message: "Customer not found!" });
      }
    }
    if (item_id) {
      const item = await Item.findByPk(item_id);
      if (!item) {
        return res.status(404).send({ message: "Item not found!" });
      }
    }

    const [num] = await Order.update(req.body, { where: { order_id: id } });

    if (num === 1) {
      const updatedOrder = await Order.findOne({ where: { order_id: id } });
      res.send(updatedOrder);
    } else {
      res.status(404).send({
        message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Order with id=" + id,
    });
  }
};

// Delete an Order by ID
exports.delete = async (req, res) => {
  const id = req.params.orderId;

  try {
    const num = await Order.destroy({
      where: { order_id: id },
    });

    if (num === 1) {
      res.send({
        message: "Order was deleted successfully!",
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Order with id=" + id,
    });
  }
};