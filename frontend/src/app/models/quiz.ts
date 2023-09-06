export interface Quiz {
  data: {
    level: string;
    status?: boolean;
    question: string;
    answers: string;
    q_options: {
      a: number | string;
      b: number | string;
      c: number | string;
      d: number | string;
    };
    course_name: string;
  };
}

export interface answers {
  name: string;
  checked: boolean;
}
export interface level {
  level_name: string;
}

export interface QuizResponse {
  id: number;
  attributes: {
    course_name: string;
    question: string;
    level: string;
    status?: boolean;
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
  };
}
export interface QuizData {
  data: QuizResponse[];
}
export interface QuizDetails {
  id: number;
  attributes: {
    course_name: string;
    question: string;
    status?: boolean;
    level: string;
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
  };
  questionStates: {
    isCorrect: boolean;
    correctAnswer: string | null;
    visible: boolean;
    selectedIndex: number;
    selectedOption: string | null;
  };
}
