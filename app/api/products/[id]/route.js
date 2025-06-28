import { connectToDB } from "@/libs/database";
import Product from "@/models/productModel";
import mongoose from "mongoose";

export const GET = async (req, context) => {
  const { id } = context.params;

  try {
    await connectToDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response("Invalid product ID", { status: 400 });
    }

    const product = await Product.findById(id).populate("creator");

    if (!product) return new Response("Product not Found", { status: 404 });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch all products", { status: 500 });
  }
};

export const PATCH = async (req, context) => {
  const { id } = context.params;

  const body = await req.json();

  try {
    await connectToDB();

    const existingProduct = await Product.findById(id);

    if (!existingProduct)
      return new Response("Product not Found!", { status: 404 });

    // Update product with new data
    Object.assign(existingProduct, body);

    await existingProduct.save();

    return new Response(JSON.stringify(existingProduct), { status: 200 });
  } catch (error) {
    console.error(error)
    return new Response("Failed to Update the product", { status: 500 });
  }
};

export const DELETE = async (req, context) => {
  const { id } = context.params;

  try {
    await connectToDB();

    await Product.findByIdAndDelete(id);

    return new Response("Product deleted Succesfully", { status: 200 });
  } catch (error) {
    console.error(error)
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
