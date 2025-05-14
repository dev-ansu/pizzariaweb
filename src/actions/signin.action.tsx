"use server";

import { SignInFormData, SignInValidatorSchema } from "@/_validators/SignInValidator";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { cookies } from "next/headers";


export const auth = async(user: SignInFormData)=>{
    "use server";
    
    const parsed = SignInValidatorSchema.safeParse(user);

    if (!parsed.success) {
        return {
                ok: false,
                fieldErrors: parsed.error.errors.map((err) => ({
                key: err.path[0],
                message: err.message,
            })),
        };
    } 
    const {data:{email, password}} = parsed;
    try{
        const result = await api.post("/session", {
            email, password        
        });   
        if(result.data.token){
              const expressTime = 60 * 60 * 24 * 30
                const cookieStore = await cookies();
                cookieStore.set("session", result.data.token,{
                    maxAge: expressTime,       
                    httpOnly: false,
                    secure: process.env.NODE_ENV  === "production"           
                });
            return {
                ok: true,
                message: "Autenticação realizada com sucesso.",
                data: result.data,
            };
        }else{
            return {
                ok: false,
                message:"Erro inesperado. Por favor, tente novamente mais tarde."
            };   
        }
    }catch(err){
        if(err instanceof AxiosError){
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