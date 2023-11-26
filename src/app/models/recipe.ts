import {Time} from "./time";
import {Nutrition} from "./nutrition";

export interface Recipe{
    id: number;
    name: string;
    author: string;
    description: string;
    // time: Time;
    instruction: string;
    nutrition: string[];
    ingredient: string[];
}
