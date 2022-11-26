const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema(
    {
        username: { type: String, required: true },
        rut: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true },
        bank: { type: String, required: true },
        balance: { type: Number, default: 0 },
        accountType: { type: String, required: true },
        accountNumber: { type: Number, required: true}
    },
    { timestamps: true }
);

const model = mongoose.model('recipient', recipientSchema);

module.exports = model;