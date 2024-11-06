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

function Post() {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  return (
    <div className="mt-1 w-full max-w-sm mx-auto ">
      {/* post header ----------------------------------------------------------------- */}
      <div className=" items-center justify-between">
        <div className=" flex items-center text-center justify-start gap-2 pt-4 pb-3 ">
          <Avatar className="cursor-pointer ">
            <AvatarImage
              alt="post-image"
              src="https://photosking.net/wp-content/uploads/beautiful-girls-dp_116.webp"
            ></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="cursor-pointer font-semibold ">username</h1>
          <div className="flex justify-end items-center text-center ml-[225px] ">
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
                  Add to favourites
                </Button>
                <Button
                  variant="ghost"
                  className="bg-white text-blue-600 border border-none  w-full"
                >
                  Delete
                </Button>
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
          src="https://images.unsplash.com/photo-1659030202270-89739a152d52?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>

      {/* post likes , comments , share ------------------------------------------------------------- */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center text-center mt-1 cursor-pointer ">
          <FaRegHeart className="w-6 h-6 hover:text-gray-400" />
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
          14,300 likes
        </span>
      </div>
      <div className=" flex items-start text-sm gap-2 mt-1">
        <span className="font-semibold cursor-pointer">Username</span>
        Caption
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
          <span className="text-[#3BADF8] text-sm font-semibold cursor-pointer">
            Post
          </span>
        )}
      </div>
      <p className="border border-t-0 mt-4"></p>
    </div>
  );
}

export default Post;
