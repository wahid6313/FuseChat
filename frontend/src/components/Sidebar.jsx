import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { icons: <Home />, text: "Home" },
  { icons: <Search />, text: "Search" },
  { icons: <TrendingUp />, text: "Explore" },
  { icons: <MessageCircle />, text: "Messages" },
  { icons: <Heart />, text: "Notifications" },
  { icons: <PlusSquare />, text: "Create" },
  {
    icons: (
      <Avatar className="w-7 h-7">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
  { icons: <LogOut />, text: "LogOut" },
];

function Sidebar() {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios("http://localhost:8000/api/v1/user/logOut", {
        withCredentials: false,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const sidebarHandler = (textType) => {
    if (textType == "LogOut") logoutHandler();
  };

  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[20%] h-screen">
      <div className="flex flex-col">
        <h1 className="w-20 cursor-pointer">
          <img
            alt=""
            src="https://t4.ftcdn.net/jpg/03/02/16/77/360_F_302167753_zO96cQJziw0BYKOSw0plniVSlkxdGTC5.jpg"
          ></img>
        </h1>
        <div>
          {sidebarItems.map((items, index) => {
            return (
              <div
                onClick={() => sidebarHandler(items.text)}
                key={index}
                className="flex items-center p-3 gap-3 rounded-lg hover:bg-gray-200 cursor-pointer my-3"
              >
                {items.icons}
                <span>{items.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
