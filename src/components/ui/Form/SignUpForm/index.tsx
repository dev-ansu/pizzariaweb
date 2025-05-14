"use client";
import { SignUpFormData } from "@/_validators/SignUpValidator";
import { useFormContext } from "react-hook-form"
import styles from "@/app/styles.module.scss";
import Input from "@/components/ui/Input";
import { ErrorsProps } from "@/types/ErrorsProps";
import { useEffect } from "react";
import { Loader } from "../../Loader";


export const SignUpForm = ({isSaving, errorsData}: {isSaving: boolean, errorsData?: ErrorsProps[]})=>{
    const {register, setError, formState:{errors}} = useFormContext<SignUpFormData>();
    
    useEffect(()=>{
        errorsData?.forEach(err => {
            setError(err.key as any, { message: err.message})
        })
    },[errorsData])
 

    return(
        <>
            <Input 
                type="text" 
                register={register}
                nameForm="name"
                placeholder="Digite seu nome..."
                className={styles.input}
                autoFocus
            />
            {errors?.name && errors.name?.message}
            <Input 
                type="email" 
                register={register}
                nameForm="email"
                placeholder="Digite seu e-mail.."
                className={styles.input}
            />
            {errors?.email && errors.email?.message}

            <Input 
                type="password" 
                register={register}
                nameForm="password"
                placeholder="********"
                className={styles.input}
            />
            {errors?.password && errors.password?.message}

            <button disabled={isSaving} className={isSaving && styles.inactiveButton || ""} type="submit">
                {isSaving && <Loader />}
                {!isSaving && "Acessar"}
            </button>
        </>
    )
}