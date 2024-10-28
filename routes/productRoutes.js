const express = require('express');
const {allProduct, getProductById,createProduct,updateProduct, deleteProduct } = require('../controllers/productController');

const {protect,admin } = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/', allProduct);
router.get('/:id',getProductById);
router.post('/',protect, admin,createProduct );
router.put('/:id',protect, admin,updateProduct );
router.delete('/:id',protect, admin,deleteProduct);

module.exports = router;