let databaseManager

exports.UserController = class UserController {
    constructor(agent) {
        databaseManager = agent.databaseManager;
    }
    async createUser(request, responce) {
        try {
            let userModel = databaseManager.userModel;
            const newUser = userModel.build(request.user);
            await newUser.save();
            responce.send(newUser)
        } catch (err) { responce.error(err.toString()) }
    }

    async updateUser(request, responce) {
        try {
            const user = await databaseManager.userModel.findOne({ where: request.where });
            user.set(request.setValues);
            await user.save();
            responce.send(user)
        } catch (err) { responce.error(err.toString()) }
    }

    async findUser(request, responce) {
        try {
            let userModel = databaseManager.userModel;
            let user = await userModel.findOne({ where: request.where });
            responce.send(user)
        } catch (err) { responce.error(err.toString()) }
    }
}
