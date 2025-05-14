"use server";
import { CreateProductServerData, CreateProductServerValidator } from "@/_validators/CreateProductServerValidator";
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import { AxiosError } from "axios";

export const createProduct = async(user: CreateProductServerData)=>{
    "use server";
    
    const parsed = CreateProductServerValidator.safeParse(user);

    if (!parsed.success) {
        return {
                ok: false,
                fieldErrors: parsed.error.errors.map((err) => ({
                key: err.path[0],
                message: err.message,
            })),
        };
    } 

    const { data: { banner, category_id,description,name,price } } = parsed;

    try{

        const token = await getCookieServer();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price.toString());
        formData.append("category_id", category_id);
        formData.append("banner", banner[0]); // banner deve ser um File/Blob


        const result = await api.post("/product", formData, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });   
        
        return {
            ok: true,
            message: "Produto cadastrado com sucesso.",
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