import { ReactNode } from "react";
import { Header } from "./components/Header";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "@/context/ModalContext";

export default function Layout({children}:{children: ReactNode}){
    return(
        <>
            <Header />
            <ModalProvider>
                {children}
            </ModalProvider>
        </>
    )
}