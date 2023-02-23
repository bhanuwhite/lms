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
