"use client";
import Input from "@/components/ui/Input";
import styles from "./styles.module.scss";
import { UploadCloud } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { CreateProductData } from "@/_validators/CreateProductValidator";
import Image from "next/image";
import { AnimatedDiv } from "@/components/ui/AnimatedDiv";
import { Categories } from "../Form";
import { ErrorsProps } from "@/types/ErrorsProps";
import { useEffect } from "react";


export const InputsCreateProduct = ({categories, errorsData}:{categories: Categories[], errorsData: ErrorsProps[]})=>{
    const {register,watch, setError, formState:{errors}} = useFormContext<CreateProductData>();
    const file = watch('banner')?.[0];
    const previewUrl = file ? URL.createObjectURL(file) : null;

    useEffect(()=>{
        errorsData?.forEach(err => {
            setError(err.key as any, { message: err.message})
        })
    },[errorsData])

    return(
        <>
            <label className={styles.labelImage} htmlFor="banner">
                
                <span>
                    <UploadCloud size={30} color="#fff" />
                </span>

                <Input
                    errorClasses={styles.error} 
                    type="file" 
                    id="banner"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    register={register}
                    nameForm="banner"
                    error={errors.banner?.message}
                />
                {previewUrl && 
                    <Image 
                        src={previewUrl}
                        className={styles.preview}
                        quality={100}
                        priority={true}
                        fill={true}
                        alt="Imagem de preview"
                    />
                }
                

            </label>

            <AnimatedDiv>
                
                <select className={styles.select} {...register("category_id")}>
                    {categories.map( (category, index) => (
                        <option key={category.id} value={index}>{category.name}</option>
                    ))}
                </select>
                {errors?.category_id && <span className={styles.error}>{errors.category_id?.message}</span>}

            </AnimatedDiv>

            <AnimatedDiv>
                <Input
                    errorClasses={styles.error} 
                    type="text"
                    register={register}
                    nameForm="name"
                    placeholder="Digite o nome do produto"
                    className={styles.input}
                    error={errors.name?.message}
                />
            </AnimatedDiv>

            <AnimatedDiv>
                <Input
                    errorClasses={styles.error} 
                    type="text"
                    register={register}
                    nameForm="price"
                    placeholder="Digite o preço do produto"
                    className={styles.input}
                    error={errors.price?.message}
                />
            </AnimatedDiv>

            <AnimatedDiv>
                <textarea className={styles.textarea} {...register("description")} placeholder="Digite a descrição do produto." ></textarea>
                {errors?.description && <span className={styles.error}>{errors.description?.message}</span>}
            </AnimatedDiv>
        </>
    )
}