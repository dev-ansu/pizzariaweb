"use client";
import { RefreshCcw } from "lucide-react";
import styles from "./styles.module.scss";
import { OrderProps } from "@/types/order.type";
import { Modal } from "@/components/ui/Modal";
import { useModalContext } from "@/context/ModalContext";
import { useRouter } from "next/navigation";


export const Orders = ({ orders }:{orders: OrderProps[] | []})=>{
    const { isOpen, onRequestOpen } = useModalContext();
    const router = useRouter();

    async function handleDetailOrder(order_id: string){
        await onRequestOpen(order_id);
    }

    const handleRefresh = ()=>{
        router.refresh();
    }

    return(
        <>
            <main className={styles.container}>
                    <section className={styles.containerHeader}>
                        <h1>Últimos pedidos</h1>
                        <button onClick={handleRefresh}>
                            <RefreshCcw size={32} color="#3fffa3" />
                        </button>
                    </section>
                    <section className={styles.listOrders}>
                        {orders.length <= 0 && 
                            <span className={styles.emptyItems}>🌵💨 Está um pouco vazio por aqui...</span>
                        }
                        {orders && orders.map(order => (
                            <button type="button" onClick={() => handleDetailOrder(order.id)} key={order.id} className={styles.orderItem}>
                                <div className={styles.tag}></div>
                                <span>Mesa {order.table}</span>
                            </button>
                        ))}

                    </section>
                
            </main>
            {isOpen && <Modal />}
        </>
    )
}