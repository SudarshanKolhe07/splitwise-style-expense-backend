const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.get('/balances', async (_, res) => {
  const expenses = await Expense.find();
  const balances = {};

  expenses.forEach(exp => {
    const share = exp.amount / exp.participants.length;
    exp.participants.forEach(p => {
      if (!balances[p]) balances[p] = 0;
      balances[p] -= share;
    });
    if (!balances[exp.paid_by]) balances[exp.paid_by] = 0;
    balances[exp.paid_by] += exp.amount;
  });

  res.json(balances);
});

router.get('/people', async (_, res) => {
  const expenses = await Expense.find();
  const people = new Set();
  expenses.forEach(exp => {
    people.add(exp.paid_by);
    exp.participants.forEach(p => people.add(p));
  });
  res.json([...people]);
});

// Simple settlement summary
router.get('/settlements', async (_, res) => {
  const balances = {};
  const expenses = await Expense.find();

  expenses.forEach(exp => {
    const share = exp.amount / exp.participants.length;
    exp.participants.forEach(p => {
      if (!balances[p]) balances[p] = 0;
      balances[p] -= share;
    });
    if (!balances[exp.paid_by]) balances[exp.paid_by] = 0;
    balances[exp.paid_by] += exp.amount;
  });

  const creditors = [];
  const debtors = [];

  for (let [person, balance] of Object.entries(balances)) {
    if (balance > 0) creditors.push({ person, balance });
    else if (balance < 0) debtors.push({ person, balance: -balance });
  }

  const settlements = [];
  creditors.sort((a, b) => b.balance - a.balance);
  debtors.sort((a, b) => b.balance - a.balance);

  while (creditors.length && debtors.length) {
    const creditor = creditors[0];
    const debtor = debtors[0];
    const amount = Math.min(creditor.balance, debtor.balance);
    settlements.push({ from: debtor.person, to: creditor.person, amount });

    creditor.balance -= amount;
    debtor.balance -= amount;

    if (creditor.balance === 0) creditors.shift();
    if (debtor.balance === 0) debtors.shift();
  }

  res.json(settlements);
});

module.exports = router;
