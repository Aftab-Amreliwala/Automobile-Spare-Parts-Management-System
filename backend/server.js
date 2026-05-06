const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ===== MongoDB =====
mongoose.connect('mongodb://127.0.0.1:27017/automobile')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// ===== Schemas =====
const CategorySchema = new mongoose.Schema({
  categoryId: String,
  categoryName: String,
  photo: String
});
const Category = mongoose.model('Category', CategorySchema);

const ProductSchema = new mongoose.Schema({
  category: String,
  pname: String,
  pdesc: String,
  price: Number,
  qty: Number,
  date: String,
  photo: String
});
const Product = mongoose.model('Product', ProductSchema);

// ===== Multer =====
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ========== CATEGORY APIs ==========

// Add Category
app.post('/api/category', upload.single('photo'), async (req, res) => {
  try {
    await Category.create({
      categoryId: req.body.categoryId,
      categoryName: req.body.categoryName,
      photo: req.file ? req.file.filename : ''
    });
    res.json({ message: 'Category Added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Categories
app.get('/api/category', async (req, res) => {
  try {
    const data = await Category.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Category
app.delete('/api/category/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Category
app.put('/api/category/:id', async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, {
      categoryId: req.body.categoryId,
      categoryName: req.body.categoryName
    });
    res.json({ message: 'Category Updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== PRODUCT APIs ==========

// Add Product
app.post('/api/product', upload.single('photo'), async (req, res) => {
  try {
    console.log('📥 Incoming product data:', req.body);
    console.log('📎 File:', req.file);

    const newProduct = await Product.create({
      category: req.body.category,
      pname: req.body.pname,
      pdesc: req.body.pdesc,
      price: Number(req.body.price),
      qty: Number(req.body.qty),
      date: req.body.date,
      photo: req.file ? req.file.filename : ''
    });

    console.log('✅ Product saved:', newProduct);
    res.json({ message: 'Product Added', product: newProduct });
  } catch (err) {
    console.error('❌ Error saving product:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get All Products
app.get('/api/product', async (req, res) => {
  try {
    const products = await Product.find();
    console.log(`📦 Returning ${products.length} products`);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Product
app.delete('/api/product/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 🔹 ORDER SCHEMA
const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,

  items: [
    {
      pname: String,
      price: Number,
      quantity: Number
    }
  ],

  totalAmount: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 🔹 MODEL
const Order = mongoose.model('Order', orderSchema);

// 🔥 API: CREATE ORDER
app.post('/api/order/create', async (req, res) => {
  try {
    const { name, phone, address, items, totalAmount } = req.body;

    const newOrder = new Order({
      name,
      phone,
      address,
      items,
      totalAmount
    });

    await newOrder.save();

    res.status(201).json({
      message: 'Order saved successfully ✅'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error saving order ❌'
    });
  }
});

// 🔥 OPTIONAL: GET ALL ORDERS (for admin)
app.get('/api/order', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// 🔹 Admin SCHEMA
const adminSchema = new mongoose.Schema({
  email: String,
  password: String
});

const Admin = mongoose.model('Admin', adminSchema);

// 🔥 LOGIN API
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email, password });

    if (admin) {
      res.json({ message: 'Login success', admin});
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// ===== Server =====
app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));