import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setSelectedUser } from "@/redux/authSlice";
import {
  CircleUserRound,
  FilePenLine,
  Heart,
  Image,
  Info,
  Mic,
  Phone,
  Smile,
  Video,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Messages from "./Messages";
import axios from "axios";
import { setMessages } from "@/redux/chatSlice";

function ChatPage() {
  const [textMessage, setTextMessage] = useState("");
  const { user, suggestedUser, selectedUser } = useSelector(
    (store) => store.auth
  );
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();
  // const isOnline = true;

  // Reset selectedUser when navigating away from ChatPage
  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [dispatch]);

  function handleSelection(user) {
    // Toggle selected user
    dispatch(setSelectedUser(selectedUser?._id === user?._id ? null : user));
  }
  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `https://fusechat.onrender.com/api/v1/message/send/${receiverId}`,
        { textMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-[244px] h-[100vh] grid grid-cols-[30%_70%] overflow-y-hidden">
      {/* Sidebar */}
      <div className="flex-col sticky top-0 ">
        <section className="w-full sticky top-0 z-10 bg-white">
          <div className="flex px-6 items-center justify-between mt-10">
            <h1 className="font-semibold text-xl cursor-pointer">
              {user?.userName}
            </h1>
            <FilePenLine className="cursor-pointer" />
          </div>

          <div className="mt-8 flex items-center px-6">
            <Avatar className="w-[75px] h-[75px] cursor-pointer">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <p className="text-xs ml-[10px] text-gray-500 px-6">Your note</p>
          <div className="flex items-center justify-between mt-6 px-6">
            <p className="font-semibold">Messages</p>
            <p className="text-gray-500 text-sm font-semibold cursor-pointer">
              Requests
            </p>
          </div>
        </section>
        <div className="mt-3 overflow-y-auto h-[80vh]">
          {Array.isArray(suggestedUser) && suggestedUser.length > 0 ? (
            suggestedUser.map((user) => {
              const isOnline = onlineUsers.includes(suggestedUser?._id);
              return (
                <div
                  onClick={() => handleSelection(user)}
                  key={user?._id || user}
                  className="flex items-center justify-between px-6 hover:bg-gray-100 cursor-pointer py-2"
                >
                  <div className="flex items-center justify-between">
                    <Avatar className="w-[50px] h-[50px]">
                      <AvatarImage
                        src={user?.profilePicture}
                        alt="auth-image"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1 className="text-sm font-semibold">{user?.userName}</h1>
                  </div>
                  <div
                    className={`text-xs font-semibold cursor-pointer ${
                      isOnline ? "text-green-400" : "text-red-600"
                    }`}
                  >
                    {isOnline ? "online" : "offline"}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-500 mt-4">
              No suggestions available.
            </p>
          )}
        </div>
      </div>

      {/* Chat Section */}
      {selectedUser ? (
        <section className="flex-1 border-l border-l-gray-300 flex flex-col h-screen ">
          <div className="flex items-center justify-between sticky top-0 bg-white z-10 w-full px-5 py-4 border border-b-gray-300">
            <div className="flex items-center">
              <Avatar className="w-12 h-12 cursor-pointer">
                <AvatarImage src={selectedUser?.profilePicture} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-semibold ml-1 cursor-pointer">
                {selectedUser?.userName}
              </span>
            </div>
            <div className="flex items-center cursor-pointer chat-navbar">
              <Phone className="h-6 w-6" />
              <Video strokeWidth={1.7} className="h-7 w-7" />
              <Info className="h-6 w-6" />
            </div>
          </div>
          <Messages selectedUser={selectedUser} />
          <div className="px-5 relative w-full py-4">
            <Smile className="absolute left-7 top-1/2 transform -translate-y-1/2 ml-2 cursor-pointer" />
            <Input
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && textMessage.trim()) {
                  sendMessageHandler(selectedUser?._id);
                }
              }}
              type="text"
              className="focus-visible:ring-transparent flex-1 mr-2 rounded-full py-6 px-12 border border-gray-300"
              placeholder="Message..."
            />
            {textMessage ? (
              <span
                onClick={() => sendMessageHandler(selectedUser?._id)}
                className="text-blue-500 text-sm font-semibold cursor-pointer hover:text-black absolute top-1/2 transform -translate-y-1/2 ml-2 right-[40px]"
              >
                Send
              </span>
            ) : (
              <>
                <Mic className="absolute right-[107px] top-1/2 transform -translate-y-1/2 ml-2 cursor-pointer" />
                <Image className="absolute right-[75px] top-1/2 transform -translate-y-1/2 ml-2 cursor-pointer" />
                <Heart className="absolute right-10 top-1/2 transform -translate-y-1/2 ml-2 cursor-pointer" />
              </>
            )}
          </div>
        </section>
      ) : (
        <div className="flex items-center justify-center border border-l-gray-300 h-screen">
          <div className="text-center flex flex-col items-center">
            <CircleUserRound strokeWidth={0.4} className="w-28 h-28" />
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
