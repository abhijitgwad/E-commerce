import express from "express";
import {
  createProductController,
  deleteProductController,
  getPhotoProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productSearchController,
  relatedProductController,
  updateProductController,
} from "../controller/productController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get all product
router.get("/get-product", getProductController);

//get single product
router.get("/single-product/:slug", getSingleProductController);

//get photo product
router.get("/get-photo/:pid", getPhotoProductController);

//get delete product
router.delete("/delete-product/:pid", deleteProductController);

//updating product
router.post(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//filter products
router.post("/product-filter", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", productSearchController);

//similer products
router.get("/related-product/:pid/:cid", relatedProductController);

//product by category
router.get("/product-category/:slug", productCategoryController);

export default router;
