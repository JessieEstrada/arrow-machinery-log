import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useFetcher, useRevalidator } from "@remix-run/react";
import React, { useEffect, useRef, useState } from "react";
import { ActionResponse, Comment, Post } from "../lib/types.ts";
import { timeAgo } from "../lib/utils.ts";
import { Button } from "./Button.tsx";
import { CommentItem } from "./CommentItem.tsx";
import { Input } from "./Input.tsx";

interface PostCardProps {
  post: Post;
  revalidator: ReturnType<typeof useRevalidator>;
}

const VISIBLE_COMMENTS_THRESHOLD = 5;

export const PostCard: React.FC<PostCardProps> = ({ post, revalidator }) => {
  const commentFetcher = useFetcher<ActionResponse>();
  const prevFetcherState = useRef(commentFetcher.state);
  const [commentValue, setCommentValue] = useState("");
  const isCreatingComment = commentFetcher.state === "submitting";
  const commentErrors = commentFetcher.data?.errors?.fieldErrors;
  const generalCommentError = commentFetcher.data?.error;
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreComments = post.comments.length > VISIBLE_COMMENTS_THRESHOLD;
  const visibleComments = isExpanded ? post.comments : post.comments.slice(0, VISIBLE_COMMENTS_THRESHOLD);

  useEffect(() => {
    const wasSubmitting = prevFetcherState.current === "submitting";
    const isSubmissionFinished = commentFetcher.state !== "submitting";

    if (wasSubmitting && isSubmissionFinished && commentFetcher.data?.success) {
      setCommentValue("");
      setIsExpanded(true);
      revalidator.revalidate();
    }
    prevFetcherState.current = commentFetcher.state;
  }, [commentFetcher.state, commentFetcher.data, revalidator]);

  return (
    <div className="bg-[#F9F9F9] border border-gray-200 rounded-lg p-5 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
      <p className="text-black mb-4 leading-relaxed break-words">{post.content}</p>
      <p className="text-gray-500 text-sm mb-3">
        {post.author} • {timeAgo(post.created_at)}
      </p>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <h4 className="text-lg font-semibold text-gray-700 mb-3">Comments ({post.comments?.length || 0})</h4>
        {post.comments && post.comments.length > 0 ? (
          <div className="space-y-3 mb-4">
            {visibleComments.map((comment: Comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm mb-4">No comments yet.</p>
        )}
        {hasMoreComments && (
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm font-semibold text-blue-600 hover:text-blue-800 mb-4">
            {isExpanded
              ? "Show less comments"
              : `Show ${post.comments.length - VISIBLE_COMMENTS_THRESHOLD} more comment${post.comments.length - VISIBLE_COMMENTS_THRESHOLD > 1 ? "s" : ""}`}
          </button>
        )}
        <commentFetcher.Form method="post" className="flex flex-col sm:flex-row gap-3 items-end">
          <input type="hidden" name="_action" value="createComment" />
          <input type="hidden" name="postId" value={post.id} />
          <div className="flex-grow w-full">
            <label htmlFor={`comment-content-${post.id}`} className="sr-only">
              Add a comment...
            </label>
            <Input
              id={`comment-content-${post.id}`}
              name="content"
              placeholder="Add a comment..."
              error={commentErrors?.content ? commentErrors.content[0] : undefined}
              value={commentValue}
              required
              onChange={(e) => setCommentValue(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            disabled={isCreatingComment}
            customClasses="sm:w-auto"
            icon={isCreatingComment ? null : <PaperAirplaneIcon className="h-6 w-6" />}>
            {isCreatingComment ? "Commenting..." : ""}
          </Button>
        </commentFetcher.Form>
        {generalCommentError && <p className="text-red-600 text-sm mt-2 font-medium">{generalCommentError}</p>}
      </div>
    </div>
  );
};
