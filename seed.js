const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const Product = require('./models/Product');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data
    await Admin.deleteMany();
    await Product.deleteMany();

    // Create Admin
    const admin = await Admin.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
    });

    console.log('Admin created:', admin.email);

    // Create Sample Products
    const products = [
      {
        name: 'Pure Silk Banarasi Saree',
        slug: 'pure-silk-banarasi-saree',
        category: 'saree',
        description: 'A beautiful handcrafted Banarasi silk saree with intricate zari work.',
        price: 5999,
        discountPrice: 4999,
        images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800'],
        fabric: 'Silk',
        color: 'Red',
        work: 'Zari',
        occasion: 'Wedding',
        blouseIncluded: 'Yes',
        stock: 10,
        rating: 4.8,
      },
      {
        name: 'Cotton Floral Printed Kurti',
        slug: 'cotton-floral-printed-kurti',
        category: 'kurti',
        description: 'Comfortable cotton kurti with beautiful floral prints, perfect for casual wear.',
        price: 1299,
        discountPrice: 899,
        images: ['https://images.unsplash.com/photo-1595776613215-fe04b78de7d0?auto=format&fit=crop&q=80&w=800'],
        fabric: 'Cotton',
        color: 'Pink',
        kurtiType: 'Straight',
        sleeveType: 'Half',
        neckType: 'Round',
        size: ['S', 'M', 'L', 'XL'],
        stock: 25,
        rating: 4.5,
      },
      {
        name: 'Designer Anarkali Kurti',
        slug: 'designer-anarkali-kurti',
        category: 'kurti',
        description: 'Elegant Anarkali style kurti with heavy embroidery work.',
        price: 2499,
        discountPrice: 1999,
        images: ['https://images.unsplash.com/photo-1617175548998-573e6bdacfd4?auto=format&fit=crop&q=80&w=800'],
        fabric: 'Rayon',
        color: 'Blue',
        kurtiType: 'Anarkali',
        sleeveType: 'Full',
        neckType: 'V Neck',
        size: ['M', 'L', 'XL', 'XXL'],
        stock: 15,
        rating: 4.7,
      },
      {
        name: 'Organza Party Wear Saree',
        slug: 'organza-party-wear-saree',
        category: 'saree',
        description: 'Lightweight and stylish organza saree for parties.',
        price: 3499,
        discountPrice: 2999,
        images: ['https://images.unsplash.com/photo-1610189012906-40733a763863?auto=format&fit=crop&q=80&w=800'],
        fabric: 'Organza',
        color: 'Green',
        work: 'Printed',
        occasion: 'Party',
        blouseIncluded: 'Yes',
        stock: 8,
        rating: 4.6,
      }
    ];

    await Product.insertMany(products);
    console.log('Products seeded!');

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
