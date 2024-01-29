const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: mongoose.Schema.Types.Decimal128, required: true },
    date: { type: Date, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    notes: { type: String },
    isShared: { type: Boolean, default: false }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;