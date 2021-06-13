const { sequelize } = require("../db/config");

module.exports = {
  getAll: async () => {
    const {
      models: { user },
    } = sequelize;
    return await user.findAll();
  },
};
