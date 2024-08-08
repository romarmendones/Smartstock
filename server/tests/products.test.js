const request = require('supertest');
const app = require('../index');  // assuming your Express app is exported from index.js
const mongoose = require('mongoose');
const Product = require('../models/product.model');

describe('Products API', () => {
  beforeAll(async () => {
    // Connect to test database
    const url = `mongodb://127.0.0.1/test_db`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterEach(async () => {
    // Clear the test database
    await Product.deleteMany();
  });

  afterAll(async () => {
    // Disconnect from the database
    await mongoose.connection.close();
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/products/add')
      .send({
        name: 'Test Product',
        price: 100,
        quantity: 10
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Test Product');
  });

  it('should fetch all products', async () => {
    const product = new Product({ name: 'Test Product', price: 100, quantity: 10 });
    await product.save();

    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('name', 'Test Product');
  });

  // Add more tests as needed
});
