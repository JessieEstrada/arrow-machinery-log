import React from "react";
import { Comment } from "../lib/types.ts";
import { timeAgo } from "../lib/utils.ts";

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="bg-[#FFFFFF] p-3 rounded-md border border-gray-300">
      <p className="text-gray-800 text-sm leading-snug">{comment.content}</p>
      <p className="text-gray-500 text-xs mt-1">
        {comment.author} • {timeAgo(comment.created_at)}
      </p>
    </div>
  );
};
