const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Add Expense
router.post('/', async (req, res) => {
  try {
    const { amount, description, paid_by, participants } = req.body;
    const newExpense = new Expense({ amount, description, paid_by, participants });
    const saved = await newExpense.save();
    res.status(201).json({ success: true, data: saved, message: 'Expense added successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get all expenses
router.get('/', async (_, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// Update expense
router.put('/:id', async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete expense
router.delete('/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Expense deleted' });
});

module.exports = router;
