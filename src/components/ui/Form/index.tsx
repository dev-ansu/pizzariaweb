"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLAttributes, ReactNode } from "react"
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ZodType, ZodTypeDef } from "zod";

interface FormProps<T extends FieldValues> extends HTMLAttributes<HTMLFormElement>{
    isValidSubmit: SubmitHandler<T>;
    children: ReactNode;
    schema: ZodType<T, ZodTypeDef, T>;
}

export function Form<T extends FieldValues>({isValidSubmit, children, schema, ...props}: FormProps<T>){
    
    const methods = useForm<T>({
        resolver: zodResolver(schema)
    });

    
    return(
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(isValidSubmit)} {...props}>
                {children}
            </form>
        </FormProvider>
    )
}