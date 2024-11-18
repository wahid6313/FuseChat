import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { CircleUserRound} from "lucide-react";

import { setSelectedUser } from "@/redux/authSlice";
import { ChevronDown, CircleUserRound, FilePenLine } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function ChatPage() {
  const { user, suggestedUser, selectedUser } = useSelector(
    (store) => store.auth
  );

  const dispatch = useDispatch();
  const isOnline = true;

  return (
    <div className="ml-[244px] h-[100vh] grid grid-cols-[30%_70%] overflow-y-hidden">
      <div className="flex-col sticky top-0 ">
        <section className=" w-full sticky top-0 z-10 bg-white">
          <div className="flex px-6  items-center justify-between mt-10">
            <h1 className="font-semibold text-xl cursor-pointer">
              {user?.userName}
            </h1>
            <FilePenLine className="cursor-pointer" />
          </div>

          <div className=" mt-8 flex items-center px-6 ">
            <Avatar className="w-[75px] h-[75px] cursor-pointer">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className="text-xs ml-[10px] text-gray-500 px-6">Your note</p>
          </div>
          <div className="flex items-center justify-between mt-6 px-6">
            <p className="font-semibold">Messages</p>
            <p className="text-gray-500 text-sm font-semibold cursor-pointer">
              Requests
            </p>
          </div>
        </section>
        <div className="mt-3 overflow-y-auto h-[80vh]">
          {Array.isArray(suggestedUser) && suggestedUser.length > 0 ? (
            suggestedUser.map((user) => (
              <div
                key={user?._id || user}
                className="flex items-center justify-between px-6 hover:bg-gray-100 cursor-pointer py-2 overflow-y-auto flex-1"
              >
                <div className="flex items-center justify-between ">
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src={user?.profilePicture} alt="auth-image" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <h1 className="text-sm font-semibold">{user?.userName}</h1>
                </div>
                <div
                  className={`text-xs font-semibold text-blue-500 cursor-pointer items-center ${
                    isOnline ? "text-green-400" : "text-red-600"
                  }`}
                >
                  {isOnline ? "online" : "offline"}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 mt-4">
              No suggestions available.
            </p>
          )}
        </div>
      </div>
      {selectedUser ? (
        <section
          className=" flex-1 border-l border-l-gray-300 flex flex-col h-full w-[60%]
        "
        >
          <div>
            <Avatar>
              <AvatarImage src={selectedUser?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </section>
      ) : (
        <div className="flex items-center justify-center border border-l-gray-300 h-screen">
          <div className="text-center  flex flex-col items-center">
            <CircleUserRound strokeWidth={0.5} className="w-28 h-28" />
            <p className="font-semibold text-lg">Your messages</p>
            <p className="mt-[-8px] text-sm text-gray-500">
              Send a message to start a chat.
            </p>
            <Button className="bg-blue-400 w-fit h-8 ml-3 text-sm font-semibold hover:bg-blue-500 mt-3 rounded-lg">
              Send message
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPage;
