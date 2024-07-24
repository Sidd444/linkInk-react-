const mongoose=require("mongoose");

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Product = mongoose.models.products || mongoose.model("products", productSchema)

module.exports = Product