const mongoose = require('mongoose');
const { Schema } = mongoose;

const tranfersSchema = new Schema(
  {
    mount: { type: Number, required: true },
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'recipient', required: true },
  },
  { timestamps: true }
);

const model = mongoose.model('tranfers', tranfersSchema);

module.exports = model;