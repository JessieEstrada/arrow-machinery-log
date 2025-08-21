export interface Post {
  id: number;
  author_id: number;
  author: string;
  title: string;
  content: string;
  created_at: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  post_id: number;
  author_id: number;
  author: string;
  content: string;
  created_at: string;
}

export interface ActionResponse {
  errors?: {
    fieldErrors?: FieldErrors;
    formErrors?: string[];
  };
  error?: string;
  success?: boolean;
}

export interface FieldErrors {
  title?: string[];
  content?: string[];
  postId?: string[];
}
