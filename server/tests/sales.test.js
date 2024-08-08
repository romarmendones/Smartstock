const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const Sales = require('../models/sales.model');
const Product = require('../models/product.model');

describe('Sales API', () => {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/test_db`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterEach(async () => {
    await Sales.deleteMany();
    await Product.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new sale', async () => {
    const product = new Product({ name: 'Test Product', price: 100, quantity: 10 });
    await product.save();

    const res = await request(app)
      .post('/sales/add')
      .send({
        productId: product._id,
        quantity: 2,
        totalPrice: 200
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('productId', product._id.toString());
  });

  it('should fetch all sales', async () => {
    const product = new Product({ name: 'Test Product', price: 100, quantity: 10 });
    await product.save();

    const sale = new Sales({ productId: product._id, quantity: 2, totalPrice: 200 });
    await sale.save();

    const res = await request(app).get('/sales');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('totalPrice', 200);
  });
});
