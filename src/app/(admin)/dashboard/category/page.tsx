import styles from "./styles.module.scss"
import { FormCreateCategory } from "./CreateCategoryForm/Form";


const Page = ()=>{
   
    
    return(
        <main className={styles.container}>
            <h1>Nova categoria</h1>
            <FormCreateCategory />           
        </main>
    )
}


export default Page;