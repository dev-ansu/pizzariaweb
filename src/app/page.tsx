"use client";
import styles from "./styles.module.scss"
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { SignInForm } from "../components/ui/Form/SignInForm";
import { Form } from "@/components/ui/Form";
import { SignInFormData, SignInValidatorSchema } from "@/_validators/SignInValidator";
import { useTransition } from "react";
import { auth } from "../actions/signin.action";
import { useSetFieldErrors } from "@/hook/useSetFieldErrors";
import { toast, ToastContainer } from "react-toastify";
import { AnimatedDiv } from "@/components/ui/AnimatedDiv";
import LoadingIndicator from "./LoadingIndicator";
import {redirect} from "next/navigation";


export default function Home() {
    const {errorsData, setFieldErrors} = useSetFieldErrors();

    const [isSaving, startIsSaving] = useTransition();
  
  const onSubmit = async(data: SignInFormData)=>{
          startIsSaving(async()=>{
              const result = await auth(data);

          if (!result.ok && result.fieldErrors) {
            setFieldErrors(result.fieldErrors); // direto sem precisar fazer parse de string
            return;
          }

            
            if(result.ok){
              toast.success(result.message)
              if(result.data.token){
                redirect("/dashboard")
              }else{
                toast.error("O login falhou. Tente novamente!")
              }
            }else{
              toast.error(result.message);
            }
          })
      }

  return (
      <>

          <AnimatedDiv className={styles.containerCenter}>
            <Logo />

            <section className={styles.login}>
              <Form isValidSubmit={onSubmit} schema={SignInValidatorSchema}>
                
                <SignInForm isSaving={isSaving} errorsData={errorsData} />

              </Form>

              <Link href="/signup" className={styles.text}>
                Não possui uma conta? Cadastre-se! <LoadingIndicator />
              </Link>
            </section>  
          </AnimatedDiv>     
      
        
      </>
  );
}
