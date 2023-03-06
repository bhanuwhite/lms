export interface newObj {
  id: number;
  url: string;
  title: string;
  desc: string;
  rating: number;
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

export interface conversationObj {
  question: string;
  description: string;
  img: string;
  name?: string | undefined
}
