const router = require('express').Router();
let Warehouse = require('../models/warehouse.model');

// Get all warehouses
router.route('/').get((req, res) => {
  Warehouse.find()
    .then(warehouses => res.json(warehouses))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add new warehouse
router.route('/add').post((req, res) => {
  const location = req.body.location;
  const products = req.body.products;  // array of product IDs

  const newWarehouse = new Warehouse({
    location,
    products,
  });

  newWarehouse.save()
    .then(() => res.json('Warehouse added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get warehouse by ID
router.route('/:id').get((req, res) => {
  Warehouse.findById(req.params.id)
    .then(warehouse => res.json(warehouse))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete warehouse by ID
router.route('/:id').delete((req, res) => {
  Warehouse.findByIdAndDelete(req.params.id)
    .then(() => res.json('Warehouse deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update warehouse by ID
router.route('/update/:id').post((req, res) => {
  Warehouse.findById(req.params.id)
    .then(warehouse => {
      warehouse.location = req.body.location;
      warehouse.products = req.body.products;

      warehouse.save()
        .then(() => res.json('Warehouse updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
