export interface User {
    id: number,
    username: string,
    name: string,
    email: string,
    pwd: string,
    id_admin: boolean,
    dietType: number,
}
export interface Favorite{
    id: number,
    isDelete: boolean,
    userId: number,
    recipeId: number,
}
export interface Feedback{
    id: number,
    comment: string,
    rate: number,
    userId: number,
    recipeId: number,
}
export interface GroceryList{
    id: number,
    name: string,
    quantity: number,
    unit: string,
    userId: number,
    recipeId: number,
}
export interface ScheduledMeal{
    id: number,
    date: string,
    userId: number,
    recipeId: number,
}
export interface UserProfile{
    id: number,
    type: string,
    name: string,
    userId: number,
}
