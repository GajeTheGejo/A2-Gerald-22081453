const db = require("../models");
const Company = db.companies;

// Create a new company
exports.create = (req, res) => {
    const { company_name, company_address } = req.body;
    const contact_id = parseInt(req.params.contactId);

    if (!contact_id) {
        return res.status(400).send({ message: "Contact ID is required." });
    }

    Company.create({ company_name, company_address, contact_id })
        .then(data => res.status(201).send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};


// Get all companies
exports.findAll = (req, res) => {
    const contact_id = parseInt(req.params.contactId); // Retrieve contact_id from URL

    Company.findAll({ where: { contact_id } })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

// Get a single company for a specific contact
exports.findOne = (req, res) => {
    const contact_id = parseInt(req.params.contactId); // Retrieve contact_id from URL
    const company_id = req.params.company_id;

    Company.findOne({ where: { company_id, contact_id } })
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: "Company not found for this contact." });
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

// Update a company for a specific contact
exports.update = (req, res) => {
    const contact_id = parseInt(req.params.contactId); // Retrieve contact_id from URL
    const company_id = req.params.company_id;

    Company.update(req.body, { where: { company_id, contact_id } })
        .then(num => {
            if (num == 1) res.send({ message: "Company updated successfully." });
            else res.status(404).send({ message: "Company not found for this contact." });
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

// Delete a company for a specific contact
exports.delete = (req, res) => {
    const contact_id = parseInt(req.params.contactId); // Retrieve contact_id from URL
    const company_id = req.params.company_id;

    Company.destroy({ where: { company_id, contact_id } })
        .then(num => {
            if (num == 1) res.send({ message: "Company deleted successfully." });
            else res.status(404).send({ message: "Company not found for this contact." });
        })
        .catch(err => res.status(500).send({ message: err.message }));
};