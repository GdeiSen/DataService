const { ServerController } = require('../controllers/serverController');
const { UserController } = require('../controllers/userController');
const { TokenController } = require('../controllers/tokenController')
exports.RouterManager = class RouterManager {
    constructor(agent) {
        this.agent = agent;
        this.connectionManager = agent.connectionManager;
        this.RequestEmitter = agent.connectionManager.RequestEmitter
        this.ResolverEmitter = agent.connectionManager.ResolveEmitter
        this.serverController = new ServerController(agent);
        this.userController = new UserController(agent);
        this.tokenController = new TokenController(agent);
    }
    createRouter() {
        this.connectionManager.addRoute('increaseCountState', this.serverController.increaseCount);
        this.connectionManager.addRoute('createUser', this.userController.createUser);
        this.connectionManager.addRoute('findUser', this.userController.findUser);
        this.connectionManager.addRoute('findToken', this.tokenController.findToken);
        this.connectionManager.addRoute('updateToken', this.tokenController.updateToken);
        this.connectionManager.addRoute('deleteToken', this.tokenController.deleteToken);
        this.connectionManager.addRoute('updateUser', this.userController.updateUser);
        this.connectionManager.addRoute('createToken', this.tokenController.createToken);
        this.connectionManager.addRoute('handshake', (request, responce) => { responce.send('Handshake!') });
    }
}