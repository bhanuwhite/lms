export interface TrackResponse {
  data:TrackResponseData[],
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}
export interface TrackResponseData {
  id:number,
  attributes:{
    course_id:number,
    time_consumed:number,
    total_duration:number,
    tracking_id?:number | null,
    user_id:number
  }
}

export interface TrackPost {
  data : {
    course_id:number,
    time_consumed:number,
    total_duration:number,
    tracking_id?:number | null,
    user_id:number
  }
}

export interface TrackPut {
  data : {
    time_consumed:number,
    total_duration:number,
    tracking_id?:number | null,
  }
}

