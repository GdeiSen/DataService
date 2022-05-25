const { Sequelize } = require('sequelize');
const EventEmitter = require('events');
const config = require('../../config.json')
const { createServerModel, increaseCount } = require("../models/AppServerModel")
const { createUserModel } = require("../models/UserModel");
const { createTokenModel } = require("../models/TokenModel")
class DatabaseManager extends EventEmitter {
    async connect() {
        try {
            this.sequelize = new Sequelize(config.SQL_SERVER_AUTH_DB_NAME, config.SQL_SERVER_USER_NAME, config.SQL_SERVER_USER_PASSWORD, {
                dialect: config.SQL_SERVER_DIALECT,
                host: config.SQL_SERVER_HOST,
                logging: false,
            });
            await this.sequelize
                .authenticate()
                .then(() => { console.log('⬜ DataBase Connection Is Enable'); this.status = 'online'; })
                .catch(error => { console.error('🟥 Unable to connect to the database:', error); this.status = 'offline' })
        } catch (error) { console.log('🟥 DataBase Connection Error!'); this.status = 'offline'; console.log(error) }
    }

    async createTables(options) {
        this.userModel = await createUserModel(this.sequelize)
        this.tokenModel = await createTokenModel(this.sequelize)
        this.serverModel = await createServerModel(this.sequelize);
        this.userModel.hasOne(this.tokenModel, { onDelete: "cascade"});
        this.tokenModel.belongsTo(this.userModel);
        if (options.sync == true) this.sequelize.sync({ force: true }).then(() => { console.log("⬜ Tables have been created and sync"); }).catch(err => console.log(err))
        else console.log("⬜ Tables have been created");
    }

}
exports.DatabaseManager = DatabaseManager;