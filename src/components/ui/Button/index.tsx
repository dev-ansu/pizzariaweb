"use client";
import styles from "./styles.module.scss";

import { HTMLAttributes, useTransition } from "react"
import { Loader } from "../Loader";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>{
    isPending?: boolean;
}

export const Button = ({children, className,isPending, ...props}: ButtonProps)=>{
    const classes = styles.button + " " + className;

    return(
        <button disabled={isPending} {...props} className={classes}>
            {isPending && <Loader />}
            {!isPending && children}
        </button>
    )
}