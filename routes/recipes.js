//importing modules
const express = require("express");
const { authenticate } = require("../middlewares/auth");

const {getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe, getRecipeRecommendation, getPairingRecommendation, addRecipeToFavorites } = require("../controllers/recipe");

const router = express.Router();

//get all users
router.get(
    "/",
    authenticate,
    (req, res) => {
        getAllRecipes(req, res).catch((error) => {
            res.status(500).json({ error: "Internal Server Error" });
        });
    }
);

router.get(
    "/:id",
    authenticate,
    (req, res) => {
        getRecipeById(req, res).catch((error) => {
            res.status(500).json({ error: "Internal Server Error" });
        });
    }
);

router.post(
    "/",
    authenticate,
    (req, res) => {
        createRecipe(req, res).catch((error) => {
            res.status(500).json({ error: "Internal Server Error" });
        });
    }
);

router.put(
    "/:id",
    authenticate,
    (req, res) => {
        updateRecipe(req, res).catch((error) => {
            res.status(500).json({ error: "Internal Server Error" });
        });
    }
);

router.delete(
    "/:id",
    authenticate,
    (req, res) => {
        deleteRecipe(req, res).catch((error) => {
            res.status(500).json({ error: "Internal Server Error" });
        });
    }
);

router.post(
    "/suggest",
    authenticate,
    (req, res) => {
        getRecipeRecommendation(req, res).catch((error) => {
            res.status(500).json({ error: "Internal Server Error" });
        });
    }
);

router.post(
    "/pairings",
    authenticate,
    (req, res) => {
        getPairingRecommendation(req, res).catch((error) => {
            res.status(500).json({ error: "Internal Server Error" });
        });
    }
)

router.post(
    "/favorites",
    authenticate,
    (req, res) => {
        addRecipeToFavorites(req, res).catch((error) => {
            res.status(500).json({ error: "Internal Server Error" });
        });
    }
);

router.post(
    "/:id/ratings",
    authenticate,
    (req, res) => {
        rateRecipe(req, res).catch((error) => {
            res.status(500).json({ error: "Internal Server Error" });
        });
    }
)

module.exports = router;