import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function RightSidebar() {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="w-[410px] h-screen ">
      <div className="flex items-center p-4 mt-5 ">
        <Link to={`/profile/${user?._id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="auth-image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex">
          <Link to={`/profile/${user?._id}`}>
            <h1 className="text-sm font-semibold">{user?.userName}</h1>
          </Link>
          <span className="text-gray-400 text-sm ml-2">
            {user?.bio || "bio here..."}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
