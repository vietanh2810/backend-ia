// models/recipe.js
module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define('recipe', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        instructions: DataTypes.TEXT,
        prepTime: DataTypes.INTEGER,
        cookTime: DataTypes.INTEGER,
        servings: DataTypes.INTEGER,
        category: DataTypes.STRING,
        season: DataTypes.STRING,
        imageURL: DataTypes.STRING
    });

    Recipe.associate = function(models) {
        Recipe.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
        Recipe.hasMany(models.Rating, {
            foreignKey: 'recipeId'
        });
        // Recipe.hasOne(models.Pairing, {
        //     foreignKey: 'recipeId'
        // });
        Recipe.belongsToMany(models.Ingredient, {
            through: 'RecipeIngredients',
            foreignKey: 'recipeId',
            otherKey: 'ingredientId'
        });
    };

    return Recipe;
};
