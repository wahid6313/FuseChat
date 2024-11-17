import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FilePenLine } from "lucide-react";
import SuggestedUsers from "./SuggestedUsers";
import { Link } from "react-router-dom";

function ChatPage() {
  const { user, suggestedUser } = useSelector((store) => store.auth);

  return (
    <div className="w-[350px]  ml-[244px] overflow-hidden h-screen border border-r border-gray-300">
      <section className=" mt-10 ">
        <div className="flex items-center justify-between px-6">
          <h1 className="font-semibold text-xl cursor-pointer">
            {user?.userName}{" "}
          </h1>
          <FilePenLine className="cursor-pointer" />
        </div>

        <div className=" mt-8 flex items-center justify-between px-6">
          <Avatar className="w-20 h-20 cursor-pointer">
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className="text-xs ml-3 text-gray-500 px-6">Your note</p>
        </div>
        <div className="flex items-center justify-between px-6 mt-6">
          <p className="font-semibold">Messages</p>
          <p className="text-gray-500 text-sm font-semibold cursor-pointer">
            Requests
          </p>
        </div>
        <div className="mt-3">
          {suggestedUser.map((user) => {
            return (
              <div
                key={user}
                className="flex items-center justify-between px-6 py-3  hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center  w-full">
                  <Link to={`/profile/${user?._id}`}>
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={user?.profilePicture}
                        alt="auth-image"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>

                  <Link to={`/profile/${user?._id}`}>
                    <h1 className="text-sm font-semibold">{user?.userName}</h1>
                  </Link>
                </div>
                <p className=" ml-auto text-xs font-semibold text-blue-500 cursor-pointer hover:text-black">
                  online
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default ChatPage;
