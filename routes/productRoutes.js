const express = require('express');
const {
  allProduct,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authmiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.get('/', allProduct);
router.post('/',protect, admin, upload.single('file'), createProduct);
router.get('/:id', getProductById);
router.put('/:id', protect, admin, upload.single('file'), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
