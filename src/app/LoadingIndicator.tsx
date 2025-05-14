import { Loader } from "@/components/ui/Loader";
import { useLinkStatus } from "next/link"

export default function LoadingIndicator(){
    const { pending } = useLinkStatus();
    
    return pending ? (
        <Loader /> 
    ): null;
}