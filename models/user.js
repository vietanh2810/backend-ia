// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: "user" 
        },
        preferences: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ''
        },
    });

    User.associate = function(models) {
        User.hasMany(models.Recipe, {
            foreignKey: 'userId'
        });
        User.hasMany(models.Rating, {
            foreignKey: 'userId'
        });
    };

    return User;
};
