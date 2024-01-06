// models/rating.js
module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('rating', {
        rating: DataTypes.INTEGER,
        comment: DataTypes.TEXT,
        createdAt: DataTypes.DATE
    });

    Rating.associate = function (models) {
        Rating.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
        Rating.belongsTo(models.Recipe, {
            foreignKey: 'recipeId',
            as: 'recipe'
        });
    };

    return Rating;
};
