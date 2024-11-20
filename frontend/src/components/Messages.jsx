import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import useGetAllMessages from "@/hooks/useGetAllMessages";

function Messages({ selectedUser }) {
  useGetAllMessages();
  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="overflow-y-auto p-6 h-full ">
      <div className="flex  justify-center items-center   mt-8">
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
      <div className="flex flex-col mt-[100px]">
        {messages &&
          messages.map((msg) => {
            return (
              <div
                className={`flex ${
                  msg.senderId === user?._id ? "justify-end" : "justify-start"
                }`}
                key={msg}
              >
                <div
                  className={` py-2 px-4 max-w-sm rounded-full ${
                    msg.senderId === user?._id
                      ? "bg-blue-500 text-white font-light text-sm"
                      : "bg-gray-200 text-black font-light text-sm"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Messages;
