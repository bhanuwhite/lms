export interface CourseData {
  course_ids: courseDetails[];
  createdAt: string;
  id: number;
  progress_percentage: number | null;
  publishedAt: string;
  time_consumed: string;
  total_duration: string;
  updatedAt: string;
  user_id: userDetails;
}

export interface userDetails {
  biography: string;
  blocked: boolean;
  confirmationToken: string | null;
  confirmed: boolean;
  createdAt: string;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  linkedIn: string | null;
  mobile: string;
  password: string;
  provider: string;
  resetPasswordToken: string | null;
  role_id: string;
  updatedAt: string;
  username: string;
}

export interface courseDetails {
  content: content[];
  course_include: string[];
  createdAt: string;
  creator_id: number | null;
  description: string;
  discount: string;
  id: number;
  level: string;
  link: string;
  name: string;
  no_of_purchases: string;
  placeholder_img: img;
  pre_learning: { 1: string; 2: string; 3: string; 4: string };
  price: number;
  publishedAt: string;
  rating: number;
  review: null | string;
  status: string;
  subject: string;
  technologies: { 1: string; 2: string; 3: string; 4: string };
  total_duration: string;
  updatedAt: string;
  user_learning: { 0: string; 1: string };
  video_name: null | string;
}

export interface img {
  alternativeText: null;
  caption: string | null;
  createdAt: string;
  ext: string;
  folderPath: string;
  formats: {
    thumbnail: {
      ext: string;
      hash: string;
      height: number;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      url: string;
      width: number;
    };
  };
  hash: string;
  height: number;
  id: number;
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

export interface content {
  alternativeText: string;
  caption: string | null;
  createdAt: string;
  ext: string;
  folderPath: string;
  formats: string | null;
  hash: string;
  height: number | null;
  id: number;
  mime: string;
  name: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  size: number;
  updatedAt: string;
  url: string;
  width: number | null;
}

export interface postUserCourse {
  data: {
    course_ids: number;
    user_id: number;
  };
}

export interface postUserCourseData {
  data: {
    attributes: {
      createdAt: string;
      progress_percentage: null;
      publishedAt: string;
      time_consumed: string;
      total_duration: string;
      updatedAt: string;
    };
    id: number;
  };
}
