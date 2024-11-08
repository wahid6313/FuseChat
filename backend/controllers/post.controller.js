import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";

export const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;

    if (!image) {
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
      author: authorId,
    });

    const user = await User.findById(authorId);

    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    await post.populate({ path: "author", select: "-password" });

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
      .populate({ path: "author", select: "userName, profilePicture" })
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

export const likePost = async (req, res) => {
  try {
    const likeKarneWalaUserId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "There is no Post",
        success: false,
      });
    }

    //likes logic------
    await post.updateOne({ $addToSet: { likes: likeKarneWalaUserId } });
    await post.save();

    //implementing socket io for real time notifications----

    return res.status(200).json({
      message: "Post Liked",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const disLikePost = async (req, res) => {
  try {
    const disLikeKarneWalaUserId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "There is no Post",
        success: false,
      });
    }

    //likes logic------
    await post.updateOne({ $pull: { likes: disLikeKarneWalaUserId } });
    await post.save();

    //implementing socket io for real time notifications----

    return res.status(200).json({
      message: "Post Disliked",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentKarneWalaUserKiId = req.id;
    const { text } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Text is required",
        success: false,
      });
    }
    const comment = await Comment.create({
      text,
      auhtor: commentKarneWalaUserKiId,
      post: postId,
    }).populate({ path: "auhtor", select: "userName, profilePicture" });

    post.comment.push(comment._id);
    await post.save();

    return res.status(200).json({
      message: "Successfully Commented ",
      comment,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentOfPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "userName, profilePicture"
    );

    if (!comments) {
      return res.status(404).json({
        message: "No comment Found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    const post = await Post.find(postId);
    if (!post) {
      return res.status(404).json({
        message: "No post Found",
        success: false,
      });
    }

    //check if the loged in user is the owner of the post-----

    if (post.auhtor.toString() != authorId) {
      return res.status(403).json({
        message: "You are not auhtorized to delete this post",
        success: false,
      });
    }

    //delete post----------
    await Post.findByIdAndDelete(postId);

    //remove the post id from user post----

    let user = await Post.findById(authorId);
    user.posts = user.posts.filter((id) => id.toString() != postId);
    await user.save();

    //delete associated comments------
    await Comment.deleteMany({ post: postId });

    return res.status(200).json({
      message: "Post Deleted",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    const user = await Post.findById(authorId);
    if (user.bookmarks.includes(post._id)) {
      //already bookes so removed from bookmarks--------
      await user.updateOne({ $pull: { bookmarks: post._id } });
      await user.save();
      return res.status(200).json({
        type: "unsaved",
        message: "Post removed from bookmarks",
        success: true,
      });
    } else {
      //bookmaked karna padega---------------
      await user.updateOne({ $addToSet: { bookmarks: post._id } });
      await user.save();
      return res.status(200).json({
        type: "saved",
        message: "Post added to bookmarks",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
