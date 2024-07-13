export type Figure ={
    id: number,
    title: string,
    date: Date,
    img: string,
    materials: string,
    height: number,
    price: number,
    width: number,
    sell: boolean

}


export type FigureId = Figure['id']
export type FigureWithoutId = Omit< Figure, 'id'>
