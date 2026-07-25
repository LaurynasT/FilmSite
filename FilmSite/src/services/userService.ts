import { fetchData, postData, putData } from "../api/Api";
import { clearTokens, setTokens } from "../api/AxiosInstance";
import { LoginResponse } from "../interfaces/user/LoginResponse";
import type { RegisterUser } from "../interfaces/user/RegisterUser";
import type { LoginUser } from "../interfaces/user/LoginUser";
import { NewName } from "../interfaces/user/UpdateName";
import { User } from "../interfaces/user/User";


export async function loginUser(data: LoginUser) : Promise<LoginResponse>{
    const response = await postData<LoginResponse>(`/auth/login`, data)
    setTokens(response.accessToken, response.refreshToken)
    return response;
}

export async function registerUser(data: RegisterUser) {
    return postData("/auth/signup", data);
}  

export async function logout(): Promise<void> {
    await postData(`/auth/token/revoke`, {})
    clearTokens();
}

export async function updateName(data: NewName) {
    await putData("/auth/updatename", data);
}

export async function getUserData() {
    return fetchData<User>("/auth/getuser")
}