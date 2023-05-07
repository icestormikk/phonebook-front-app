import {axiosInstance} from "./index";

const CITIES_URL = '/cities';

export async function fetchAllCities() {
    return await axiosInstance.get(CITIES_URL)
}

export async function removeCityById(id: number) {
    return await axiosInstance.delete(CITIES_URL, {params: {id}})
}

export async function addCity(title: string) {
    return await axiosInstance.post(CITIES_URL, {title})
}