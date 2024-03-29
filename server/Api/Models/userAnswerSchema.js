const mongoose = require('mongoose');

const userAnswerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    answer: { type: String, required: true },
});

module.exports = mongoose.model('UserAnswer', userAnswerSchema);
