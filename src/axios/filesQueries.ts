import {axiosInstance} from "./index";

export async function uploadFile(file: FormData) {
    return await axiosInstance.post('/files', file, {headers: {"Content-Type": "multipart/form-data"}})
}

export async function getFile(filename: string) {
    return await axiosInstance.get('/files/filename', {params: {value: filename}})
}