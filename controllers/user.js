const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

// Assigning users to the variable User
const User = db.users;

const createDefaultAdmin = async () => {
    try {
        const admin = await User.findOne({ where: { username: "admin" } });

        if (!admin) {
            const password = "test1234";
            const hashedPassword = await bcrypt.hash(password, 10);

            await User.create({
                username: "admin",
                email: "admin@example.com",
                password: hashedPassword,
                role: "admin",
                isValidated: true,
                preferences: "None"
            });

            console.log("Default admin user created.");
        } else {
            console.log("Default admin user already exists.");
        }
    } catch (error) {
        console.error("Error creating default admin user:", error);
    }
};

const signup = async (req, res) => {

    try {
        const { username, email, password } =
            req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: username === "admin" ? "admin" : "user",
        });

        const token = jwt.sign({ id: user.id }, process.env.jwtSecret, {
            expiresIn: "1d",
        });
        res.cookie("jwt", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        /*console.log("User:", JSON.stringify(user, null, 2));
        console.log("Token:", token);*/
        console.log("User created");
        return res.status(201).json(user);
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).send("Internal Server Error");
    }
};

//login authentication

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //find a user by their email
        let user = await User.findOne({
            where: {
                email: email,
            },
        });

        //if user email is found, compare password with bcrypt
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            //if password is the same
            //generate token with the user's id and the secretKey in the env file

            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.jwtSecret, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

                const rawData = user.get();

                user = rawData;

                //send user data
                return res.status(201).send({ token, user });
            } else {
                return res.status(401).send("Authentication failed");
            }
        } else {
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log(error);
    }
};

const { v4: uuidv4 } = require("uuid");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const { dataValues } = req.user;

        const user = await User.findOne({ where: { id: dataValues.id } });

        //unset password
        user.password = undefined;

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error getting user profile:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const createDefaultWebmaster = async () => {
    try {
        const password = "user1234";
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username: "user",
            email: "user10@example.com",
            password: hashedPassword,
            role: "webmaster",
        });
        const user = await User.findOne({ where: { username: "user" } });

        return user.dataValues;
    } catch (error) {
        console.error("Error creating default webmaster :", error);
        return null;
    }
};

const editUser = async (req, res) => {
    try {
        const { dataValues } = req.user;

        const user = await User.findOne({ where: { id: dataValues.id } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { username, email, preferences } = req.body;

        await User.update(
            {
                username: username,
                email: email,
                preferences: preferences,
            },
            {
                where: {
                    id: dataValues.id,
                },
            }
        );

        const newUser = await User.findOne({ where: { id: dataValues.id } });

        return res.status(200).json({ message: "User updated", user: newUser });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    signup,
    login,
    getAllUsers,
    createDefaultAdmin,
    createDefaultWebmaster,
    getUserProfile,
    editUser
};