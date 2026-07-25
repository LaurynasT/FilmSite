import { fetchData } from "../api/Api";
import type { Production } from "../interfaces/ProductionCompanies";

export async function fetchCompanyDetail(id: number){
    return fetchData<Production>(`/company/${id}`,  {
        language: "en-US"
    });
}