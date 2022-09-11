export interface ArticleListType {
  data: {
    pre_timestamp: number,
    results: Array<Object>
  }
}

export interface FeedBackFormType {
  target: string | undefined,
  type: string | undefined,
  remark: string | undefined
}

export interface OnSelectType {
  name: string,
  type: string
}



export interface RootObject {
  results: Result[];
  pre_timestamp: string | number;
}

export interface Result {
  art_id: string | number;
  title: string;
  aut_id: string | number;
  comm_count: number;
  pubdate: string;
  aut_name: string;
  is_top: number;
  cover: Cover;
}

export interface Cover {
  type: number;
  images?: string[];
}
