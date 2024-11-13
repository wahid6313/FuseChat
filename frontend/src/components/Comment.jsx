import { Avatar } from "./ui/avatar";
import React from "react";
import { AvatarFallback, AvatarImage } from "./ui/avatar";

function Comment({ comment }) {
  const userName = comment?.author?.userName;
  const text = comment.text;

  return (
    // outer
    <div className="flex items-start space-x-1 mt-1 my-4">
      <Avatar className="w-7 h-7">
        <AvatarImage src={comment?.author?.profilePicture} />
      </Avatar>

      <div className="flex-1 ">
        <span className="font-semibold text-sm mr-1">{userName}</span>
        <span className="text-sm break-words ml-1">{text}</span>
      </div>
    </div>
  );
}

export default Comment;
