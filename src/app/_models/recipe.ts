export interface Recipe{
    id: number,
    name: string,
    description: string,
    cookingTime: number,
    preparationTime: number,
    readyTime: number,
    instruction: any[],
    nutrition: any,
    ingredient: any[],
    image: string,
    servings: number,
    caloricBreakdown: any,
    dishTypes: string[]
}
