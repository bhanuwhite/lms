export interface Login {
  identifier: string;
  password: string;
}
export interface LoginObjData {
  jwt: string;
  user: {
    blocked: boolean;
    confirmed: boolean;
    createdAt: string;
    email: string;
    id: number;
    provider: string;
    role_id: number | string;
    updatedAt: string;
    username: string;
  };
}

export interface SignUp {
  username: string;
  email: string;
  password: string;
}
