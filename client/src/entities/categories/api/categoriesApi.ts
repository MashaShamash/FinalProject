import type { AxiosResponse } from "axios"
import axiosInstance from "../../../services/axiosInstance"
import type { Category, CategoryId, CategoryWithoutId } from "../types/categoryTypes";

class CategoryApi {
    static getAllCategory = async (): Promise<Category[]>=>{
        const response: AxiosResponse<{message: string; categories: Category[]}>=
        await axiosInstance.get('/categories')
        return response.data.categories

    }

    static createCategory = async(body:CategoryWithoutId):Promise<Category> =>{
        const response: AxiosResponse<{message: string; category: Category}>=
        await axiosInstance.post('/categories', body);
        return response.data.category
    }

    static deleteCategory = async (id: CategoryId):Promise< CategoryId | string>=>{
        const response: AxiosResponse<{message: string}>=
        await axiosInstance.delete(`/categories/${id}`)
        if (response.data.message === 'success'){
            return id
        }
        return 'noy'
    }

    static updateCategory = async (obj: {id:CategoryId; body:CategoryWithoutId}):Promise<Category> =>{
        const response: AxiosResponse<{ category: Category}>=
        await axiosInstance.put(`/categories/${obj.id}`,
            obj.body,
        );
        return response.data.category;
}
}

export default CategoryApi