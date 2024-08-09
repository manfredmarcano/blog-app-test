interface IPostAuthor {
  name: string;
  avatar: string;
}

export interface IPost {
  id: number | string;
  title: string;
  content: string;
  author: IPostAuthor;
  datetime: string;
  monthlyPrice: number;
  image: string;
}

export interface IDataBaseUser {
  id: number | string;
  email: string;
}

export interface IDataBaseFavorites {
  id: number | string;
  posts: (number | number)[];
  user: number | string;
}

export interface IDataBase {
  favorites: IDataBaseFavorites[]
  users: IDataBaseUser[];
}

export type TOAST = "success" | "error" | "warning";
