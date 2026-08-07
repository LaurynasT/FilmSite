import { fetchData, postData, putData } from "../api/Api";
import { LoginResponse } from "../interfaces/user/LoginResponse";
import type { RegisterUser } from "../interfaces/user/RegisterUser";
import type { LoginUser } from "../interfaces/user/LoginUser";
import { NewName } from "../interfaces/user/UpdateName";
import { User } from "../interfaces/user/User";


export async function loginUser(data: LoginUser) : Promise<LoginResponse>{
    const response = await postData<LoginResponse>(`/auth/login`, data)
    return response;
}

export async function registerUser(data: RegisterUser) {
    return postData("/auth/signup", data);
}  

export async function logoutUser(): Promise<void> {
    await postData(`/auth/token/revoke`, {})
   
}

export async function updateName(data: NewName) {
    await putData("/auth/updatename", data);
}

export async function getUserData() {
    return fetchData<User>("/auth/getuser")
}