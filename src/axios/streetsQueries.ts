import {axiosInstance} from "./index";

const STREETS_URL = '/streets';

export async function fetchAllStreets() {
    return await axiosInstance.get(STREETS_URL)
}

export async function addStreet(title: string) {
    return await axiosInstance.post(STREETS_URL, {title})
}

export async function removeStreetById(id: number) {
    return await axiosInstance.delete(STREETS_URL, {params: {id}})
}