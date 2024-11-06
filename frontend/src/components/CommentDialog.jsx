import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

function CommentDialog({ open, setOpen }) {
  const [text, setText] = useState("");

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const sendMessageHandler = async () => {
    alert(text);
  };
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="p-0 max-w-4xl "
      >
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              className="object-cover overflow-hidden  w-full "
              alt="post-img"
              src="https://images.unsplash.com/photo-1574129214345-65fe1d421c30?q=80&w=3115&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
          <div className="flex flex-col justify-between w-1/2 ">
            <div className="flex items-center justify-between gap-2  cursor-pointer p-4 border border-gray-200 border-t-0 rounded-sm">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage
                      alt="profile-pic"
                      src="https://photosking.net/wp-content/uploads/beautiful-girls-dp_116.webp"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link>
                    <span className="font-semibold">Username</span>
                  </Link>
                </div>
              </div>

              <Dialog className="">
                <DialogTrigger asChild>
                  <MoreHorizontal className=""></MoreHorizontal>
                </DialogTrigger>
                <DialogContent className="w-60">
                  <Button
                    variant="ghost"
                    className="bg-white text-blue-600 border border-none  w-full"
                  >
                    Unfollow
                  </Button>
                  <Button
                    variant="ghost"
                    className="bg-white text-blue-600 border border-none  w-full"
                  >
                    Add to favorites
                  </Button>
                  <Button
                    variant="ghost"
                    className="bg-white text-blue-600 border border-none  w-full"
                  >
                    Delete
                  </Button>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex-1 overflow-y-auto p-4 ml-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Provident, iste saepe excepturi hic et, quod tempora dignissimos
              earum ipsum dolorum laborum voluptate explicabo accusantium sint
              nemo magni pariatur ea ex!
            </div>
            <div className="p-4">
              <div className="flex items-center">
                <input
                  value={text}
                  onChange={changeEventHandler}
                  className="outline-none text-sm w-full p-2"
                  type="text"
                  placeholder="Add a comment..."
                />
                {text && (
                  <span
                    onClick={sendMessageHandler}
                    className="text-[#3BADF8] text-sm font-semibold cursor-pointer flex items-center"
                  >
                    Post
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CommentDialog;
