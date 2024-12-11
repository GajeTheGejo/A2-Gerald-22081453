module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        order_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        order_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW, // Auto-set the current timestamp
        },
        customer_id: {
            type: Sequelize.INTEGER,
            allowNull: false, // Ensure a customer is linked to every order
            references: {
                model: "customers", // Reference the "customers" table
                key: "customer_id",
            },
        },
        item_id: {
            type: Sequelize.INTEGER,
            allowNull: false, // Ensure an item is linked to every order
            references: {
                model: "items", // Reference the "items" table
                key: "item_id",
            },
        },
    });

    return Order;
};