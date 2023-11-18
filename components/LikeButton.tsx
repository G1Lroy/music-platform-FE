"use client";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {};

const LikeButton = (props: Props) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;
  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
    >
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
