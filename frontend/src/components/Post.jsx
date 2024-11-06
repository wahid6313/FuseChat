import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import {
  BookAIcon,
  Bookmark,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";

function Post() {
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className=" items-center justify-between">
        <div className=" flex items-center text-center justify-start gap-2 pt-4 pb-3 ">
          <Avatar className="cursor-pointer ">
            <AvatarImage
              alt="post-image"
              src="https://photosking.net/wp-content/uploads/beautiful-girls-dp_116.webp"
            ></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="cursor-pointer ">username</h1>
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
      <div className="">
        <img
          className="object-cover rounded-lg w-full mb-2 "
          alt="post-img"
          src="https://images.unsplash.com/photo-1659030202270-89739a152d52?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        {/* <p className="border border-t-0 mt-20"></p> */}
      </div>
      <div className="flex gap-4 items-center text-center mt-3 cursor-pointer ">
        <FaRegHeart className="w-6 h-6 hover:text-gray-400" />
        <MessageCircle className="hover:text-gray-400" />
        <Send className="hover:text-gray-400" />
        <div className="ml-[240px] hover:text-gray-400">
          <Bookmark />
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Post;
