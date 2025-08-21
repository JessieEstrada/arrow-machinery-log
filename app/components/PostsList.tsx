import { useRevalidator } from "@remix-run/react";
import React from "react";
import { Post } from "../lib/types.ts";
import { PostCard } from "./PostCard.tsx";

interface PostsListProps {
  posts: Post[];
  revalidator: ReturnType<typeof useRevalidator>;
}

export const PostsList: React.FC<PostsListProps> = ({ posts, revalidator }) => {
  if (posts.length === 0) {
    return <p className="text-gray-600 italic text-center py-8">No posts yet. Be the first to add one!</p>;
  }

  return (
    <div className="mt-8 space-y-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} revalidator={revalidator} />
      ))}
    </div>
  );
};
