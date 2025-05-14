import { api } from "@/services/api";
import { Orders } from "./components/Orders";
import { getCookieServer } from "@/lib/cookieServer";
import { OrderProps } from "@/types/order.type";

async function getOrders(): Promise<OrderProps[] | []>{
    try{
        const token = await getCookieServer();
        const response = await api.get("/order",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        
        return response.data || [];

    }catch(err){
        console.log(err);
        return [];
    }
}

export default async function Page(){
    const orders = await getOrders();

    return(
        <>
            <Orders orders={orders} />  
        </>
    )
}