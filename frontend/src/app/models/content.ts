  // Course content Interface Start
export interface AllCourseContent {
  data: AllCourseContentData[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}
export interface AllCourseContentData {
  data: AllCourseContentData;
  id: number;
  attributes: {
    content: AllCourseContentVideo;
    createdAt?: string;
    description: string;
    link: string;
    name: string;
    placeholder_img: AllCourseContentPlaceholder_Img;
    price: string;
    publishedAt?: string;
    status: string;
    technology: string;
    user_id: string | number;
  };
}

export interface AllCoursePostData {
  data : {
    content: CourseContentVideoData[];
    createdAt?: string;
    description: string;
    link: string;
    name: string;
    placeholder_img: AllCourseContentPlaceholder_Img;
    price: number;
    publishedAt?: string;
    status: string;
    technology: string;
    user_id: string | number;
  }
}

export interface AllCourseContentVideo {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      formats: {
        thumbnail: {
          url: string;
        };
      } | null;
      mime: string;
      name:string;
      url:string;
      size: number;
      alternativeText: string | null;
      caption: string | null;
      ext: string;
      hash: string;
      height: number | null;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      width: string | null;
    };
  }[];
}

export interface CourseContentVideoData {

    id: number;
    attributes: {
      createdAt: string;
      formats: {
        thumbnail: {
          url: string;
        };
      } | null;
      mime: string;
      name:string;
      url:string;
      size: number;
      alternativeText: string | null;
      caption: string | null;
      ext: string;
      hash: string;
      height: number | null;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      width: string | null;
    };

}

export interface AllCourseContentPlaceholder_Img{
  data: {
    id: number;
    attributes: {
      createdAt: string;
      formats: {
        thumbnail: {
          url: string;
        };
      } | null;
      mime: string;
      name:string;
      url:string;
      size: number;
      alternativeText: string | null;
      caption: string | null;
      ext: string;
      hash: string;
      height: number | null;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      width: string | null;
    };
  }
}

export interface ContentImgUpload {
  id: number;
  alternativeText: string | null;
  caption: string | null;
  createdAt: string;
  ext: string;
  formats: {
    thubnail: {
      ext: string;
      size: number;
      url: string;
      width: number;
      hash: string;
      height: number;
      mime: string;
      name: string;
      path: string | null;
    };
  } | null;
  hash: string;
  height: number | null;
  mime: string;
  name: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
}

// END..

export interface Content {
  data: {
    name?: string;
    description?: string;
    author?: string | null;
    price?: string;
    media?: mediaDataObj[];
  };
}

export interface ContentResponse {
  id: number;
  attributes: {
    name?: string;
    price?: string | number;
    author?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    description?: string;
    media?: {
      data: mediaDataObj[];
    };
  };
}

export interface SingleContentData {
  data: ContentResponse;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ContentData {
  data: ContentResponse[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
export interface mediaDataObj {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    url: string;
    name: string;
    formats: {
      thumbnail: {
        url: string;
      };
    } | null;
    mime: string;
    size: number;
    alternativeText: string | null;
    caption: string | null;
    ext: string;
    hash: string;
    height: number | null;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    width: string | null;
  };
}



export interface userLibrary {
  data: {
    id?: string;
    attributes?: {
      content_library: ContentResponse;
      course_id: number;
      createdAt: string;
      publishedAt: string;
      updatedAt: string;
      user_id: number;
    };
  };
}

export interface ContentLibrary {
  data: {
    content_library: number;
    course_id: number;
    user_id: number;
  };
}
export interface userLibrary {
  data: {
    id?: string;
    attributes?: {
      content_library: ContentResponse;
      course_id: number;
      createdAt: string;
      publishedAt: string;
      updatedAt: string;
      user_id: number;
    };
  };
}

export interface getContentLibrary {
  data: userLibrary[];
}
