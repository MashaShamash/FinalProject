
import { UserId } from "../../auth/types/userTypes"
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
    userId: UserId,
    categoryId: CategoryId,

}


export type FigureId = Figure['id']
export type FigureWithoutId = Omit< Figure, 'id'>
export type FigureWithoutIdAndWithoutUserId = Omit<FigureWithoutId, 'userId'>
export type FigureWithoutIdAndWithoutUserIdAndWithoutName = Omit<FigureWithoutIdAndWithoutUserId, 'name'>
export type FigureWithoutIdAndWithoutUserIdAndWithoutNamelastName = Omit<FigureWithoutIdAndWithoutUserIdAndWithoutName, 'lastName'>
export type FigureWithoutIdAndWithoutUserIdAndWithoutNamelastNamePseudonym = Omit<FigureWithoutIdAndWithoutUserIdAndWithoutNamelastName, 'pseudonym'>
