import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function SuggestedUsers() {
  const { suggestedUser } = useSelector((store) => store.auth);
  return (
    <div className="my-6 mr-28">
      <div className="flex items-center justify-between">
        <h1 className="text-sm text-gray-500 font-semibold">
          Suggested for you
        </h1>
        <p className="text-xs font-semibold cursor-pointer hover:text-gray-500">
          See All
        </p>
      </div>
      {suggestedUser.map((user) => {
        return (
          <div key={user} className="flex items-center  my-4">
            <div className="flex items-center ">
              <Link to={`/profile/${user?._id}`}>
                <Avatar>
                  <AvatarImage src={user?.profilePicture} alt="auth-image" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>

              <Link to={`/profile/${user?._id}`}>
                <h1 className="text-sm font-semibold">{user?.userName}</h1>
              </Link>
            </div>
            <div className=" ml-auto text-xs font-semibold text-blue-500 cursor-pointer hover:text-black">
              Follow
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SuggestedUsers;
