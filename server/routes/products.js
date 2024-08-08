const router = require('express').Router();
let Product = require('../models/product.model');

// Get all products
router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add new product
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const price = Number(req.body.price);
  const quantity = Number(req.body.quantity);

  const newProduct = new Product({
    name,
    price,
    quantity,
  });

  newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get product by ID
router.route('/:id').get((req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));
});
const auth = require('../middleware/auth');
const role = require('../middleware/role');
// Apply middleware to all product routes
router.route('/').get(auth, role(['admin', 'manager']), (req, res) => {
  // route logic
});

// Apply middleware to add product route
router.route('/add').post(auth, role(['admin', 'manager']), (req, res) => {
  // route logic
});

// Delete product by ID
router.route('/:id').delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json('Product deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update product by ID
router.route('/update/:id').post((req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      product.name = req.body.name;
      product.price = Number(req.body.price);
      product.quantity = Number(req.body.quantity);

      product.save()
        .then(() => res.json('Product updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
