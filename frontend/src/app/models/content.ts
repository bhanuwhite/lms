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
    description: string;
    link: string;
    name: string;
    placeholder_img: AllCourseContentPlaceholder_Img;
    price: string;
    publishedAt?: string;
    status: string;
    technology: string;
    subject: string;
    level: string;
    no_of_purchases: number;
    total_duration:  number;
    course_duration:  any;
    user_id: string | number;
    pre_learning:any,
    user_learning:{u_learn:string}[],
    course_include:string[]

  };
}

export interface SingleCourseData {
  id: number;
  attributes: {
    content: AllCourseContentVideo;
    description: string;
    link: string;
    name: string;
    placeholder_img: AllCourseContentPlaceholder_Img;
    price: string;
    publishedAt?: string;
    status: string;
    technology: string;
    level: string;
    no_of_purchases: number;
    course_duration: any;
    user_id: string | number;
  };
}

export interface AllCoursePostData {
  data: {
    content: CourseContentVideoData[];
    description: string;
    link: string;
    name: string;
    placeholder_img: AllCourseContentPlaceholder_Img;
    price: number;
    publishedAt?: string;
    status: string;
    technology: string;
    user_id: string | number;
  };
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
      name: string;
      url: string;
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
    name: string;
    url: string;
    size: number;
    height: number | null;
    width: string | null;
  };
}

export interface AllCourseContentPlaceholder_Img {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      formats: {
        thumbnail: {
          url: string;
        };
      } | null;
      name: string;
      url: string;
      size: number;
      width: string | null;
    };
  };
}

export interface ContentImgUpload {
  id: number;
  formats: {
    thubnail: {
      size: number;
      url: string;
      width: number;
      name: string;
    };
  } | null;
  name: string;
  url: string;
}

export interface postCourseContentData {
  data: {
    content?: {
      name: string;
      url: string;
    }[];
    course_duration?: string | number;
    description?: string;
    level?: string;
    link?: string;
    name?: string;
    placeholder_img?: {
      formats?: {
        thumbnail: {
          url: string;
        };
      };
    };
    price?: number | string;
    status?: string;
    technology?: string;
    subject?: string;
    user_id?: number;
    no_of_purchases?: number;
    user_learning?:any,
    pre_learning?:any,
    course_include?:any,
    files?:any
  };
}

// END..




export interface ContentResponse {
  id: number;
  attributes: {
    name?: string;
    price?: string | number;
    author?: string;
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
export interface mediaDataObj {
  id: number;
  attributes: {
    url: string;
    name: string;
    formats: {
      thumbnail: {
        url: string;
      };
    } | null;
    size: number;
    width: string | null;
  };
}
