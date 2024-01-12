//importing modules
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    //   host: "dpg-cj199pa7l0ft7nl7lot0-a",
    //   port: 5432,
    //   database: "acpostgresdb",
    //   username: "honzikoi",
    //   password: "fP4nPtvwM6dzuNMDRhRE0niKhaU5pUqt",
    host: "localhost",
    port: 5432,
    database: "postgres",
    username: "postgres",
    password: "ChangeMe@123",
    dialect: "postgres",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});


// Test the connection
sequelize
    .authenticate()
    .then(async () => {
        console.log("Connection has been established successfully.");
    })
    .catch(async (error) => {
        console.error("Unable to connect to the database:", error);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables

db.recipes = require("./recipe")(sequelize, DataTypes);
db.userFavorites = require("./userFavorites")(sequelize, DataTypes);
db.ratings = require("./rating")(sequelize, DataTypes);
db.users = require("./user")(sequelize, DataTypes);

db.users.hasMany(db.recipes, {
    foreignKey: 'userId'
});
db.recipes.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'user'
});

db.recipes.hasMany(db.ratings, {
    foreignKey: 'recipeId'
});
db.ratings.belongsTo(db.recipes, {
    foreignKey: 'recipeId',
    as: 'recipe'
});

module.exports = db;