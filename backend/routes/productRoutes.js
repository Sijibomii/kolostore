import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  getProductByCollection,
  getProductByCollectionAndCategory,
  getProductByCollectionAndColor,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)
  router
  .route('/collection/:collections')
  .get(getProductByCollection)
  router
  .route('/collection/:collections/:category')
  .get(getProductByCollectionAndCategory)

  router
  .route('/collection/:collections/color/:color')
  .get(getProductByCollectionAndColor)

export default router
