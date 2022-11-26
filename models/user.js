const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    rut: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const model = mongoose.model('user', userSchema);

module.exports = model;