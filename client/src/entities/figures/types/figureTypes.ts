import { CategoryId } from "../../categories/types/categoryTypes"

export type Figure ={
    id: number,
    title: string,
    date: Date,
    img: string,
    materials: string,
    height: number,
    price: number,
    width: number,
    sell: boolean,
    categoryId: CategoryId,

}


export type FigureId = Figure['id']
export type FigureWithoutId = Omit< Figure, 'id'>
