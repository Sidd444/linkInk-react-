const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    itemsOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orders' }],
    verifyToken: String,
    verifyTokenExpiry: Date,
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET); 

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
};

const User = mongoose.models.users || mongoose.model("users", userSchema);

module.exports = User;
