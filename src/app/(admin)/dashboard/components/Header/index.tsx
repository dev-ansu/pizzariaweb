"use client";
import Link from "next/link";
import styles from "./styles.module.scss";
import { Logo } from "@/components/ui/Logo";
import { LogOutIcon } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import LoadingIndicator from "@/app/LoadingIndicator";

export const Header = ()=>{
    const router = useRouter();


    const handleLogout = async()=>{
        deleteCookie("session", {path: "/"})
        router.replace("/");
    }
    
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Logo />
                </Link>                
                <nav>

                    <Link href="/dashboard/category">
                        Nova categoria
                        <LoadingIndicator />
                    </Link>

                    <Link href="/dashboard/product">
                        Cardápio
                        <LoadingIndicator />
                    </Link>

                    <form action={handleLogout}>
                        <button type="submit" >
                            <LogOutIcon size={32} className="cursor-pointer" />
                        </button>
                    </form>
                </nav>

            </div>            
        </header>
    )
}