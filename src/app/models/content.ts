import { Attribute } from "@angular/core";

export interface Content {
    name:string,
    description:string,
    author:string,
    price:string,
    media:[]
}

export class ContentResponse {
  id?: number;
  attributes?: {
    name?:string,
    price?:number,
    author?:string,
    createdAt?: string,
    updatedAt?: string,
    publishedAt?: string,
    description?:string,
    media?: {
         data?: mediaDataObj[];
    }

  }
}

export class ContentData{
  data?: ContentResponse[];
  meta?: {
    pagination: {
        page: number | undefined;
        pageSize: number | undefined;
        pageCount: number | undefined;
        total: number | undefined;
    }
};
}
export class mediaDataObj{

  id?:number;
  attributes?: {
    createdAt?: string,
    updatedAt?: string,
    url?:string,
    name?:string,
    formats?:string | null,
    mime?:string,
    size?:number,
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

// }
