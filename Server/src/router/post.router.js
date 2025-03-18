import { Router } from "express";
import { createBlog } from "../controller/post.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router =Router();

router.route('/create-Blog').post(upload.single('imgUrl'),createBlog);

export {router}