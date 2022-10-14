import express from 'express'
import { getProductById, getProducts } from '../controllers/productController.js'
// import Product from '../models/productModel.js'
// import asyncHandler from 'express-async-handler'

const router = express.Router()


router.route('/').get(getProducts)
router.route('/:id').get(getProductById)


// router.get('/')


export default router