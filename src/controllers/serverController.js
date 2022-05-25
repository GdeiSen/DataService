let databaseManager
exports.ServerController = class ServerController {
    constructor(agent) {
        databaseManager = agent.databaseManager;
    }
    
    async increaseCount(request, responce) {
        try {
            let server = await databaseManager.serverModel.findOne({ where: { serverId: request.serverId } });
            if (!server) {
                const newServer = databaseManager.serverModel.build({
                    ServerId: request.serverId
                })
                await newServer.save()
                server = newServer;
            }
            await databaseManager.serverModel.update({
                [request.state]: (server.dataValues[request.state] + 1)
            }, { where: { ServerId: request.serverId } })
            responce.send(await databaseManager.serverModel.findOne({ where: { serverId: request.serverId } }))
        } catch (err) { console.log(err) }
    }

    async addServer(request, responce) {
        try {
            const newServer = databaseManager.serverModel.build(request.server)
            await newServer.save()
            responce.send(newServer);
        } catch (err) { console.log(err) }
    }
}
