import { connectToDB } from "@/libs/database";
import { verifyJWT } from "@/libs/JWT";
import Product from "@/models/productModel";

export const GET = async (req) => {
  try {
    await connectToDB();

    // Fetch all products sorted by creation date (newest first)
    const products = await Product.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Failed to fetch Products" }), { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    await connectToDB();

    // Extract and verify JWT token from authorization header
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return new Response(JSON.stringify({ error: "No token provided" }), {
        status: 401,
      });
    }

    const decoded = verifyJWT(token);

    if (!decoded) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 403,
      });
    }

    const body = await req.json();
    const { productName, description, price, imageUrl, category, sellersInfo } =
      body;

    const newProduct = new Product({
      productName,
      description,
      price,
      imageUrl,
      category,
      sellersInfo,
      creator: decoded.id,
    });

    await newProduct.save();

    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create Product" }), {
      status: 500,
    });
  }
};
