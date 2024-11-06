import { Dialog, DialogContent } from "./ui/dialog";
import React from "react";

function CommentDialog({ open, setOpen }) {
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <img
          alt="post-img"
          src="https://images.unsplash.com/photo-1659030202270-89739a152d52?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </DialogContent>
    </Dialog>
  );
}

export default CommentDialog;
