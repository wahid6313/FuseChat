import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataUrl } from "../lib/utils";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";

function CreatePost({ open, setOpen }) {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { posts } = useSelector((store) => store.post);

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataUrl(file);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async (e) => {
    // console.log(caption, file);

    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) formData.append("image", file);

    try {
      setLoading(true);
      // const token = localStorage.getItem("authToken");
      const res = await axios.post(
        "https://fusechat.onrender.com/api/v1/post/addpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error.message);

      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className="">
        <DialogHeader className="font-semibold items-center ">
          Create new post
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-sm cursor-pointer">
              {user?.userName}
            </h1>
            <span className="text-sm text-gray-400">Bio here...</span>
          </div>
        </div>
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border-none focus-visible:ring-transparent"
          placeholder="Write a caption..."
        />
        {imagePreview && (
          <div className="w-full h-96 flex items-center justify-center">
            <img
              src={imagePreview}
              alt="preview-img"
              className="object-cover w-full h-96 rounded-lg"
            />
          </div>
        )}
        <input
          ref={imageRef}
          type="file"
          className="hidden"
          onChange={fileChangeHandler}
        />
        <div className="items-center text-center flex flex-col">
          <Button
            onClick={() => imageRef.current.click()}
            className="bg-blue-500 w-fit h-8 hover:bg-blue-600"
          >
            Select from computer
          </Button>
          {imagePreview &&
            (loading ? (
              <Button className="mt-5 bg-blue-500 hover:bg-blue-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={createPostHandler}
                className="bg-white shadow-lg text-blue-600 hover:bg-blue-500 hover:text-white w-fit h-8  mt-5"
              >
                Post
              </Button>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePost;
