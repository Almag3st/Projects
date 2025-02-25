const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground(
            {
                author: '6059948b985809c5464e08ff',
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                images: [
                    {
                        url: 'https://res.cloudinary.com/djlnbrccx/image/upload/v1616452337/YelpCamp/jadcgxq4qgjn9ycrznjj.jpg',
                        filename: 'YelpCamp/jadcgxq4qgjn9ycrznjj'
                    },
                    {
                        url: 'https://res.cloudinary.com/djlnbrccx/image/upload/v1616452337/YelpCamp/yrhahu8yzyyerym02ey7.jpg',
                        filename: 'YelpCamp/yrhahu8yzyyerym02ey7'
                    }
                ],
                geometry: {
                    type: "Point",
                    coordinates: [cities[random1000].longitude,
                    cities[random1000].latitude,]
                },
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus corrupti impedit beatae harum numquam culpa temporibus alias adipisci inventore aperiam repudiandae sunt similique, architecto vitae magnam? Blanditiis eum enim sequi.",
                price,
            }
        )
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
}

);