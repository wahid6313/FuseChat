import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";

function Messages({ selectedUser }) {
  const { messages } = useSelector((store) => store.chat);
  return (
    <div className="overflow-y-auto p-6 h-full bg-red-200">
      <div className="flex  justify-center items-center  bg-cyan-300 mt-8">
        <div className="flex flex-col justify-center items-center  ">
          <Avatar className="h-24 w-24">
            <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <span className="font-semibold text-lg">
            {selectedUser?.userName}
          </span>
          <span className="mt-[-11px] text-xs text-gray-500">FuseChat</span>
          <Link to={`/profile/${selectedUser?._id}`}>
            <Button className="bg-gray-100 text-black h-8 mt-3 rounded-lg hover:bg-gray-200 font-semibold">
              View profile
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-blue-400">
        {messages.map((msg) => {
          return (
            <div className={`flex`} key={msg}>
              <div>{msg}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Messages;
