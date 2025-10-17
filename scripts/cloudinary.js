import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import FoodItem from '../models/FoodItem';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dnac2xtzl',
    secure: true,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vegSpringRollsjpg = await cloudinary.uploader.upload("public/images/vegetable-spring-rolls.jpg");
a
console.log('Uploaded with relative path:', vegSpringRollsjpg.url);

await FoodItem.findByIdAndUpdate(
    {
        id: '64b8f3f4f1d2c9a1b2c3d4e5', // Replace with actual FoodItem _
        image: vegSpringRollsjpg.url
    }
)
 
const url = cloudinary.url(vegSpringRollsjpg.public_id, {
    quality: "auto",
    fetch_format: "auto",
},
{
width: 200,
height: 200,
crop: "fill"
},
{
    secure: true, // Ensure the URL is HTTPS
    gravity: "auto"
}
);

console.log('Transformed URL:', url);