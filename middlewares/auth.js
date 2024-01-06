const db = require("../models");
const User = db.users;
const Company = db.companies;
const jwt = require("jsonwebtoken");

function checkAdminRole(req, res, next) {
    const { dataValues } = req.user;

    const role = dataValues.role;

    console.log("role:", role)

    if (role !== "admin") {
        res.status(403).json({
            error: "Unauthorized. Only admin users can perform this action.",
        });
    }
    next();
};


async function saveUser(req, res, next) {
    try {
        const username = await User.findOne({
            where: {
                userName: req.body.userName,
            },
        });
        if (username) {
            return res.status(409).json({ error: 'Username already taken' });
        }
        const emailcheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (emailcheck) {
            return res.status(409).json({ error: 'Email already taken' });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(409).json({ error: 'Authentication failed' });
    }
}


function authenticate(req, res, next) {
    try {
        const token = req.headers.authorization;

        if (token === "" || !token.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ error: "Unauthorized. Missing or invalid token." });
        }
        const authToken = token.slice(7);

        jwt.verify(authToken, process.env.jwtSecret, async (err, decoded) => {
            console.log(err);

            if (err) {
                return res
                    .status(401)
                    .json({ error: "Unauthorized. Invalid or expired token." });
            }
            const user = await User.findByPk(decoded.id);
            req.user = user;
            next();
        });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "An error occurred during user authentication." });
    }
};

module.exports = {
    saveUser,
    authenticate,
    checkAdminRole,
};