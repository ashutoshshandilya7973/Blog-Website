import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();


cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDIARY_API_SECRET
});

const uploadOnCloud = async (file) => {
   try {
      if (!file) {
         console.log("No file found");
         return null;
      }

      const result = await cloudinary.uploader.upload(file, {
         resource_type: "auto"
      });

      fs.unlinkSync(file)
     
      return result;
   } catch (error) {
      console.error("Cloudinary Upload Error:", error);

      fs.unlinkSync(file);

   }
};

export { uploadOnCloud };
