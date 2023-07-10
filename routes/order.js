const express = require('express');    

const path = require('path');

const contactController = require('../controllers/order')

const router = express.Router();

router.post('/add-order',contactController.postAddOrders)

router.get('/get-order',contactController.getAddOrders)

router.delete('/delete-order/:id',contactController.postDeleteOrders)

module.exports=router;