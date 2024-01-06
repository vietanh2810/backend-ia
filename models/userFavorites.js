// models/userFavorites.js
module.exports = (sequelize, DataTypes) => {
    const UserFavorites = sequelize.define('user_favorites', {
        userId: {
            type: DataTypes.INTEGER,
            references: { model: 'users', key: 'id' } 
        },
        recipeId: {
            type: DataTypes.INTEGER,
            references: { model: 'recipes', key: 'id' } 
        }
    });

    UserFavorites.associate = function (models) {
        UserFavorites.belongsTo(models.User, { foreignKey: 'userId' });
        UserFavorites.belongsTo(models.Recipe, { foreignKey: 'recipeId' });
    };

    return UserFavorites;
};

