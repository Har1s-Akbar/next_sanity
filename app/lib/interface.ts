export interface Post {
  title: string;
  author: {
    name: string;
    image:string;
    bio: any;
    slug:{
      current:string;
    };
  };
  mainImage: string;
  categories: [
    {
      title: string;
      _id: string;
      slug:{
        current:string
      };
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
  slug:{
    current:string;
  }
}

export interface TagPost{
  description: string;
  slug:{
    current:string;
  };
  title:string;
  posts:any;
}

export interface Author{
  name: string;
  image: any;
  bio:any;
  slug:{
    current:string
  };
  _createdAt: string;
}

export interface AuthorData{
  name: string;
  image: any;
  bio:any;
  slug:{
    current:string
  };
  _createdAt: string;
  posts : any;
}

export interface TopPicksType{
  posts: any;
  title: string;
  description: string;
}

export interface profileArray{
  
}

export interface ProfileInterface {
  id: string;
  avatar_url:string;
  username:string;
  full_name:string;
}