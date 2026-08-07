export interface Cast {
    id: number,
    profile_path: string,
    name: string,
    character: string,
    credit_id: string,
}

export interface Crew {
    id: number,
    profile_path: string,
    name: string,
    job: string,
    department: string,
    credit_id: string
}

export interface Credits{
    cast: Cast[],
    crew: Crew[],
}