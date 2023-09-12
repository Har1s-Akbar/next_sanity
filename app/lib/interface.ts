export interface Post {
  title: string;
  author: {
    name: string;
    image:string;
  };
  mainImage: string;
  categories: [
    {
      title: string;
    }
  ];
  overview: string;
  content: any;
  publishedAt: string;
  _id: string;
  description:string;
  slug: {
    current: string;
  };
  _createdAt: string;
}


export interface Tag{
  title: string;
  description: string;
  _id:string;
}