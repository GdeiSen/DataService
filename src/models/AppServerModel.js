const { DataTypes } = require('sequelize');
exports.createServerModel = async function createModel(sequelize) {
    let Server
    Server = sequelize.define(
        'Server',
        {
            ServerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            RequestCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            CommandCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            YTSongCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            YTPlaylistCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            SPSongCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            SPPlaylistCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
        },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: true,

        }
    )
    Server.rawAttributes
    return await Server;
}


