
export interface Content {
  data: {
      name?: string;
      description?: string;
      author?: string | null;
      price?: string;
      media?: any
  };

}


export interface ContentResponse {
  id: number;
  attributes: {
      name: string;
      price: string | number;
      author: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      description: string;
      media?: {
          data: mediaDataObj[];
      };

  }
}
export interface SingleContentData {
  data: ContentResponse;
  meta: {
      pagination: {
          page: number
          pageSize: number
          pageCount: number
          total: number
      }
  };
}

export interface ContentData {
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
export interface mediaDataObj {

  id: number;
  attributes: {
      createdAt: string,
      updatedAt: string,
      url: string,
      name: string,
      formats: {
          thumbnail: {
              url: string
          }
      } | null,
      mime: string,
      size: number,
      alternativeText: string | null,
      caption: string | null,
      ext: string,
      hash: string,
      height: number | null,
      previewUrl: string | null,
      provider: string,
      provider_metadata: string | null,
      width: string | null
  }

}

