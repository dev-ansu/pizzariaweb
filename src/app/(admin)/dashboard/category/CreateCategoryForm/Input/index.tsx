"use client"
import styles from "./styles.module.scss";
import { CreateCategoryData } from "@/_validators/CreateCategoryValidator";
import Input from "@/components/ui/Input"
import { ErrorsProps } from "@/types/ErrorsProps";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const CreateCategoryInput = ({errorsData, ok}: {ok: boolean, errorsData?: ErrorsProps[]})=>{
    const { register, setError,reset, formState:{ errors } } = useFormContext<CreateCategoryData>();

    useEffect(()=>{
            errorsData?.forEach(err => {
                setError(err.key as any, { message: err.message})
        })
    },[errorsData]);

    useEffect(()=>{
        reset();
    },[ok])

    return(
        <>
            <Input 
                autoFocus
                type="text"
                placeholder="Nome da categoria, ex.: pizzas"
                register={register}
                nameForm="name"
                error={errors.name?.message}
                errorClasses={styles.error}
                className={styles.input}
            />

        </>
)
}