import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function SuggestedUsers() {
  const { suggestedUser = [] } = useSelector((store) => store.auth); // Fallback to an empty array

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

      {Array.isArray(suggestedUser) && suggestedUser.length > 0 ? (
        suggestedUser.map((user) => (
          <div key={user?._id || user} className="flex items-center my-4">
            <div className="flex items-center">
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
            <div className="ml-auto text-xs font-semibold text-blue-500 cursor-pointer hover:text-black">
              Follow
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500 mt-4">No suggestions available.</p>
      )}
    </div>
  );
}

export default SuggestedUsers;
