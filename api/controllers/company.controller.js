const db = require("../models");
const Company = db.companies;

// Create a new company
exports.create = (req, res) => {
    const { company_name, company_address, contact_id } = req.body;

    Company.create({ company_name, company_address, contact_id })
        .then(data => res.status(201).send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

// Get all companies
exports.findAll = (req, res) => {
    Company.findAll()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

// Get a single company by ID
exports.findOne = (req, res) => {
    const id = req.params.company_id;

    Company.findByPk(id)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: "Company not found" });
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

// Update a company
exports.update = (req, res) => {
    const id = req.params.company_id;

    Company.update(req.body, { where: { company_id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Company updated successfully." });
            else res.send({ message: "Cannot update company." });
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

// Delete a company
exports.delete = (req, res) => {
    const id = req.params.company_id;

    Company.destroy({ where: { company_id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Company deleted successfully." });
            else res.send({ message: "Cannot delete company." });
        })
        .catch(err => res.status(500).send({ message: err.message }));
};