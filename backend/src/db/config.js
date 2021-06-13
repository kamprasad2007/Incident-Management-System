const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports.Connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connection has been established successfully.!");
  } catch (error) {
    console.log(error);
    process.exit(error);
  }
};

module.exports.sequelize = sequelize;
