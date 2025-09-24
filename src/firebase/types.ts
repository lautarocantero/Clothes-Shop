
export interface loginWithUserEmail {
    email: string,
    password: string,
}

export interface registerWithUserEmail extends loginWithUserEmail  {
    displayName: string,
}