"use client";
import styles from "../styles.module.scss";
import { Form } from "@/components/ui/Form";
import { InputsCreateProduct } from "../Inputs";
import { CreateProductData, CreateProductValidator } from "@/_validators/CreateProductValidator";
import { Button } from "@/components/ui/Button";
import { useTransition } from "react";
import { useSetFieldErrors } from "@/hook/useSetFieldErrors";
import { toast } from "react-toastify";
import { createProduct } from "@/actions/create.product.action";

export interface Categories{
    id: string;
    name: string;
}

export const FormCreateProduct = ({categories}:{categories: Categories[]})=>{
    const { errorsData, setFieldErrors} = useSetFieldErrors();
    const [isSaving, startIsSaving] = useTransition();

    const onSubmit = async(data: CreateProductData)=>{
        startIsSaving(async()=>{
            const index = data.category_id as unknown as number;
            console.log(index);

            if(!categories[index]){
                setFieldErrors([{
                    key:"category_id",
                    message:"Escolha uma categoria válida.",
                }]);
                return;
            }

            const category = categories[index].id;
            
            data.category_id = category as string;
            
            const result = await createProduct(data);
            if (!result.ok && result.fieldErrors) {
                setFieldErrors(result.fieldErrors); // direto sem precisar fazer parse de string
                toast.error("Verifique os campos e tente novamente.");
                return;
            }

            if(result.ok){
                toast.success(result.message)
            }else{
                toast.error(result.message);
            }
        })
    }
    
    return(
        <Form  className={styles.form} isValidSubmit={onSubmit} schema={CreateProductValidator} >
            <InputsCreateProduct categories={categories} errorsData={errorsData} />
            <Button isPending={isSaving}>
                Cadastrar
            </Button>
        </Form>
    )
}