import axiosInstance from "./AxiosInstance"


export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const IMAGE_BACKGROUND_URL= "https://image.tmdb.org/t/p/w1280"
export const fetchData = async <T>(
    endpoint: string,
    queryParams?: Record<string, any>
) : Promise<T> => {
    const response = await axiosInstance.get<T>(endpoint, {params: queryParams})
    return response.data;
}

export const deleteData = async <T>(
    endpoint: string,
) : Promise<T> => {
    const url =  `${endpoint}`
    const response = await axiosInstance.delete<T>(url)
    return response.data;
}
export const putData = async <T>(endpoint: string, params: object): Promise<T> => {
  const response = await axiosInstance.put<T>(endpoint, params)
  return response.data
}

export const postData = async <T>(endpoint: string, params: object): Promise<T> => {
  const response = await axiosInstance.post<T>(endpoint, params)
  return response.data
}

