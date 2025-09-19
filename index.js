import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

let usageCount = 0;

// Mock financial data (Pathway)
let financialData = {
  engineers: 5,
  marketing: 20000,
  productPrice: 100,
  revenue: 50000,
  expenses: 30000
};

// Simulate scenario
app.post('/api/simulate', (req, res) => {
  usageCount++;
  const { engineers, marketing, productPrice } = req.body;
  // Simple simulation logic
  const expenses = (engineers * 5000) + marketing;
  const revenue = productPrice * 500; // Assume 500 units sold
  const profit = revenue - expenses;
  res.json({
    forecast: {
      engineers,
      marketing,
      productPrice,
      expenses,
      revenue,
      profit
    },
    usageCount,
    flexpriceBill: 10 // mock billing per scenario
  });
});

// Export report
app.post('/api/export', (req, res) => {
  usageCount++;
  // mock report export
  res.json({
    reportUrl: 'https://mock-report-url.com/report123',
    usageCount,
    flexpriceBill: 5 // mock billing per report
  });
});

// Get usage count
app.get('/api/usage', (req, res) => {
  res.json({ usageCount });
});

// Get financial data (Pathway)
app.get('/api/financial-data', (req, res) => {
  res.json(financialData);
});

// Update financial data (simulate Pathway update)
app.post('/api/financial-data', (req, res) => {
  financialData = { ...financialData, ...req.body };
  res.json(financialData);
});

app.listen(4000, () => {
  console.log('Backend running on port 4000');
});
