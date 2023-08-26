import slugify from "slugify";
import productModel from "../models/productModel.js";
import CategoryModel from "../models/CategoryModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required!!!" });
      case !description:
        return res.status(500).send({ error: "Description is Required!!!" });
      case !price:
        return res.status(500).send({ error: "Price is Required!!!" });
      case !category:
        return res.status(500).send({ error: "Category is Required!!!" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required!!!" });

      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and sould be less than 1mb!!!" });
    }

    const product = await new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product Created Successfully!!",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while creating product!!",
    });
  }
};

//get product

export const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: product.length,
      message: "ALL products",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while listing all Products!!",
      error: error.message,
    });
  }
};

//get single product

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "single products",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product!!",
      error,
    });
  }
};

//get product photo

export const getPhotoProductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting product photo!!",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Product deleted successfully!!!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product!!",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required!!!" });
      case !description:
        return res.status(500).send({ error: "Description is Required!!!" });
      case !price:
        return res.status(500).send({ error: "Price is Required!!!" });
      case !category:
        return res.status(500).send({ error: "Category is Required!!!" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required!!!" });

      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and sould be less than 1mb!!!" });
    }

    const product = await productModel.findByIdAndUpdate(req.params.pid, {
      ...req.fields,
      slug: slugify(name),
    });

    res.status(200).send({
      success: true,
      message: "Product updated successfully!!!",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating product!!",
      error,
    });
  }
};

export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args).populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    console.log("some error in backend filtering");
    res.status(500).send({
      success: false,
      message: "Error while filtering product!!!",
      error,
    });
  }
};

//count product
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in product count",
      error,
    });
  }
};

//product list based on page

export const productListController = async (req, res) => {
  try {
    const perpage = 3;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .populate("category")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in productlist controller",
      error,
    });
  }
};

//search product
export const productSearchController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const data = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in searching product",
      error,
    });
  }
};

//similer products

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    console.log(products);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in finding related products!!!",
    });
  }
};

//listing product by category

export const productCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in finding Category products!!!",
    });
  }
};
