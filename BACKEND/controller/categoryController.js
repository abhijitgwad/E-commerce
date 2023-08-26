import CategoryModel from "../models/CategoryModel.js";
import slugify from "slugify";

export const createcategoryController = async (req, res) => {
  try {
    const name = req.body.name;

    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Enter category name",
      });
    }

    const existingcategory = await CategoryModel.findOne({ name });
    if (existingcategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exist!!!",
      });
    }

    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "new category created!!!",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating category ",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category updated Successfully!!",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

//get ALL Category List

export const categoryController = async (req, res) => {
  try {
    const category = await CategoryModel.find({});

    res.status(200).send({
      success: true,
      message: "ALL Category List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while list all category",
    });
  }
};

//get single category

export const singlecategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.find({ slug: req.params.slug });

    res.status(200).send({
      success: true,
      message: "single Category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category!!!",
    });
  }
};

//deleting category

export const deletecategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await CategoryModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Deleted succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting category!!!",
    });
  }
};
