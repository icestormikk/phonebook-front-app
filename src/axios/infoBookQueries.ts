import {axiosInstance} from "./index";

const INFOS_URL = '/infos';

export async function fetchAllInfos() {
    return await axiosInstance.get(INFOS_URL)
}

export async function fetchAllInfosWithMoreInfo() {
    return await axiosInstance.get(INFOS_URL, {params: {withMoreInfo: true}})
}

export async function addInfo(
    phone: string, personID: number, categoryID: number, addressID: number
) {
    return await axiosInstance.post(
        INFOS_URL,
        {
            phone, personID, categoryID, addressID
        }
    )
}

export async function removeInfoById(id: number) {
    return await axiosInstance.delete(INFOS_URL, {params: {id}})
}

export async function updateInfoEntity(
    id: number, phone: string, personID: number, categoryID: number, addressID: number
) {
    return await axiosInstance.put(
        INFOS_URL,
        {
            id, phone, personID, categoryID, addressID
        }
    )
}