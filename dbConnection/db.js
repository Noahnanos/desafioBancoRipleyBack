const mongoose = require('mongoose');

const connectDataBase = async () => {
  const conexion = await mongoose.connect(process.env.mongo_db);
  console.log('MongoDB connected', conexion.connection.host);
};

module.exports = connectDataBase;
