let databaseManager;

exports.TokenController = class TokenController {
    constructor(agent) {
        databaseManager = agent.databaseManager
    }

    async findToken(request, responce) {
        try {
            let token = await databaseManager.tokenModel.findOne({ where: request.where });
            responce.send(token)
        } catch (err) { responce.error(toString(err)) }
    }

    async updateToken(request, responce) {
        try {
            const newToken = await databaseManager.tokenModel.findOne({ where: request.where });
            newToken.set(request.setValues);
            await newToken.save();
            responce.send(newToken)
        } catch (err) { responce.error(err.toString()) }
    }

    async deleteToken(request, responce) {
        try {
            const token = await databaseManager.tokenModel.findOne({ where: request.where });
            databaseManager.tokenModel.destroy({
                where: request.where
            });
            responce.send(token)
        } catch (err) { console.log(err); responce.error(err.toString()) }
    }

    async createToken(request, responce) {
        try {
            const newToken = databaseManager.tokenModel.build(request.token);
            await newToken.save();
            responce.send(newToken)
        } catch (err) { responce.error(err.toString()) }
    }
}
