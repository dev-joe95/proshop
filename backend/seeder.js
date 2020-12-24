import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import db from "./startup/db.js";
import User from "./models/user.js";
import Product from "./models/product.js";
import Category from "./models/category.js";
import bcrypt from "bcryptjs";

dotenv.config();
db();

const categories = [
    {
        name: "Mobiles",
    },
    {
        name: "Accessories",
    },
    {
        name: "High-Tech",
    },
];

const users = [
    {
        name: "Admin",
        email: "admin@example.com",
        password: bcrypt.hashSync("ahmed123456", 10),
        isAdmin: true,
    },
    {
        name: "Hesham",
        email: "h.hesham90@example.com",
        password: bcrypt.hashSync("hesham123456", 10),
    },
    {
        name: "Ramy",
        email: "ali.ramy78@example.com",
        password: bcrypt.hashSync("ramy123456", 10),
    },
];

const products = [
    {
        name: "Airpods Wireless Bluetooth Headphones",
        image: "/images/airpods.jpg",
        description:
            "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
        brand: "Apple",
        category: "Electronics",
        price: 89.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: "iPhone 11 Pro 256GB Memory",
        image: "/images/phone.jpg",
        description:
            "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
        brand: "Apple",
        category: "Electronics",
        price: 599.99,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
    },
    {
        name: "Cannon EOS 80D DSLR Camera",
        image: "/images/camera.jpg",
        description:
            "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
        brand: "Cannon",
        category: "Electronics",
        price: 929.99,
        countInStock: 5,
        rating: 3,
        numReviews: 12,
    },
    {
        name: "Sony Playstation 4 Pro White Version",
        image: "/images/playstation.jpg",
        description:
            "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
        brand: "Sony",
        category: "Electronics",
        price: 399.99,
        countInStock: 11,
        rating: 5,
        numReviews: 12,
    },
    {
        name: "Logitech G-Series Gaming Mouse",
        image: "/images/mouse.jpg",
        description:
            "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
        brand: "Logitech",
        category: "Electronics",
        price: 49.99,
        countInStock: 7,
        rating: 3.5,
        numReviews: 10,
    },
    {
        name: "Amazon Echo Dot 3rd Generation",
        image: "/images/alexa.jpg",
        description:
            "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
        brand: "Amazon",
        category: "Electronics",
        price: 29.99,
        countInStock: 0,
        rating: 4,
        numReviews: 12,
    },
];

const insertData = async () => {
    try {
        await User.deleteMany();
        await Category.deleteMany();
        await Product.deleteMany();

        const newUsers = await User.insertMany(users);
        const adminUser = newUsers[0]._id;
        const newCat = await Category.insertMany(categories);
        const cat = newCat[Math.random(0, 2)]._id;
        
        const sampleProducts = products.map((p) => {
            return { ...p, user: adminUser, category: cat };
        });
        await Product.insertMany(sampleProducts);

        console.log("Data imported".green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error.message}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        console.log("Data destroyed".red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error.message}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    insertData();
}
