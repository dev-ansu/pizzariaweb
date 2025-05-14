"use client";
import { X } from "lucide-react"
import styles from "./styles.module.scss";
import { AnimatedDiv } from "../AnimatedDiv";
import { useModalContext } from "@/context/ModalContext";
import { calculateTotalOrder } from "@/lib/calculateTotalOrder";
import Image from "next/image";

export const Modal = ()=>{
    const { onRequestClose, order, finishOrder } = useModalContext();

    const handleFinishOrder = async()=>{
        if(window.confirm("Deseja realmente concluir o pedido?")){
            await finishOrder(order[0].order.id);
        }
    }

    return(
        <dialog className={styles.dialogContainer}>

            <AnimatedDiv>
                <section className={styles.dialogContent}>
                    <button type="button" onClick={onRequestClose} className={styles.backButton}><X size={40} color="#ff3f4b" /></button>
                    <article className={styles.container}>
                        <h2>Detalhes do pedido</h2>
                        <span className={styles.table}>
                            Mesa <b>{order[0].order.table}</b>
                        </span>
                        {order[0].order?.name &&
                            <span className={styles.name}>
                                (<b>{order[0].order?.name}</b>)
                            </span>
                        }
                        
                        {order.map(item => (
                            <section key={item.id} className={styles.item}>
                                <span>Qtd.: {item.amount} - <b>{item.product.name} - R$ {(item.product.price).toLocaleString('pt-br')}</b><span className={styles.subtotal}>(subtotal: {(item.product.price * item.amount).toLocaleString('pt-br')})</span></span>
                                <span className={styles.description}>{item.product.description}</span>
                            </section>
                        ))}

                        <h3 className={styles.total}>Total: {calculateTotalOrder(order).toLocaleString("pt-br")}</h3>
                        <button onClick={handleFinishOrder} className={styles.buttonOrder}>
                            Concluir pedido
                        </button>

                    </article>
                </section>
            </AnimatedDiv>
            
        </dialog>
    )
}