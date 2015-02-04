interface IPageable<T> {
    totalCount: number;
    items: T[];
}  