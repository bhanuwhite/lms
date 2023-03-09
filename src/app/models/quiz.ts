export interface Quiz {
    data: {
        all_answer: {
            A: number | string;
            B: number | string;
            C: number | string;
            D: number | string;
        };
        syllabus?: string;
        question?: string;
        correct_answer?: string;
    }
}


export class QuizResponse {

    id?: number;
    attributes?: {
        syllabus?: string;
        question?: string;
        createdAt?: string;
        updatedAt?: string;
        publishedAt?: string;
        all_answer?: {
            A: number | string;
            B: number | string;
            C: number | string;
            D: number | string;
        };
        correct_answer?: string;
    }
}

export class QuizData {
    data?: QuizResponse[];
    // meta?: {
    //     pagination: {
    //         page: number | undefined;
    //         pageSize: number | undefined;
    //         pageCount: number | undefined;
    //         total: number | undefined;
    //     }
    // };
}