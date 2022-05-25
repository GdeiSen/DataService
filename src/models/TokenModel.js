const { DataTypes, STRING } = require('sequelize');
exports.createTokenModel = async (sequelize) => {
    let Token
    Token = sequelize.define(
        'Token',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            refreshToken: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false,

        }
    )
    Token.rawAttributes;
    return await Token;
}


