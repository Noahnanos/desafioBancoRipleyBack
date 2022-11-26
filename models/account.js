const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema(
    {
        balance: { type: Number, default: 200000 },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
        recipients: [{type: mongoose.Types.ObjectId}]
    },
    { timestamps: true }
); 

const model = mongoose.model('account', accountSchema);

module.exports = model;