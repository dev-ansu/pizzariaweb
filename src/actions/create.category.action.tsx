"use server";

import { CreateCategoryData, CreateCategoryValidator } from "@/_validators/CreateCategoryValidator";
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import { AxiosError } from "axios";


export const createCategory = async(user: CreateCategoryData)=>{
    "use server";
    
    const parsed = CreateCategoryValidator.safeParse(user);
    
    if (!parsed.success) {
        return {
                ok: false,
                fieldErrors: parsed.error.errors.map((err) => ({
                key: err.path[0],
                message: err.message,
            })),
        };
    } 

    const { data: { name } } = parsed;

    try{
        const token = await getCookieServer();
        const result = await api.post("/category", {
            name    
        }, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });   
        
        return {
            ok: true,
            message: "Categoria cadastrada com sucesso.",
        };
    }catch(err){
        if(err instanceof AxiosError){
            if(err.status === 401){
                return {
                    ok: false,
                    message: `Não autorizado.`
                };
            }
            console.log(err.response?.data)
            return {
                ok: false,
                message: `${err.response?.data.message}`
            };
        }   
       
        return {
            ok: false,
            message:"Erro inesperado. Por favor, tente novamente mais tarde."
        };    
    }
}