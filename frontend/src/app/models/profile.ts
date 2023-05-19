export interface userProfile {
    biography: string,
    firstname: string,
    lastname: string,
    mobileNo:number,
    email:string,
    linkedin: string,
    selectedlanguages: selectedLanguages[],
    website: string,
}

export interface selectedLanguages {
    name: string
}
