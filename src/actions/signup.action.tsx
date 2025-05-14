"use server";

import { SignUpFormData, SignUpValidatorSchema } from "@/_validators/SignUpValidator";
import { api } from "@/services/api";
import { AxiosError } from "axios";


export const registerUser = async(user: SignUpFormData)=>{
    "use server";
    
    const parsed = SignUpValidatorSchema.safeParse(user);
    
    if (!parsed.success) {
        return {
                ok: false,
                fieldErrors: parsed.error.errors.map((err) => ({
                key: err.path[0],
                message: err.message,
            })),
        };
    } 

    const { data: { name, email, password } } = parsed;
    
    try{
        const result = await api.post("/users", {
            name, email, password        
        });   
        return {
            ok: true,
            message: "Usuário cadastrado com sucesso.",
        };
    }catch(err){
        if(err instanceof AxiosError){
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