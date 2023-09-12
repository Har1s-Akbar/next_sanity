export interface Post {
  title: string;
  author: {
    name: string;
    image:string;
    bio: any;
  };
  mainImage: string;
  categories: [
    {
      title: string;
      _id: string;
    }
  ];
  overview: string;
  body: any;
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