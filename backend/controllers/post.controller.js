import sharp from "sharp";
import cloudinary from "../utils/cloudinary";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;

    if (image) {
      res.status(400).json({ message: "image required" });
    }

    //image upload--------------
    const optimizedImageBuffer = await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    //buffer to data uri-------
    const fileUri = `data:image/jpeg;base64, ${optimizedImageBuffer.toString(
      "base64"
    )}`;
    const cloudResponse = await cloudinary.uploader.upload(fileUri);
    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      auhtor: authorId,
    });

    const user = await User.findById(authorId);

    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    await post.populate({ path: "auhtor", select: "-password" });

    return res.status(201).json({
      message: "New Post Added",
      post,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "auhtor", select: "userName, profilePicture" })
      .populate({
        path: "comment",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "userName, profilePicture",
        },
      });

    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPost = async (req, res) => {
  try {
    const authorId = req.id;
    const posts = await Post.find({ auhtor: authorId })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "userName, profilePicture",
      })
      .populate({
        path: "comment",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "userName, profilePicture",
        },
      });

    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
