const mongoose=require("mongoose");

const orderSchema = new mongoose.Schema({
    ownedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    isSet: {
        type: Boolean, //if isSet and owned by then redirect to given link
        default: false //is linkedTo is not null then true
    },
    elementId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    linkedTo: {
        type: String
    },
    address: {
        type: String
    },
    pincode: {
        type: Number
    },
    phoneNo: {
        type: Number
    },
}, {createdAt: true})

const Order = mongoose.models.orders || mongoose.model("orders", orderSchema)



module.exports = Order
