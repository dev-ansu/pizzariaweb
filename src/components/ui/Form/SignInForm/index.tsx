"use client";
import { SignInFormData } from "@/_validators/SignInValidator";
import styles from "@/app/styles.module.scss"
import Input from "@/components/ui/Input"
import { ErrorsProps } from "@/types/ErrorsProps";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form"
import { Loader } from "../../Loader";



export const SignInForm = ({isSaving, errorsData}: {isSaving?: boolean, errorsData?: ErrorsProps[]})=>{
    const {register, setError, formState:{ errors }} = useFormContext<SignInFormData>();

    useEffect(()=>{
        errorsData?.forEach(err => {
          setError(err.key as any, { message: err.message})
        })
    },[errorsData])

    return(
        <>
            <Input 
                type="email" 
                register={register}
                nameForm="email"
                error={errors.email?.message}
                placeholder="Digite seu e-mail.."
                className={styles.input}
                autoFocus
              />
              <Input 
                type="password" 
                register={register}
                nameForm="password"
                error={errors.password?.message}
                placeholder="********"
                className={styles.input}
              />
            
              <button disabled={isSaving} type="submit" className={isSaving && styles.inactiveButton || ""}>
                {isSaving && <Loader />}
                {!isSaving && "Acessar"}
              </button>
        </>
    )
}