import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import axios from "axios";
import { toast } from "sonner";
import { setPosts } from "@/redux/postSlice";

function CommentDialog({ open, setOpen }) {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector((store) => store.post);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const sendMessageHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${selectedPost._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id
            ? { ...p, comments: updatedCommentData }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="p-0 max-w-4xl overflow-hidden"
      >
        <div className="flex flex-1">
          <div className="w-1/2 ">
            <img
              className="object-cover overflow-hidden  w-full "
              alt="post-img"
              src={selectedPost?.image}
            />
          </div>
          <div className="flex flex-col justify-between w-1/2">
            <div className="flex items-center justify-between   cursor-pointer p-3  border-t-0 rounded-sm">
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
            <hr />
            <div className="flex-1 overflow-y-scroll p-4">
              {(comment || []).map((comment) => (
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
