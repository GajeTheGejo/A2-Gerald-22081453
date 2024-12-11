module.exports = app => {
    const companies = require("../controllers/company.controller.js");

    const router = require("express").Router();

    // Create a new company
    router.post("/contacts/:contactId/companies", companies.create);
    
    // Fetch companies for a specific contact
    router.get("/contacts/:contactId/companies", companies.findAll);

    // Retrieve a single company for a specific contact
    router.get("/contacts/:contactId/companies/:company_id", companies.findOne);

    // Update a company for a specific contact
    router.put("/contacts/:contactId/companies/:company_id", companies.update);

    // Delete a company for a specific contact
    router.delete("/contacts/:contactId/companies/:company_id", companies.delete);

    app.use('/api', router);
};