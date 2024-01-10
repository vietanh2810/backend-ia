const db = require("../models");
const defaultRecipes = require("../fakeData/recipe");
const { OpenAI } = require("openai");

const Recipe = db.recipes;
const UserFavorites = db.userFavorites;
const Rating = db.ratings;
// Assume the remaining recipes are similarly structured and added to this array


const createDefaultRecipe = async () => {
    try {
        await Recipe.bulkCreate(defaultRecipes);
    } catch (error) {
        console.error("Error creating default recipe:", error);
    }
}

const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.findAll();
        return res.status(200).json(recipes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ where: { id: req.params.id } });
        return res.status(200).json(recipe);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createRecipe = async (req, res) => {
    try {
        const { dataValues } = req.user;

        const userId = dataValues.id;

        const { name, description, instructions, prepTime, cookTime, servings, category, season, imageURL } = req.body;
        const recipe = await Recipe.create(
            {
                name: name,
                description: description,
                instructions: instructions,
                prepTime: prepTime,
                cookTime: cookTime,
                servings: servings,
                category: category,
                season: season,
                imageURL: imageURL,
                userId: userId
            },
        );
        return res.status(200).json(recipe);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ where: { id: req.params.id } });
        const { name, description, instructions, prepTime, cookTime, servings, category, season, imageURL } = req.body;
        await recipe.update(
            {
                name: name || recipe.name,
                description: description || recipe.description,
                instructions: instructions || recipe.instructions,
                prepTime: prepTime || recipe.prepTime,
                cookTime: cookTime || recipe.cookTime,
                servings: servings || recipe.servings,
                category: category || recipe.category,
                season: season || recipe.season,
                imageURL: imageURL || recipe.imageURL,
            },
        );
        return res.status(200).json(recipe);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ where: { id: req.params.id } });
        await recipe.destroy();
        return res.status(200).json({ message: "Recipe deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getRecipeRecommendation = async (req, res) => {
    try {

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const { dataValues } = req.user;

        const preferences = dataValues.preferences;

        const { prompt } = req.body;

        // get list of recipes, each with a name and id
        const recipes = await Recipe.findAll({
            attributes: ["name", "id"],
        });

        const recipeListString = recipes.map(recipe => `${recipe.id}. ${recipe.name}`).join('\n');

        const messages = [
            {
                role: "system",
                content: 
                    `
                        You are a Michelin-starred chef with over 15 years of experience and numerous international culinary awards.
                        Your expertise ranges from classic French cuisine to innovative modern dishes.
                        You're known for your creative flavor combinations and impeccable presentation skills.
                        You gonna get asked for a recipe recommendation from user. From all the recipes from your database and the user preferences,
                        you need to recommend the best recipe for the user.
                        Here is the list of recipes from your database:${recipeListString}.
                        Here are the user's preferences:${preferences}.
                        You have to return/answer with a JSON object only with this format:
                        {
                            "recipeId": 1,
                            "similarRecipeIds": [2, 3, 4, 5],
                            "shoppingList": "Shopping List for [Recipe Name]\\n\\nIngredients:\\n- Ingredient 1\\n- Ingredient 2\\n- Ingredient 3\\n- [Additional ingredients...]"
                        }
                    `
            },
            {
                role: "user",
                content: prompt
            }
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        const response = JSON.parse(completion.choices[0].message.content);
        // const recipe = await Recipe.findOne({ where: { id: response.recipeId } });
        // const similarRecipes = await Recipe.findAll({ where: { id: response.similarRecipeIds } });

        const recipeRecommendation = {
            recipe: response.recipeId,
            similarRecipes: response.similarRecipeIds,
            shoppingList: response.shoppingList
        }
        return res.status(200).json(recipeRecommendation);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getPairingRecommendation = async (req, res) => {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const { recipeId } = req.body;

        const recipe = await Recipe.findOne({ where: { id: recipeId } });

        console.log(recipe)

        const prompt = `Hi Chef, I'm looking for something to pair with ${recipe.name}`;

        const messages = [
            {
                role: "system",
                content: `You are a Michelin-starred chef with over 15 years of experience and numerous international culinary awards.
                        Your expertise ranges from classic French cuisine to innovative modern dishes.
                        You're known for your creative flavor combinations and impeccable presentation skills.
                        You gonna get asked for dishes's pairing recommendation from user.
                        You have to return/answer with a JSON object only with this format:
                        {
                            "recommendation": "Brief text describing the pairing recommendation",
                        }
                        `
            },
            {
                role: "user",
                content: prompt
            }
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        const response = JSON.parse(completion.choices[0].message.content);

        const pairingRecommendation = {
            recommendation: response.recommendation
        }
        return res.status(200).json(pairingRecommendation);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getSeasonRecommendation = async (req, res) => {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const { recipeId } = req.body;

        const recipe = await Recipe.findOne({ where: { id: recipeId } });

        console.log(recipe)

        const prompt = `Hi Chef, I'm looking for something to pair with ${recipe.name} with the current season`;

        const messages = [
            {
                role: "system",
                content: `You are a Michelin-starred chef with over 15 years of experience and numerous international culinary awards.
                        Your expertise ranges from classic French cuisine to innovative modern dishes.
                        You're known for your creative flavor combinations and impeccable presentation skills.
                        You have to give dishes with ingredients of the current season in France and only ingredients of the current season.
                        You gonna get asked for dishes's pairing recommendation from user.
                        You have to return/answer with a JSON object only with this format:
                        {
                            "recommendatioSeason": "Brief text describing the pairing recommendation",
                        }
                        `
            },
            {
                role: "user",
                content: prompt
            }
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        const response = JSON.parse(completion.choices[0].message.content);

        const pairingRecommendation = {
            recommendation: response.recommendation
        }
        return res.status(200).json(pairingRecommendation);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const addRecipeToFavorites = async (req, res) => {
    try {
        const { dataValues } = req.user;

        const userId = dataValues.id;

        const { recipeId } = req.body;

        const recipe = await Recipe.findOne({ where: { id: recipeId } });

        const addToFav = await UserFavorites.create({
            userId: userId,
            recipeId: recipe.id
        });

        return res.status(200).json(addToFav);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const rateRecipe = async (req, res) => {
    try {
        const { dataValues } = req.user;

        const userId = dataValues.id;

        const { recipeId, rating, comment } = req.body;

        const recipe = await Recipe.findOne({ where: { id: recipeId } });

        const ratingCreated = await Rating.create({
            userId: userId,
            recipeId: recipe.id,
            rating: rating,
            comment: comment
        });

        return res.status(200).json(ratingCreated);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createDefaultRecipe,
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeRecommendation,
    addRecipeToFavorites,
    getPairingRecommendation,
    getSeasonRecommendation,
    rateRecipe
};