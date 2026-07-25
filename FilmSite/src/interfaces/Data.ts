export interface Data<T> {
    page: number,
    totalResults: number,
    totalPages:number,
    results: T[],
}