import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import {
  addComment,
  addNewPost,
  bookmarkPost,
  deletePost,
  disLikePost,
  getAllPost,
  getCommentOfPost,
  getUserPost,
  likePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router
  .route("/allPost")
  .post(isAuthenticated, upload.single("image"), addNewPost);
router.route("/all").get(isAuthenticated, getAllPost);
router.route("/userPost/all").get(isAuthenticated, getUserPost);
router.route("/:id/like").get(isAuthenticated, likePost);
router.route("/:id/disLike").get(isAuthenticated, disLikePost);
router.route("/:id/addComment").post(isAuthenticated, addComment);
router.route("/:id/getComment/all").get(isAuthenticated, getCommentOfPost);
router.route("/deletePost/:id").delete(isAuthenticated, deletePost);
router.route("/:id/bookmarkPost").get(isAuthenticated, bookmarkPost);

export default router;
