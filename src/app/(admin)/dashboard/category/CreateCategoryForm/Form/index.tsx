"use client";
import styles from "../../styles.module.scss"
import { Form } from "@/components/ui/Form"
import { CreateCategoryInput } from "../Input"
import { CreateCategoryData, CreateCategoryValidator } from "@/_validators/CreateCategoryValidator";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { createCategory } from "@/actions/create.category.action";
import { useSetFieldErrors } from "@/hook/useSetFieldErrors";
import { toast } from "react-toastify";

export const FormCreateCategory = ()=>{
    
    const { errorsData, setFieldErrors} = useSetFieldErrors();
    const [isSaving, startIsSaving] = useTransition();
    const [ok, setOk] = useState(false);

    const onSubmit = async(data: CreateCategoryData)=>{

        startIsSaving(async()=>{
            const result = await createCategory(data);
            if (!result.ok && result.fieldErrors) {
                setFieldErrors(result.fieldErrors); // direto sem precisar fazer parse de string
                toast.error("Verifique os campos e tente novamente.");
                return;
            }

            if(result.ok){
                toast.success(result.message)
                setOk(true);
            }else{
                toast.error(result.message);
            }
        })
    }

    return(
        <Form schema={CreateCategoryValidator} isValidSubmit={onSubmit} className={styles.form}>
                        
            <CreateCategoryInput ok={ok} errorsData={errorsData}/>
            
            <Button isPending={isSaving}  className={styles.button}>
                Adicionar
            </Button>
        </Form>      
    )
}