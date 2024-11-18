import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function Messages({ selectedUser }) {
  return (
    <div className="overflow-y-auto p-4 h-full">
      <div className="flex justify-center">
        <Avatar className="h-7 w-7">
          <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Messages;
