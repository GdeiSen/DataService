const { DatabaseManager } = require('./managers/databaseManager');
const { RouterManager } = require('./managers/routerManager');
const { ConnectionManager } = require('../../../RabbitMQConnectionUtil/index')
const config = require('../config.json')
exports.Agent = class Agent {
    constructor() {
        this.connectionManager = new ConnectionManager({
            consumeOn: config.CONSUMER_QUEUE,
            dispatchTo: config.GATEWAY_QUEUE,
            showInfoTable: true,
            name: "APP"
        });
        this.databaseManager = new DatabaseManager();
        this.routerManager = new RouterManager(this);
    }
    connect() {
        this.connectionManager.connect();
        this.databaseManager.connect();
        this.databaseManager.createTables({ sync: true });
        this.routerManager.createRouter();
    }
}