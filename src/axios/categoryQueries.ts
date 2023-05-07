import {axiosInstance} from "./index";

const CATEGORIES_URL = '/categories';

export async function fetchAllCategories() {
    return await axiosInstance.get(CATEGORIES_URL)
}

export async function removeCategoryById(id: number) {
    return await axiosInstance.delete(CATEGORIES_URL, {params: {id}})
}

export async function addCategory(title: string) {
    return await axiosInstance.post(CATEGORIES_URL, {title})
}