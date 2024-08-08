const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
const productsRouter = require('./routes/products');
const salesRouter = require('./routes/sales');
const warehouseRouter = require('./routes/warehouse');

app.use('/products', productsRouter);
app.use('/sales', salesRouter);
app.use('/warehouse', warehouseRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
