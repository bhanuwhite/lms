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
    technologies: any;
    subject: string;
    level: string;
    rating: number;
    no_of_purchases?: number;
    total_duration: number;
    course_duration: any;
    user_id: string | number;
    course_include: string[];
  };
}

export interface myFiles {
  data: {
    id:number,
    attributes:{
      alternativeText:string,
      caption:string,
      ext:string,
      hash:string,
      name:string,
      url:string
    }
  }[]
}

export interface SingleCourseObj {
  id: number;
  attributes:{
    content:{
      data : {
        id:number,
        attributes:{
          alternativeText: string,
          caption:string,
          ext:string,
          hash:string,
          name:string,
          url:string
        } [] | null
      }
    },
    course_includes?:string[],
    createdAt:string,
    creater_id:null | string,
    description:string,
    discount:number | string,
    files?:myFiles,
    level:string,
    link:string,
    name:string,
    no_of_purchases:number | string,
    placeholder_img:any,
    price:number | string,
    rating:null | number,
    review : null | string,
    status:string,
    subject:string,
    technologies:any,
    total_duration:number | string,

  }
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
    technologies: any;
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
    technologies: any;
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
    } ;
    price?: number | string;
    status?: string;
    technology?: string;
    subject?: string;
    user_id?: number;
    no_of_purchases?: number ;
    course_include?: any;
    files?: any;
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

export interface mediaDocument {
  alternativeText: null;
  caption: null;
  createdAt: string;
  ext: string;
  formats: null;
  hash: string;
  height: null;
  id: number;
  mime: string;
  name: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  size: number;
  updatedAt: string;
  url: string;
  width: null;
}

export interface videoObj {
  alternativeText: string;
  caption: string;
  ext: string;
  hash: string;
  id: number;
  mime: string;
  name: string;
  size: number;
  url: string;
}
