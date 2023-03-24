import { Attribute } from "@angular/core";

// export interface Content {
//   data: {
//     id: string ;
//     attributes: {
//       name: string;
//       description: string;
//       author: string;
//       price: string;
//       media:string[]
//     };

//   }
// }
export interface PostContent{
  data: {
    id?:number,
    name: string;
    description: string;
    author: string | null;
    price: string;
    media?:ImageData[]
  }
}

export interface ContentResponse {
  id: string ;
  attributes: {
    name: string;
    price: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    description: string;
    media: {
      data: mediaDataObj[];
    };

  }
}

export interface UpdateContent{
  data: ContentResponse[];
  meta: { };
}




export interface ContentData{
  data: ContentResponse[];
  meta: {
    pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
    }
};
}
export interface mediaDataObj{

  id:number;
  attributes: {
    createdAt: string,
    updatedAt: string,
    url:string,
    name:string,
    formats:{
      thumbnail:{
        url:string
      }
    }
    mime:string,
    size:number,
    alternativeText:string |null,
    caption:string | null,
    ext:string,
    hash:string,
    height:number | null,
    previewUrl:string | null,
    provider:string,
    provider_metadata:string | null,
    width:string |null

  }

}


export interface ImageData {
  id?:number;
  ext:string;
  has:string;
  height:number;
  mime:string;
  name:string;
  provider:string;
  previewUrl: string | null;
  size:number;
  url:string;
  width:number;
  formats: {
    thumbnail: {
      ext:string;
      hash:string;
      mime:string;
      size:number;
      url:string;
      widht:number;
      name:string
    }
  }

}
