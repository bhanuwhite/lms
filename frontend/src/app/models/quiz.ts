export interface Quiz {
    data: {
      level: string;
      question: string;
      answers: string;
      q_options: {
        a: number | string;
        b: number | string;
        c:number | string;
        d: number | string;
      },
      course_name: string;
    }
}


export interface QuizResponse {

    id: number ;
    attributes: {
      course_name: string;
        question: string;
        level:string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        q_options: {
            a: number | string;
            b: number | string;
            c: number | string;
            d: number | string;
        };
        answers: string;
    }
}


export interface QuizData {
    data: QuizResponse[];

}
