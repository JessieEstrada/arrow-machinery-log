import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData, useRevalidator } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/Button.tsx";
import { TextArea } from "~/components/TextArea.tsx";
import { Input } from "../components/Input.tsx";
import { PageHeader } from "../components/PageHeader.tsx";
import { PostsList } from "../components/PostsList.tsx";
import { getDb } from "../lib/db.ts";
import { CommentSchema, PostSchema } from "../lib/schemas.ts";
import { type ActionResponse, type Comment, type FieldErrors, type Post } from "../lib/types.ts";

export async function loader({ request }: LoaderFunctionArgs): Promise<Response> {
  const db = await getDb();

  const posts = db.prepare(`SELECT * FROM posts ORDER BY created_at DESC`).all() as unknown as Post[];
  const comments = db.prepare(`SELECT * FROM comments ORDER BY created_at ASC`).all() as unknown as Comment[];

  // Sort comments by their PostID
  const commentsByPostId: Record<number, Comment[]> = {};
  for (const comment of comments) {
    if (!commentsByPostId[comment.post_id]) {
      commentsByPostId[comment.post_id] = [];
    }
    commentsByPostId[comment.post_id].push(comment);
  }

  // Attach comments to posts
  const postsWithComments: Post[] = posts.map((post) => ({
    ...post,
    comments: commentsByPostId[post.id] || [],
  }));
  return json({ posts: postsWithComments });
}

export async function action({ request }: ActionFunctionArgs) {
  const db = await getDb();
  const formData = await request.formData();
  const actionType = formData.get("_action");

  // Default values for now but could be replaced with current Auth User in future
  const defaultAuthorId = 1;
  const defaultAuthor = "Auth User";

  // Submitting a Post
  if (actionType === "createPost") {
    const result = PostSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      return json({ errors: result.error.flatten() }, { status: 400 });
    }

    const { title, content } = result.data;
    try {
      db.prepare(`INSERT INTO posts (author_id, author, title, content) VALUES (?, ?, ?, ?)`).run(defaultAuthorId, defaultAuthor, title, content);
      return json({ success: true } as ActionResponse);
    } catch (dbError: any) {
      console.error("Database error on post creation:", dbError);
      return json({ error: "Failed to create post." }, { status: 500 });
    }
  }

  // Submitting a Comment
  if (actionType === "createComment") {
    const result = CommentSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      return json({ errors: result.error.flatten() }, { status: 400 });
    }

    const { postId, content } = result.data;
    try {
      db.prepare(`INSERT INTO comments (post_id, author_id, author, content) VALUES (?, ?, ?, ?)`).run(postId, defaultAuthorId, defaultAuthor, content);
      return json({ success: true } as ActionResponse);
    } catch (dbError: any) {
      console.error("Database error on comment creation:", dbError);
      return json({ error: "Failed to create comment." }, { status: 500 });
    }
  }

  return json({ error: "Invalid form submission type." }, { status: 400 });
}

export default function MachineryLogPage() {
  const { posts } = useLoaderData<{ posts: Post[] }>();
  const postFetcher = useFetcher<ActionResponse>();
  const revalidator = useRevalidator();
  const prevPostFetcherState = useRef(postFetcher.state);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const isCreatingPost = postFetcher.state === "submitting";
  const postErrors: FieldErrors | undefined = postFetcher.data?.errors?.fieldErrors;

  useEffect(() => {
    const wasSubmitting = prevPostFetcherState.current === "submitting";
    const isSubmissionFinished = postFetcher.state !== "submitting";

    if (wasSubmitting && isSubmissionFinished && postFetcher.data?.success) {
      setPostTitle("");
      setPostContent("");
      revalidator.revalidate();
    }

    prevPostFetcherState.current = postFetcher.state;
  }, [postFetcher.state, postFetcher.data, revalidator]);

  return (
    <div className="flex flex-col min-h-screen bg-[#071733] font-inter antialiased">
      <PageHeader />
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#071733] to-[#040A1E] border border-slate-700 shadow-lg rounded-xl p-6 sm:p-8">
          <p className="text-white text-center mb-8">Share updates and log issues on heavy machinery</p>
          <div className="mb-10 p-6 bg-[#F9F9F9] rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-black mb-4">Submit a Post</h2>
            <postFetcher.Form method="post" className="space-y-4">
              <input type="hidden" name="_action" value="createPost" />
              <Input
                id="post-title"
                name="title"
                label="Title"
                type="text"
                placeholder="e.g., Excavator Hydraulic Leak"
                error={postErrors?.title ? postErrors.title[0] : undefined}
                required
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
              <TextArea
                id="post-content"
                name="content"
                label="Post Details"
                rows={4}
                placeholder="Describe the issue or update..."
                error={postErrors?.content ? postErrors.content[0] : undefined}
                required
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <Button type="submit" disabled={isCreatingPost} customClasses="w-full">
                {isCreatingPost ? "Posting..." : "Post"}
              </Button>
            </postFetcher.Form>
          </div>
          <PostsList posts={posts} revalidator={revalidator} />
        </div>
      </main>
    </div>
  );
}
