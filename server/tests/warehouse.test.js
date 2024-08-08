const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const Warehouse = require('../models/warehouse.model');
const Product = require('../models/product.model');

describe('Warehouse API', () => {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/test_db`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterEach(async () => {
    await Warehouse.deleteMany();
    await Product.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new warehouse', async () => {
    const res = await request(app)
      .post('/warehouse/add')
      .send({
        location: 'Test Location',
        products: []
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('location', 'Test Location');
  });

  it('should fetch all warehouses', async () => {
    const warehouse = new Warehouse({ location: 'Test Location', products: [] });
    await warehouse.save();

    const res = await request(app).get('/warehouse');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('location', 'Test Location');
  });
});
