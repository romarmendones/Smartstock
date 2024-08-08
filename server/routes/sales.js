const router = require('express').Router();
let Sales = require('../models/sales.model');

// Get all sales
router.route('/').get((req, res) => {
  Sales.find()
    .then(sales => res.json(sales))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add new sale
router.route('/add').post((req, res) => {
  const productId = req.body.productId;
  const quantity = Number(req.body.quantity);
  const totalPrice = Number(req.body.totalPrice);

  const newSales = new Sales({
    productId,
    quantity,
    totalPrice,
  });

  newSales.save()
    .then(() => res.json('Sale added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get sale by ID
router.route('/:id').get((req, res) => {
  Sales.findById(req.params.id)
    .then(sales => res.json(sales))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete sale by ID
router.route('/:id').delete((req, res) => {
  Sales.findByIdAndDelete(req.params.id)
    .then(() => res.json('Sale deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
