import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  AlignJustify,
  AtSign,
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
        <AvatarImage
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSbtzZWVSpzn3sKP5TfWHzwIiS-2kI_mA8gNWtj5uVm-dpaGKnmdVMNDNd_thd-PzENpU&usqp=CAU"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
  { icons: <LogOut />, text: "LogOut" },
];

const bottomItems = [
  { icons: <AtSign />, text: "Threads" },
  { icons: <AlignJustify />, text: "More" },
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
    if (textType === "LogOut") logoutHandler();
  };

  return (
    <div className="fixed top-0 z-10 left-0 px-3 border-r border-gray-300 w-[245px] h-screen flex flex-col justify-between">
      {/* Header Section */}
      <div>
        <h1 className="flex flex-row w-20 cursor-pointer items-center mt-3">
          <img
            alt=""
            src="https://t4.ftcdn.net/jpg/03/02/16/77/360_F_302167753_zO96cQJziw0BYKOSw0plniVSlkxdGTC5.jpg"
            className="mr-2"
          />
          <span className="text-xl font-semibold">FuseChat</span>
        </h1>

        {/* Main Sidebar Items */}
        <div>
          {sidebarItems.map((item, index) => (
            <div
              onClick={() => sidebarHandler(item.text)}
              key={index}
              className="flex items-center p-3 gap-3  rounded-lg hover:bg-gray-200 cursor-pointer my-2"
            >
              {item.icons}
              <span className="font-normal text-base">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sidebar Items */}
      <div className="mb-5 ">
        {bottomItems.map((item, index) => (
          <div
            onClick={() => sidebarHandler(item.text)}
            key={index}
            className="flex items-center p-3  gap-3 rounded-lg hover:bg-gray-200 cursor-pointer my-2"
          >
            {item.icons}
            <span className="font-normal text-base">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
