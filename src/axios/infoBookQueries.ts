import {axiosInstance} from "./index";

const INFOS_URL = '/infos';

export async function fetchAllInfos() {
    return await axiosInstance.get(INFOS_URL)
}

export async function fetchAllInfosWithMoreInfo() {
    return await axiosInstance.get(INFOS_URL, {params: {withMoreInfo: true}})
}

export async function addInfo(
    phone: string, email: string, isqID: number, personID: number, categoryID: number, addressID: number
) {
    return await axiosInstance.post(
        INFOS_URL,
        {
            phone, email, isqID, personID, categoryID, addressID
        }
    )
}

export async function removeInfoById(id: number) {
    return await axiosInstance.delete(INFOS_URL, {params: {id}})
}