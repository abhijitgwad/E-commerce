import express, { urlencoded } from "express";
// import { registerController } from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  categoryController,
  createcategoryController,
  deletecategoryController,
  singlecategoryController,
  updateCategoryController,
} from "../controller/categoryController.js";

const router = express.Router();

//routes

//create category
router.post(
  "/create-category",
  // requireSignIn,
  // isAdmin,
  createcategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getAll category
router.get("/get-category", categoryController);

router.get("/single-category/:slug", singlecategoryController);

router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deletecategoryController
);
export default router;
