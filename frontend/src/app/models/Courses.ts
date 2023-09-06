export interface TotalCoursesData {
  data: CourseResData[];
  meta?: CoursesMetaData;
}
export interface CoursesMetaData {
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  };
}
export interface CoursesDataObj {
  id: number;
  attributes: {
    assignment: {
      data: {
        id: number;
        attributes: CoursesAttributes;
      };
    };
    courseContent: {
      data: {
        id: number;
        attributes: CoursesAttributes;
      };
    };
    courseDescription: string;
    createdAt: string;
    publishedAt: string;
    title: string;
    updatedAt: string;
  };
}
export interface CoursesAttributes {
  alternativeText: string | null;
  ext: string;
  formats: {
    thumbnail: {
      ext: string;
      hash: string;
      height: number;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      width: number;
      url: string;
    };
  };
  hash: string;
  height: number;
  id?: number;
  mime: string;
  name: string;
  createdAt?: string;
  provider: string;
  size: number;
  previewUrl: string | null;
  caption: string | null;
  updatedAt: string;
  url: string;
  width: number;
}
export interface CourseResData {
  id: number;
  attributes?: {
    assignment?: {
      data: {
        id: number;
        attributes: CoursesImgUpload;
      };
    };
    courseContent?: {
      data: {
        id: number;
        attributes: {
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
          };
          hash: string;
          height: number;
          mime: string;
          name: string;
          previewUrl: string | null;
          provider: string;
          provider_metadata: string | null;
          size: number;
          updatedAt: string;
          url: string;
          width: number;
        };
      };
    };
    CourseDescription: string;
    createdAt: string;
    publishedAt: string;
    title: string;
    updatedAt: string;
  };
}
export interface CoursesImgUpload {
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
  };
  hash: string;
  height: number;
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
export interface UpdateCourseObj {
  data: {
    assignment: number | undefined;
    courseContent: number;
    courseDescription: string;
    title: string;
  };
}
export interface PostCourseData {
  data: {
    assignment: number | undefined;
    courseContent: number | undefined;
    courseDescription: string;
    title: string;
  };
}
