const db = require("../models");
const Customer = db.customers;

// Create a new Customer
exports.create = (req, res) => {
  const { customer_name, customer_email } = req.body;

  // Validate request
  if (!customer_name || !customer_email) {
    return res.status(400).send({
      message: "Customer name and email are required!",
    });
  }

  // Create a Customer
  Customer.create({ customer_name, customer_email })
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    });
};

// Retrieve all Customers
exports.findAll = (req, res) => {
  const { name } = req.query;

  const condition = name
    ? { customer_name: { [db.Sequelize.Op.like]: `%${name}%` } }
    : null;

  Customer.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    });
};

// Retrieve a single Customer by ID
exports.findOne = (req, res) => {
  const id = req.params.customer_id;

  Customer.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Customer with id=${id} not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Customer with id=" + id,
      });
    });
};

// Update a Customer by ID
exports.update = async (req, res) => {
  const id = req.params.customer_id;

  try {
    const [num] = await Customer.update(req.body, {
      where: { customer_id: id },
    });

    if (num === 1) {
      const updatedCustomer = await Customer.findOne({
        where: { customer_id: id },
      });
      res.send(updatedCustomer);
    } else {
      res.status(404).send({
        message: `Cannot update Customer with id=${id}. Customer not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Customer with id=" + id,
    });
  }
};

// Delete a Customer by ID
exports.delete = (req, res) => {
  const id = req.params.customer_id;

  Customer.destroy({
    where: { customer_id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Customer was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Customer with id=${id}. Customer not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Customer with id=" + id,
      });
    });
};