export interface CartResponse {
  course_ids: CartCourseIdsData[];
  id: number;
  user_id?: {
    biography: string | null;
    blocked: boolean;
    confirmationToken: string | null;
    email: string;
    firstname: string;
    id: number;
    lastname: string;
    linkedIn: string;
    mobile: number | null;
    password: string;
    resetPasswordToken: string | null;
    role_id: string | number;
    username: string;
  };
}

export interface CartCourseIdsData {
  content: {
    name: string;
    url: string;
    mime: string;
  }[];
  creator_id?: number | string;
  description: string;
  id: number;
  level: string;
  link: string;
  name: string;
  no_of_purchases: number | string;
  placeholder_img: {
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
  price: number | string;
  rating: number | null;
  status: string;
  technology: string;
}

// cart Post body

export interface CartPostBody {
  data: {
    course_ids: number;
    user_id: number;
  };
}
export interface CartPostRes {
  id: number;
  attributes: {
    createdAt: string;
    updateAt: string;
    publishedAt: string;
  };
}
export interface CartGetRes {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updateAt: string;
      publishedAt: string;
    };
  }[];
  meta?: {};
}
