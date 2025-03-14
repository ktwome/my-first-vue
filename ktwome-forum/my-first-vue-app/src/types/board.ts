// 게시글
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: Date;
  updated_at: Date | null;
  views: number;
}

export interface NewPost{
  title: string;
  content: string;
  author: string;
}
