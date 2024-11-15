import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

function Story() {
  return (
    <div className="flex items-center ">
      <div className="flex items-center ">
        <Avatar className="w-14 h-14 mr-3 ring-offset-2 ring-2 ring-green-500 cursor-pointer">
          <AvatarImage src="https://photosbull.com/wp-content/uploads/2024/05/anime-dp-17.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="w-14 h-14 mr-3 ring-2 ring-offset-2 ring-red-400 cursor-pointer">
          <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7cf_2opl8hPzx7FTd14kNZsyu0ZffslHzRz6jYX2nBkJ9MR3_IsZz2NLm96u3KXfpUiQ&usqp=CAU" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="w-14 h-14 mr-3 ring-2 ring-offset-2 ring-red-400 cursor-pointer">
          <AvatarImage src="https://photosbook.in/wp-content/uploads/anime-dp-boy21.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="w-14 h-14 mr-3 ring-2 ring-offset-2 ring-red-400 cursor-pointer">
          <AvatarImage src="https://photosbook.in/wp-content/uploads/anime-dp4.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="w-14 h-14 mr-3 ring-2 ring-offset-2 ring-red-400 cursor-pointer">
          <AvatarImage
            className=""
            src="https://play-lh.googleusercontent.com/-gQlRSL8c_ekb1c5b2ftwVQgtoNde70KI4CDO36gdxl9RDcjrg864_Wj4JvYjAVZU7PM"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className=" w-14 h-14 mr-3 ring-2 ring-offset-2 ring-red-400 cursor-pointer">
          <AvatarImage src="https://cdn.lazyshop.com/files/9b0d8bde-34c0-460a-b131-e7a87b1e0543/product/4f07f0ddcaa2791fce068f269c7b1571.jpeg?x-oss-process=style%2Fthumb" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="w-14 h-14 mr-3 ring-2 ring-offset-2 ring-red-400 cursor-pointer">
          <AvatarImage src="https://photosbook.in/wp-content/uploads/anime-dp-boy22.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="w-14 h-14 mr-3 ring-2 ring-offset-2 ring-red-400 cursor-pointer">
          <AvatarImage src="https://pxraja.com/wp-content/uploads/2024/06/anime-dp-15.webp" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Story;
