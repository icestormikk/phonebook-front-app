import {axiosInstance} from "./index";

export async function fetchEntireHistory() {
    return await axiosInstance.get('/history')
}