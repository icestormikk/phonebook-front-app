import {axiosInstance} from "./index";

const PERSONS_URL = '/persons';

export async function fetchAllPersons() {
    return await axiosInstance.get<Array<any>>(PERSONS_URL)
}

export async function deletePersonById(id: number) {
    return await axiosInstance.delete(PERSONS_URL, {params: {id}})
}

export async function addPerson(name: string, surname: string, patronymic: string) {
    return await axiosInstance.post(
        PERSONS_URL,
        {
            name, surname, patronymic
        }
    )
}