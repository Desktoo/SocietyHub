import { model, models, Schema } from "mongoose";

const productSchema = new Schema({
    productName: {
        type: String,
        required: [true, "Product Name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    imageUrl: {
        type: String,
        required: [true, "Image is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    sellersInfo: {
        type: String,
        required: [true, "Seller Information is required"]
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Creator is required"]
    }
},{
    timestamps: true,
})

const Product = models.Product || model("Product", productSchema)

export default Product