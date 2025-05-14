"use client";
import { InputHTMLAttributes } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";


interface InputProps<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement>{
    register?: UseFormRegister<TFieldValues>,
    nameForm?: keyof TFieldValues,
    error?: string,
    rules?: RegisterOptions<TFieldValues, any> | undefined;
    errorClasses?: string;
}


const Input = <TFieldValues extends FieldValues>({register, error,errorClasses, rules, nameForm, className, ...props}: InputProps<TFieldValues>)=>{
    const classes = "w-full border-2 border-gray-200 rounded-md h-11 px-2 " + className;

    return (
        <>
            <input
                className={classes}
                {...props}  
                {...register ? {...register(nameForm as any, rules)}:""}
                id={String(nameForm)}
            />
            {error && <p className={`${errorClasses} "text-red-500 my-1"`}>{error}</p>}
        </>
    )            
}


export default Input;


    