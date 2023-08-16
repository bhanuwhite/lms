export interface UserDetails {
  biography: string | null;
  email: string;
  id: number;
  firstname: string | null;
  lastname: string | null;
  mobile: number;
  role_id: number | number;
  username: string;
  password?: string;
  resetPasswordToken: string | null;
}

export interface UserProgressDetails {
  course_ids: {
    content:{
      id:number,
      alternativeText:string | null,
      caption:string | null,
      ext:string,
      mime:string,
      name:string,
      size:number,
      url:string
    }[],
    course_include:string[],
    description:string,
    discount:string | number,
    id:number,
    level: string,
    link:string,
    name:string,
    placeholder_img:{
      ext:string,
      name:string,
      id:number,
      url:string,
      formats:{
        thumbnail:{
          name:string,
          url:string,
          ext:string,
          size:number
        }
      }
    },
    price:string | number,
    rating:number,
    review:string | null,
    status: string,
    subject:string,
    technologies:any,
    total_duration:string | number,
    video_name:string | null

  }[];
  id: number;
  progress_percentage: string | number;
  time_consumed: string | number;
  total_duration: string | number;
  transactionId: number | string | null;
  user_id: UserDetails;
}

export interface UserTechData {
  id:number,
  attributes:{
    technologies:{ tech:string}
  }
}
export interface UserCatData {
  id:number,
  attributes:{
    categories:{ tech:string}
  }
}
