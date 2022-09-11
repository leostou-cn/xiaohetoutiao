export interface ArticleDetailType {
  art_id: string;
  title: string;
  pubdate: string;
  aut_id: string;
  content: string;
  aut_name: string;
  aut_photo: string;
  is_followed: boolean;
  is_collected: boolean;
  attitude: number;
  comm_count: number;
  read_count: number;
  like_count: number;
}

export interface CommentType {
  type: string,
  source: string,
  offset?: string | number | undefined,
  limit?: string | number | undefined
}

export interface SendCommentType {
  target: string,
  content: string,
  art_id: string
}

export interface LikeCommentType {
  target: string,
  type: boolean
}