import { CategoryId } from "../../categories/types/categoryTypes"

export type Figure ={
    id: number,
    title: string,
    date: number,
    img: string,
    materials: string,
    height: number,
    price: number,
    name: string,
    lastName: string,
    pseudonym: string,
    biography: string,
    width: number,
    sell: boolean,
    categoryId: CategoryId,

}


export type FigureId = Figure['id']
export type FigureWithoutId = Omit< Figure, 'id'>
