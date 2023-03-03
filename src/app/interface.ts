export interface mainCourseData {
  id: number;
  url: string;
  title: string;
  desc: string;
  rating: number;
  category?: string;
  videoUrl?: string;
  coursePreview?: string;
}
export interface ratingObj {
  rating: number;
}
export interface QAcategory {
  key: string;
}
export interface dropDown {
  name: string;
}

export interface courseDataObj {
  name: string;
  date?: string;
  totalPrice: number;
  paymentType: string;
}

export interface trendingObj {
  question: string;
  description: string;
  img: string[];
  name?: string;
}

export interface conversationObj {
  question: string;
  description: string;
  img: string;
  name?: string | undefined;
}

export interface questionSolutionObj {
  name?: string;
  img?: string;
  solution: string | number;
  profession?: string;
}

export interface onlinePersonData {
  img: string;
  name: string;
  field: string;
  likeCount: number;
}
