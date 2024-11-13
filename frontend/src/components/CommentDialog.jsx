import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import Comment from "./Comment";

function CommentDialog({ open, setOpen }) {
  const [text, setText] = useState("");
  const { selectedPost } = useSelector((store) => store.post);

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
        className="p-0 max-w-4xl overflow-hidden"
      >
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              className="object-cover overflow-hidden  w-full "
              alt="post-img"
              src={selectedPost?.image}
            />
          </div>
          <div className="flex flex-col justify-between w-1/2 ">
            <div className="flex items-center justify-between  border w-full border-gray-200 cursor-pointer p-3  border-t-0 rounded-sm">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage
                      alt="profile-pic"
                      src={selectedPost?.author[0]?.profilePicture}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link>
                    <span className="font-semibold">
                      {selectedPost?.author[0]?.userName}
                    </span>
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
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex-1 overflow-y-auto p-4 ">
              {(selectedPost?.comments || []).map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
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
