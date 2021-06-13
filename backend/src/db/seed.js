const { sequelize } = require("./config");
const incident = require("../models/incident.model")(sequelize);
const user = require("../models/user.model")(sequelize);

module.exports = async () => {
  await sequelize.sync({ force: true });

  const {
    models: { user: User },
  } = sequelize;

  User.create({
    name: "Alexandra",
    role: "admin",
    email: "Alexandra@gmail.com",
  });

  User.create({
    name: "Nicola",
    role: "admin",
    email: "Nicola@gmail.com",
  });

  User.create({
    name: "Jane",
    role: "user",
    email: "Jane@gmail.com",
  });

  User.create({
    name: "Mary",
    role: "user",
    email: "Mary@gmail.com",
  });
};
