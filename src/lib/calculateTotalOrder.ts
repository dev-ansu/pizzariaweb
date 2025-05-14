import { OrderItemProps } from "@/context/ModalContext";

export const calculateTotalOrder = (orders: OrderItemProps[])=>{
    return orders.reduce((total, item)=> { 
        const itemTotal =  item.product.price * item.amount;
        return total + itemTotal;
    }, 0)
}