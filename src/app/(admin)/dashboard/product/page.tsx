import styles from "./styles.module.scss";
import { FormCreateProduct } from "./Form";
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";

const Page = async ()=>{
    const token = await getCookieServer();
    const response  = await api.get("/category", {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    
    return(
        <main className={styles.container}>
            <h1>Novo produto</h1>
            <FormCreateProduct categories={response.data.categories} />
        </main>
    )
}


export default Page;