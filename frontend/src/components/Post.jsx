import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import {
  BookAIcon,
  Bookmark,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";

function Post({ post }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  // console.log(post);
  const { userName } = post.author[0];
  const { profilePicture } = post.author[0];
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes.length);
  const dispatch = useDispatch();

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post._id}/${action}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updateLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updateLikes);
        setLiked(!liked);

        //post ko update karne ke liye--------
        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/post/delete/${post?._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updateDeletePost = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );
        dispatch(setPosts(updateDeletePost));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  };

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const sendMessageHandler = async () => {
    alert(text);
  };

  return (
    <div className="mt-1 w-full items-start max-w-sm mx-auto ">
      {/* post header ----------------------------------------------------------------- */}
      <div className=" items-center justify-between">
        <div className=" flex items-center text-center justify-start gap-2 pt-4 pb-3 ">
          <Avatar className="cursor-pointer ">
            <AvatarImage alt="post-image" src={profilePicture}></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="cursor-pointer font-semibold">{userName}</h1>
          <div className="flex justify-end items-center text-center ml-[220px] ">
            <Dialog>
              <DialogTrigger asChild>
                <MoreHorizontal className="cursor-pointer ml-2 justify-end"></MoreHorizontal>
              </DialogTrigger>
              <DialogContent className="w-60">
                <Button
                  variant="ghost"
                  className="bg-white text-blue-600 border border-none  w-full"
                >
                  Unfollow
                </Button>
                <Button
                  variant="ghost"
                  className="bg-white text-blue-600 border border-none  w-full"
                >
                  Add to favorites
                </Button>
                {user && post.author[0] && user._id === post.author[0]._id && (
                  <Button
                    onClick={deletePostHandler}
                    variant="ghost"
                    className="bg-white text-blue-600 border border-none  w-full"
                  >
                    Delete
                  </Button>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* post image-------------------------------------------------------------------- */}
      <div className="">
        <img
          className="object-cover rounded-lg w-full mb-2 "
          alt="post-img"
          src={post.image}
        />
      </div>

      {/* post likes , comments , share ------------------------------------------------------------- */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center text-center mt-1 cursor-pointer ">
          {liked ? (
            <FaHeart
              onClick={likeOrDislikeHandler}
              size={"24"}
              className="cursor-pointer text-red-500 "
            />
          ) : (
            <FaRegHeart
              onClick={likeOrDislikeHandler}
              className="w-6 h-6 hover:text-gray-400"
            />
          )}

          <MessageCircle
            onClick={() => setOpen(true)}
            className="hover:text-gray-400"
          />
          <Send className="hover:text-gray-400" />
        </div>
        <Bookmark className="hover:text-gray-400" />
      </div>
      <div className=" flex items-start">
        <span className="font-semibold text-sm mt-3 cursor-pointer">
          {postLike} likes
        </span>
      </div>
      <div className="text-sm  mt-1 text-left">
        <span className="font-semibold cursor-pointer inline">{userName}</span>
        <span className="inline w-full ml-1"> {post.caption}</span>
      </div>
      <span
        onClick={() => setOpen(true)}
        className=" flex items-start text-sm mt-1 text-gray-500 cursor-pointer"
      >
        View all comments
      </span>
      <div className="flex items-start">
        <CommentDialog open={open} setOpen={setOpen} />
      </div>
      <div className="flex items-start mt-1">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="outline-none  w-full text-sm"
        />
        {text && (
          <span
            onClick={sendMessageHandler}
            className="text-[#3BADF8] text-sm font-semibold cursor-pointer"
          >
            Post
          </span>
        )}
      </div>
      <p className="border border-t-0 mt-4"></p>
    </div>
  );
}

export default Post;
