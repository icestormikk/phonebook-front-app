import {axiosInstance} from "./index";

const TYPES_URL = '/types'

export async function fetchAllTypes() {
    return await axiosInstance.get(TYPES_URL)
}

export async function addType(title: string) {
    return await axiosInstance.post(TYPES_URL, {title})
}

export async function deleteTypeById(id: number) {
    return await axiosInstance.delete(TYPES_URL, {params: {id}})
}

export async function updateType(id: number, title: string) {
    return await axiosInstance.put(TYPES_URL, {id, title})
}