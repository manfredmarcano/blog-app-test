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
