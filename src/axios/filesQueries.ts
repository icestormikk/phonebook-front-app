import {axiosInstance} from "./index";

export async function uploadFile(data: FormData) {
    return await axiosInstance.post('/files', data)
}