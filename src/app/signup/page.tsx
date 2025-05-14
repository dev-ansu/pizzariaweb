"use client";
import styles from "@/app/styles.module.scss";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { SignUpFormData, SignUpValidatorSchema } from "@/_validators/SignUpValidator";
import { registerUser } from "../../actions/signup.action";
import {  useTransition } from "react";
import { Form } from "@/components/ui/Form";
import { SignUpForm } from "../../components/ui/Form/SignUpForm";
import { useSetFieldErrors } from "@/hook/useSetFieldErrors";
import { toast, ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";
import { AnimatedDiv } from "@/components/ui/AnimatedDiv";
import LoadingIndicator from "../LoadingIndicator";


export default function Page(){
    const { errorsData, setFieldErrors} = useSetFieldErrors();
    const [isSaving, startIsSaving] = useTransition();

    const onSubmit = async(data: SignUpFormData)=>{
        startIsSaving(async()=>{
            const result = await registerUser(data);
            
            if (!result.ok && result.fieldErrors) {
                setFieldErrors(result.fieldErrors); // direto sem precisar fazer parse de string
                toast.error("Verifique os campos e tente novamente.");
                return;
            }

            if(result.ok){
                toast.success(result.message)
                redirect("/");
            }else{
                toast.error(result.message);
            }
        })
    }

    return(
                
                <AnimatedDiv className={styles.containerCenter}>
                <Logo />

                    <section className={styles.login}>

                        <h1>Crie sua conta</h1>
                        <Form isValidSubmit={onSubmit} schema={SignUpValidatorSchema}>
                            <SignUpForm isSaving={isSaving} errorsData={errorsData} />
                        </Form>            
                    
                        <Link href="/" className={styles.text}>
                            Já possui uma conta? Faça login! <LoadingIndicator />
                        </Link>
                    </section>

                </AnimatedDiv>
   
    )
}