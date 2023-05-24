export interface Content {
  data: {
    name?: string;
    description?: string;
    author?: string | null;
    price?: string;
  };
}

export interface UserLibraryGetResponse {
  data: UserLibraryGetResponseData[];
  meta?: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}
export interface UserLibraryGetResponseData {
  map(arg0: (obj: UserLibraryGetResponseData) => number): number[];
  id: number;
  attributes: {
    course_content: {
      data: {
        id: number;
        attributes: {
          content: {
            data: {
              id: number;
              attributes: {
                name: string;
                url: string;
              };
            }[];
          };
          description:string,
          link:string,
          name:string,
          placeholder_img : {
            data:{
              id:number,
              attributes:{
                formats:{
                  thumbnail:{
                    url:string,
                    name?:string
                  }
                },
                name:string,
                url:string
              }
            }
          },
          price:number,
          status:string,
          technology:string,
          user_id:number
        };
      };
    };
  };
}
export interface LibraryGetResponse {
  data: LibraryObjectData[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface LibraryObjectData {
  id: number;
  attributes: {
    course_content: CourseContentObj;
  };
}

export interface CourseContentObj {
  data: AddedCourseDataLib;
}

export interface LibraryVideoContent {
  id: number;
  attributes: {
    name: string;
    url: string;
    formats?: {
      thumbnail: {
        url: string;
        name: string;
      };
    };
  };
}

export interface AddedCourseDataLib {
  id: number;
  attributes: {
    id: number;
    attributes: {
      content: {
        data: LibraryVideoContent[];
      };
      description: string;
      link: string;
      name: string;
      placeholder_img: {
        data: LibraryVideoContent;
      };
      price: number;
      status: string;
      technology: string;
      user_id: number;
    };
  };
}

export interface RemoveLibraryData {
  data: {
    id: number;
    attributes: {};
  };
  meta: {};
}
