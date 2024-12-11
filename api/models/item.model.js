module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        item_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        item_name: {
            type: Sequelize.STRING,
            allowNull: false, // Ensure a name is always provided
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false, // Ensure a price is always provided
        },
    });

    return Item;
};