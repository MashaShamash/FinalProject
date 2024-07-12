
export type Category ={
    id: number,
    title: string,
    img: string,
    
}


export type CategoryId = Category['id']
export type CategoryWithoutId = Omit< Category, 'id'>
