const { sequelize } = require("../db/config");

const getAll = async () => {
  const {
    models: { incident },
  } = sequelize;
  return await incident.findAll();
};

const get = async (id) => {
  const {
    models: { incident },
  } = sequelize;
  return await incident.findOne({
    where: { id },
  });
};

const create = async (obj) => {
  const {
    models: { incident },
  } = sequelize;
  await incident.create({
    date: obj.date,
    title: obj.title,
    description: obj.description,
    type: obj.type,
    reportedBy: obj.reportedBy,
    createdAt: new Date().toString(),
  });
};

const remove = async (id) => {
  const {
    models: { incident },
  } = sequelize;
  await incident.destroy({
    where: { id },
  });
};

const update = async (id, obj) => {
  const {
    models: { incident },
  } = sequelize;
  await incident.update(
    {
      assignedTo: obj.assignedTo,
    },
    {
      where: { id },
    }
  );
};

module.exports = {
  get,
  create,
  remove,
  getAll,
  update,
};
