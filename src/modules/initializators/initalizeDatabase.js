const { sequelize } = require('../../data/models/index');
const db = require('../../data/models/index');

class InitializeDatabase {
    async init(allowedSync) {
        try {
            await sequelize.authenticate();
            console.log('Connected to postgres SQL database ✅');
            allowedSync && await sequelize.sync({
                force: true
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = InitializeDatabase;