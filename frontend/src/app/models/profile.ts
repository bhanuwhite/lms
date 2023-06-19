export interface userProfile {
    id:number,
    username:string,
    biography: string,
    firstname: string,
    lastname: string,
    mobile:number,
    email:string,
    linkedIn: string,
    website: string,
    role_id:number
}

export interface selectedLanguages {
    name: string
}

export interface userUpdateProfile {

  username: string;
    firstname: string;
    lastname: string;
    email: string;
    mobile:number;
    biography?: string;
    linkedIn?: string;

}


