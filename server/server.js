const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes=require('./routes/orderRoutes');

const app = express();


app.use(bodyParser.json());
app.use(cors());


const dbURI = "mongodb+srv://sid:3t19fBPYKNyYX3zy@linkink.ghuqdwu.mongodb.net/?retryWrites=true&w=majority&appName=linkInk";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
