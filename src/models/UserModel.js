const { DataTypes, Sequelize } = require('sequelize');
exports.createUserModel = async (sequelize) => {
    let User
    User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: true
            },
            serverId: {
                type: DataTypes.INTEGER,
                foreignKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: 'user'
            },
            isActivated: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 0
            },
            activationLink: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: true,

        }
    )
    User.rawAttributes;
    return await User;
}

// exports.addUser = function addUser(model, user) {
//     let date = new Date
//     model.create({
//         Login: user?.login,
//         Mail: user?.mail,
//         Password: user?.password,
//         Role: user?.role,
//         ServerId: user?.serverId,
//         RegTime: date.getTime
//     });
// }

// exports.deleteUser = function deleteUser(model, id) {
//     model.destroy({ where: { Id: id } });
// }

// exports.updateUser = function updateUser(model, id, editData) {
//     model.update({
//         Login: editData?.login,
//         Mail: editData?.mail,
//         Password: editData?.password,
//         Role: editData?.role,
//         ServerId: editData?.serverId,
//     }, {
//         where: { Id: id }
//     })
// }

// exports.getAllUsers = function getAllUsers(model) {
//     return (model.findAll());
// }

// exports.getUserById = function getUserById(model, id) {
//     return (model.findAll({ where: { Id: id } }));
// }

// exports.getUserByLogin = function etUserByLogin(model, login) {
//     return (model.findAll({ where: { UserLogin: login } }));
// }
