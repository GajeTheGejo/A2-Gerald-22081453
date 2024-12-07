module.exports = app => {
    const companies = require("../controllers/company.controller.js");

    const router = require("express").Router();

    // Create a new company
    router.post("/companies", companies.create);

    // Retrieve all companies
    router.get("/companies", companies.findAll);

    // Retrieve a single company by ID
    router.get("/companies/:company_id", companies.findOne);

    // Update a company by ID
    router.put("/companies/:company_id", companies.update);

    // Delete a company by ID
    router.delete("/companies/:company_id", companies.delete);

    app.use('/api', router);
};