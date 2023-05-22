import {axiosInstance} from "./index";

const STREETS_URL = '/streets';

export async function fetchAllStreets() {
    return await axiosInstance.get(STREETS_URL)
}

export async function fetchAllStreetsWithTitles() {
    return await axiosInstance.get(STREETS_URL, {params: {withTitles: true}})
}

export async function addStreet(title: string, cityID: number) {
    return await axiosInstance.post(STREETS_URL, {title, cityID})
}

export async function removeStreetById(id: number) {
    return await axiosInstance.delete(STREETS_URL, {params: {id}})
}

export async function updateStreet(id: number, title: string, cityID: number) {
    return await axiosInstance.put(STREETS_URL, {id, title, cityID})
}