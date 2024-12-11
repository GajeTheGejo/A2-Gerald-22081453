module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        customer_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        customer_name: {
            type: Sequelize.STRING,
            allowNull: false, // Ensure name is provided
        },
        customer_email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true, // Ensure the email is unique
            validate: {
                isEmail: true, // Validate email format
            },
        },
    });

    // Adding timestamp fields automatically
    Customer.associate = function (models) {
        // A customer can have many orders
        Customer.hasMany(models.Order, { foreignKey: 'customer_id' });
    };

    return Customer;
};
