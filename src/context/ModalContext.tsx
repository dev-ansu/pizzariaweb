"use client";

import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

export interface OrderItemProps{
    id: string;
    amount: number;
    created_at: Date;
    order_id: string;
    product_id: string;
    product:{
        id: string;
        name: string;
        price: number;
        description: string;
        banner: string;
        created_at: Date;
        category_id: string;
    };
    order:{
        id: string;
        table: number;
        name: string | null;
        status: boolean;
        draft: boolean;
    }
}

interface ModalContextData{
    isOpen: boolean;
    onRequestOpen: (order_id: string) => Promise<void>;
    onRequestClose: () => void;
    order: OrderItemProps[];
    finishOrder: (order_id: string) => Promise<void>;
}

export const ModalContext = createContext({} as ModalContextData);

interface ModalProviderData{
    children: ReactNode;
}

export const ModalProvider = ({children}: ModalProviderData)=>{
    const [isOpen, setIsOpen] = useState(false);
    const [order, setOrder] = useState<OrderItemProps[]>([]);
    const router = useRouter();
    
    const onRequestOpen = async (order_id: string)=>{
        const token = await getCookieClient();
        const response = await api.get("/order/detail/" + order_id, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        setOrder(response.data);
        setIsOpen(true);
    }
    
    const onRequestClose = ()=>{
        setIsOpen(false);
    }

    const finishOrder = async(order_id: string)=>{
        const token = await getCookieClient();
        try{
            await api.put(`/order/finish/${order_id}`, undefined, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Pedido concluído com sucesso");
        }catch(err){
            toast.error("Falha ao concluir o pedido");
        }
        router.refresh();
        setIsOpen(false);
    }

    return(
        <ModalContext.Provider 
        value={{
            isOpen,
            onRequestClose,
            onRequestOpen,
            order,
            finishOrder
        }}
        >
            {children}
        </ModalContext.Provider>
    )
} 


export const useModalContext = ()=>{
    const context = useContext(ModalContext);

    if(!context){
        throw new Error("useModalContext deve ser usado dentro de um ModalProvider.")
    }

    return context;
}